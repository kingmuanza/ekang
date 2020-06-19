import { Component, OnInit, ElementRef } from "@angular/core";
import { WebrtcService } from "../services/webrtc.service";
import io from "socket.io-client";
import { Subscription } from "rxjs";
import { AuthentificationService } from "../services/authentification.service";
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";

@Component({
  selector: "app-training",
  templateUrl: "./training.page.html",
  styleUrls: ["./training.page.scss"],
})
export class TrainingPage implements OnInit {
  topVideoFrame = "partner-video";
  userId: string;
  partnerId: string;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;
  heure: any;
  minute: any;
  seconde: any;
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  monProfil: Profil;
  profils = new Array<Profil>();
  profilsResultats = new Array<Profil>();
  amis = new Array<Profil>();
  propositions = new Array<Profil>();
  displayVideo: Boolean = false;
  saisie = "";
  constructor(
    public webRTC: WebrtcService,
    public elRef: ElementRef,
    public auth: AuthentificationService,
    private router: Router,
    private userService: UserService
  ) {
    this.userService.Partener().subscribe((data: Profil) => {
      if (data.utilisateur) {
        this.partnerId = data.utilisateur.uid;
        // this.displayVideo = true;
        //this.init();
        setTimeout(() => {
          //this.call();
        }, 2000);
      } else {
        console.log("rien");
      }
    });
  }
  init() {
    this.myEl = this.elRef.nativeElement.querySelector("#my-video");
    console.log(this.myEl);

    this.partnerEl = this.elRef.nativeElement.querySelector("#partner-video");
    console.log(this.partnerEl);

    this.webRTC.init(this.userId, this.myEl, this.partnerEl);

    setInterval(() => {
      var start = new Date();
      this.heure = start.getHours();
      this.minute = start.getMinutes();
      this.seconde = start.getSeconds();
    }, 1000);
  }

  call() {
    this.webRTC.call(this.partnerId);
    this.swapVideo("my-video");
  }

  swapVideo(topVideo: string) {
    this.topVideoFrame = topVideo;
  }

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      (utilisateur) => {
        console.log(utilisateur);
        this.userId = utilisateur.uid;
        this.utilisateur = utilisateur;
        this.userService.getProfil(this.utilisateur).then((monProfil) => {
          this.monProfil = monProfil;
        });
        console.log(this.utilisateur);
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {
          this.userService.getProfils().then((profils) => {
            this.profils = profils.filter((profil) => {
              return profil.utilisateur.uid !== this.utilisateur.uid;
            });
            this.profilsResultats = profils.filter((profil) => {
              return profil.utilisateur.uid !== this.utilisateur.uid;
            });
            this.setAmis();
          });
        }
      }
    );
    this.auth.emettre();
  }
  setAmis() {
    // Mes amis
    this.amis = this.profilsResultats.filter((profil) => {
      return this.sontIlsAmis(profil);
    });
    this.propositions = this.profilsResultats.filter((profil) => {
      return !this.sontIlsAmis(profil);
    });
  }

  sontIlsAmis(profil: Profil) {
    if (this.monProfil && profil) {
      if (this.monProfil.abonnements) {
        const resultats = this.monProfil.abonnements.find((index) => {
          return index === profil.utilisateur.uid;
        });
        if (resultats) {
          return true;
        }
      }
    }
    return false;
  }

  rechercher(ev) {
    console.log(this.saisie);
    this.profilsResultats = this.profils;
    this.profilsResultats = this.profilsResultats.filter((element) => {
      if (element.utilisateur.displayName) {
        return (
          element.utilisateur.displayName
            .toLocaleLowerCase()
            .indexOf(this.saisie.toLowerCase()) !== -1
        );
      }
      if (element.utilisateur.email) {
        return (
          element.utilisateur.email
            .toLocaleLowerCase()
            .indexOf(this.saisie.toLowerCase()) !== -1
        );
      }
    });
    this.setAmis();
  }

  voirProfil(profil: Profil) {
    this.router.navigate(["amis", "amis-view", profil.utilisateur.uid]);
  }

  callUser(partener: Profil) {
    console.log(partener.id);
    this.partnerId = partener.id;
  }
}
