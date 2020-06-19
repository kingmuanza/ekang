import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"]
})
export class MessagesPage implements OnInit {
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  monProfil: Profil;
  profils = new Array<Profil>();
  profilsResultats = new Array<Profil>();
  amis = new Array<Profil>();
  amis2 = new Array<Profil>();
  propositions = new Array<Profil>();

  saisie = "";

  constructor(
    private userService: UserService,
    private router: Router,
    public auth: AuthentificationService
  ) {}

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        this.userService.getProfil(this.utilisateur).then(monProfil => {
          this.monProfil = monProfil;
        });
        //  console.log(this.utilisateur);
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {
          this.userService.getProfils().then(profils => {
            //  console.log(profils);

            this.profilsResultats = profils.filter(profil => {
              return profil.utilisateur.uid !== this.utilisateur.uid;
            });
            this.setAmis();
            // this.messageRecu();
          });
        }
      }
    );
    this.auth.emettre();
  }

  messageRecu() {
    this.monProfil.sendersMessages.forEach(id => {
      this.userService.getProfilByID(id).then((profil: Profil) => {
        this.amis2.push(profil);
      });
    });

    this.amis2 = this.amis2.sort((a: Profil, b: Profil) => {
      return new Date(a.lastConnexionDate).getTime() -
        new Date(b.lastConnexionDate).getTime() >
        0
        ? -1
        : 1;
    });
    //console.log("mes amis", this.amis);
    this.amis2.forEach(ami => {
      this.isOnline(ami);
      //this.getSenderMessage(this.utilisateur.uid, ami.utilisateur.uid, ami);
    });
  }

  setAmis() {
    // Mes amis
    this.amis = this.profilsResultats.filter(profil => {
      return this.sontIlsAmis(profil);
    });
    this.amis = this.amis.sort((a: Profil, b: Profil) => {
      return new Date(a.lastConnexionDate).getTime() -
        new Date(b.lastConnexionDate).getTime() >
        0
        ? -1
        : 1;
    });
    //console.log("mes amis", this.amis);
    this.amis.forEach(ami => {
      this.isOnline(ami);
      this.getSenderMessage(this.utilisateur.uid, ami.utilisateur.uid, ami);
    });
    this.propositions = this.profilsResultats.filter(profil => {
      return !this.sontIlsAmis(profil);
    });
  }

  sontIlsAmis(profil: Profil) {
    if (this.monProfil && profil) {
      if (this.monProfil.abonnements) {
        const resultats = this.monProfil.abonnements.find(index => {
          return index === profil.utilisateur.uid;
        });
        if (resultats) {
          return true;
        }
      }
    }
    return false;
  }

  isOnline(user: Profil) {
    //return this.chatService.isUserOnline(user);
    let curentDate = new Date().getTime();
    if (user.lastConnexionDate) {
      let laDate = user.lastConnexionDate;
      // console.log(curentDate - date);
      /*
      console.log(new Date().getTime() - new Date(laDate).getTime());
      console.log(new Date(laDate).getHours());
      console.log(new Date(laDate).getMinutes());
      console.log(new Date(laDate).getSeconds());
      console.log(new Date(laDate).getDate());
      console.log(new Date(laDate).getFullYear());
     */

      new Date().getTime() - new Date(laDate).getTime() > 0;
      if (curentDate - laDate <= 120000) {
        user["enligne"] = true;
        // return true;
      } else {
        user["enligne"] = false;
        // return false;
      }
    } else {
      // return false;
    }
  }

  voir() {
    //this.router.navigate(['amis', 'amis-view', this.publication.utilisateur.uid]);
    this.router.navigate(["messages", "chat"]);
  }

  chat(user: Profil) {
    //this.router.navigate(['amis', 'amis-view', this.publication.utilisateur.uid]);
    this.router.navigate(["messages", "chat", user.utilisateur.uid]);
  }

  getSenderMessage(senderID: string, receiverID: string, ami) {
    const db = firebase.firestore();
    let id = senderID + "ekang" + receiverID;

    db.collection(`messages`)
      .doc(id)
      .onSnapshot(messages => {
        let changes = messages.data();
        // this.messages = changes;
        /* if (this.messages["chats"].length) {
          this.messagesChat = this.messages["chats"];
        } */
        if (changes["chats"] && changes["chats"].length) {
          /* changes["chats"].reverse().forEach(msg => {
            if (msg["senderID"] != senderID) {
              ami["lastMessage"] = msg["texte"];
            }
          }); */
          changes["chats"] = changes["chats"].reverse();
          ami["lastMessage"] = changes["chats"][0]["texte"];
          if (changes["chats"][0]["date"]) {
            ami["ladate"] = changes["chats"][0]["date"];
          }
        }
      });
  }
}
