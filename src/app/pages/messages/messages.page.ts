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
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe((utilisateur) => {
      this.utilisateur = utilisateur;
      this.userService.getProfil(this.utilisateur).then(monProfil => {
        this.monProfil = monProfil;
      });
      if (!utilisateur) {
        this.router.navigate(["connexion"]);
      } else {
        this.getChats();
        this.userService.getProfils().then(profils => {
          this.profilsResultats = profils.filter(profil => {
            return profil.utilisateur.uid !== this.utilisateur.uid;
          });
        });
      }
    });
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

  goToChat(chat: Chat) {
    const profil1 = chat.profil1;
    const profil2 = chat.profil2;
    if (profil1.utilisateur.uid === this.utilisateur.uid) {
      localStorage.setItem('interlocuteurEkang', JSON.stringify(profil2));
      this.router.navigate(["messages", "chat", profil2.utilisateur.uid]);
    } else {
      localStorage.setItem('interlocuteurEkang', JSON.stringify(profil1));
      this.router.navigate(["messages", "chat", profil1.utilisateur.uid]);
    }
  }

  getDate(chat: Chat) {
    return new Date(chat.dernierMessageDate);
  }

}
