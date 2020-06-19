import { Injectable } from "@angular/core";
import Peer from "peerjs";
import io from "socket.io-client";
//import Peer from "simple-peer";
const constraints: MediaStreamConstraints = { video: true, audio: false };
@Injectable({
  providedIn: "root",
})
export class WebrtcService {
  peer: Peer;
  myStream: MediaStream;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;

  stun = "stun.l.google.com:19302";
  mediaConnection: Peer.MediaConnection;
  options: Peer.PeerJSOption;
  stunServer: RTCIceServer = {
    urls: "stun:" + this.stun,
  };

  constructor() {
    this.options = {
      // not used, by default it'll use peerjs server
      // key: "cd1ft79ro8g833di",
      // debug: 3,
    };
  }

  getMedia() {
    navigator.getUserMedia(
      { audio: true, video: true },
      (stream) => {
        this.handleSuccess(stream);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  async init(
    userId: string,
    myEl: HTMLMediaElement,
    partnerEl: HTMLMediaElement
  ) {
    this.myEl = myEl;
    this.partnerEl = partnerEl;
    try {
      this.getMedia();
    } catch (e) {
      this.handleError(e);
    }
    await this.createPeer(userId);
  }

  async createPeer(userId: string) {
    this.peer = new Peer(userId);
    this.peer.on("open", () => {
      this.wait();
    });
  }

  call(partnerId: string) {
    const call = this.peer.call(partnerId, this.myStream);
    call.on("stream", (stream) => {
      this.partnerEl.srcObject = stream;
    });
  }

  wait() {
    this.peer.on("call", (call) => {
      call.answer(this.myStream);
      call.on("stream", (stream) => {
        this.partnerEl.srcObject = stream;
      });
    });
  }

  handleSuccess(stream: MediaStream) {
    this.myStream = stream;
    this.myEl.srcObject = stream;
  }

  handleError(error: any) {
    if (error.name === "ConstraintNotSatisfiedError") {
      const v = constraints.video;
      // this.errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
      this.errorMsg(`The resolution px is not supported by your device.`);
    } else if (error.name === "PermissionDeniedError") {
      this.errorMsg(
        "Permissions have not been granted to use your camera and " +
          "microphone, you need to allow the page access to your devices in " +
          "order for the demo to work."
      );
    }
    this.errorMsg(`getUserMedia error: ${error.name}`, error);
  }

  errorMsg(msg: string, error?: any) {
    const errorElement = document.querySelector("#errorMsg");
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== "undefined") {
      console.error(error);
    }
  }
}
/*
export class WebrtcService {
  peer: Peer;
  peer2: Peer;
  myStream: MediaStream;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;
  peerRef = [];
  // socket = io("https://fast-island-24909.herokuapp.com/");
  socket = io("http://localhost:9000");
  constructor() {}

  getMedia(userId) {
    // this.socket.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.handleSuccess(stream, userId);
      });
  }

  async init(
    userId: string,
    myEl: HTMLMediaElement,
    partnerEl: HTMLMediaElement
  ) {
    this.myEl = myEl;
    this.partnerEl = partnerEl;
    try {
      this.getMedia(userId);
    } catch (e) {
      //this.handleError(e);
    }
    // await this.createPeer(userId);
  }

  async createPeer(userID, myId, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
      stream: stream,
    });

    peer.on("signal", (signal) => {
      console.log("data ---", signal);

      this.socket.emit("sending signal", {
        signal: signal,
        callerID: myId,
      });
    });

    return peer;
  }

  async addPeer(incomminsignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
      stream: stream,
    });
    this.partnerEl.srcObject = stream;
    peer.on("signal", (signal) => {
      console.log("data ---", signal);
      this.socket.emit("returning signal", {
        signal: signal,
        callerID: callerID,
      });
    });

    peer.signal(incomminsignal);

    return peer;
  }

  call(partnerId: string) {
    this.peer2 = new Peer();
    this.peer2.on("signal", (data) => {
      this.peer.signal(data);
    });
    this.peer2.on("stream", (stream) => {
      this.partnerEl.srcObject = stream;

      this.partnerEl.play();
    });
  }

  wait() {
    this.peer.on("call", (call) => {
      call.answer(this.myStream);
      call.on("stream", (stream) => {
        this.partnerEl.srcObject = stream;
      });
    });
  }

  handleSuccess(stream: MediaStream, userId) {
    this.socket["id"] = userId;
    this.myStream = stream;
    this.myEl.srcObject = stream;
    this.socket.emit("join room", "lemballus");
    this.socket.on("all users", (users) => {
      console.log(users);
      let peers = [];
      users.forEach((userID) => {
        const peer = this.createPeer(userID, this.socket["id"], stream);
        this.peerRef.push({ peerID: userID, peer });
        peers.push(peer);
      });
    });
    this.socket.on("user joined", (payload) => {
      const peer = this.addPeer(payload.signal, payload.callerID, stream);
      this.peerRef.push({ peerID: payload.callerID, peer });
      // peers.push(peer);
    });

    this.socket.on("receiving returned signal", (payload) => {
      const item = this.peerRef.find((p) => p.peerID === payload.id);
      item.peer.signal(payload.signal);
    });
  }
}
*/
