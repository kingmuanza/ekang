import { Injectable } from "@angular/core";
import { Message } from "../models/message.model";
import * as firebase from "firebase";
import { Observable, Subject, from } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class MessagerieService {
  public resultat = new Subject<any>();
  res: any;
  constructor() {}

  purifier(element) {
    return JSON.parse(JSON.stringify(element));
  }
  saveMessage(
    message: Message,
    senderId: string,
    receiverId: string
  ): Promise<any> {
    console.log("le msg", message);
    const db = firebase.firestore();
    let id1 = senderId + "ekang" + receiverId;
    let id2 = receiverId + "ekang" + senderId;
    return new Promise((resolve, reject) => {
      db.collection(`messages`)
        .doc(id1)
        .set(this.purifier(message))
        // .add()
        .then(() => {
          db.collection(`messages`)
            .doc(id2)
            .set(this.purifier(message))
            .then(data => {
              console.log("ok sender");
            });
          resolve(message);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  saveMessage2(
    message: Message,
    senderId: string,
    receiverId: string
  ): Promise<any> {
    console.log("le msg", message);

    const db = firebase.firestore();
    let id1 = senderId + "ekang" + receiverId;
    let id2 = receiverId + "ekang" + senderId;
    return new Promise((resolve, reject) => {
      db.collection(`messages`)
        .doc(id1)
        .set(message)
        // .add()
        .then(() => {
          resolve(message);
          db.collection(`messages`)
            .doc(id2)
            .set(message)
            .then(data => {});
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
