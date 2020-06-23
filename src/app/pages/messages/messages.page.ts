import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { Chat } from 'src/app/models/chat.model';

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
  chats = new Array<Chat>();

  saisie = "";

  constructor(
    private userService: UserService,
    private router: Router,
    public auth: AuthentificationService
  ) { }

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      (utilisateur) => {
        this.utilisateur = utilisateur;
        this.userService.getProfil(this.utilisateur).then(monProfil => {
          this.monProfil = monProfil;
        });
        //  console.log(this.utilisateur);
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {
          this.getChats();
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

  getChats() {
    this.chats = [];
    console.log('Get chats');
    console.log(this.utilisateur.uid);
    const db = firebase.firestore();
    db.collection(`chats`)
      .where('chatersID', 'array-contains', this.utilisateur.uid)
      .get().then((resultats) => {
        resultats.forEach((resultat) => {
          const chat = resultat.data() as Chat;
          this.chats.push(chat);
        });
      });
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
    this.amis2.forEach(ami => {
      this.isOnline(ami);
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
      new Date().getTime() - new Date(laDate).getTime() > 0;
      if (curentDate - laDate <= 120000) {
        user["enligne"] = true;
      } else {
        user["enligne"] = false;
      }
    } else {
    }
  }

  goToChat(chat: Chat) {
    const profil1 = chat.profil1;
    const profil2 = chat.profil1;
    if (profil1.utilisateur.uid === this.utilisateur.uid) {
      this.router.navigate(["messages", "chat", profil1.utilisateur.uid]);
    } else {
      this.router.navigate(["messages", "chat", profil2.utilisateur.uid]);
    }
  }

  getDate(chat: Chat) {
    
    return new Date(chat.dernierMessageDate);
  }



  getSenderMessage(senderID: string, receiverID: string, ami) {
    const db = firebase.firestore();
    let id = senderID + "ekang" + receiverID;

    db.collection(`messages`)
      .doc(id)
      .onSnapshot(messages => {
        let changes = messages.data();
        if (changes["chats"] && changes["chats"].length) {
          changes["chats"] = changes["chats"].reverse();
          ami["lastMessage"] = changes["chats"][0]["texte"];
          if (changes["chats"][0]["date"]) {
            ami["ladate"] = changes["chats"][0]["date"];
          }
        }
      });
  }
}
