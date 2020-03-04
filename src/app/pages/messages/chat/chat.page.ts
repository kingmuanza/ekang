import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessagerieService } from "src/app/services/messagerie.service";
import { Message } from "src/app/models/message.model";
import { AuthentificationService } from "src/app/services/authentification.service";
import * as firebase from "firebase";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"]
})
export class ChatPage implements OnInit {
  profil: Profil;
  monProfil: Profil;
  user: boolean = false;
  sontAmis = false;
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  messages: any;
  messagesChat = [];
  messageText: any;
  senderId: string;
  receiverId: string;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public auth: AuthentificationService,
    private router: Router,
    private messagerie: MessagerieService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      console.log(id);

      if (id) {
        this.userService.getProfilByID(id).then(profil => {
          this.profil = profil;
          this.receiverId = this.profil.utilisateur.uid;
          this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
            utilisateur => {
              this.utilisateur = utilisateur;
              this.senderId = utilisateur.uid;
              this.getSenderMessage(this.senderId, this.receiverId);
              this.userService.getProfil(this.utilisateur).then(monProfil => {
                this.monProfil = monProfil;
              });
            }
          );

          this.auth.emettre();
        });
      }
    });
  }

  sendMessage() {
    if (!this.messages) {
      console.log("rien");

      const message = new Message(
        this.messageText,
        this.senderId,
        this.receiverId
      );
      let tab = [];
      tab.push({
        senderID: this.senderId,
        receiverID: this.receiverId,
        texte: this.messageText
      });
      message["chats"] = tab;
      this.saveMessageChat(message);
    } else {
      this.messages.chats.push({
        senderID: this.senderId,
        receiverID: this.receiverId,
        texte: this.messageText
      });
      this.saveMessageChat2(this.messages);
    }

    this.messageText = "";
  }

  saveMessageChat(message: Message) {
    this.messagerie
      .saveMessage(message, this.senderId, this.receiverId)
      .then(() => {
        if (this.profil.sendersMessages) {
          this.profil.sendersMessages = this.profil.sendersMessages.filter(
            elt => {
              return elt !== this.senderId;
            }
          );
          this.profil.sendersMessages.unshift(this.senderId);
        } else {
          this.profil.sendersMessages = [];
          this.profil.sendersMessages.unshift(this.senderId);
        }

        this.userService.updateProfil(this.profil).then(() => {
          // this.router.navigate(['publications']);
          console.log("update");
        });
      });
  }

  saveMessageChat2(message: Message) {
    this.messagerie
      .saveMessage2(message, this.senderId, this.receiverId)
      .then(() => {
        if (this.profil.sendersMessages) {
          this.profil.sendersMessages = this.profil.sendersMessages.filter(
            elt => {
              return elt !== this.senderId;
            }
          );
          this.profil.sendersMessages.unshift(this.senderId);
        } else {
          this.profil.sendersMessages = [];
          this.profil.sendersMessages.unshift(this.senderId);
        }

        this.userService.updateProfil(this.profil).then(() => {
          // this.router.navigate(['publications']);
          console.log("update");
        });
      });
  }

  getSenderMessage(senderID: string, receiverID: string) {
    const db = firebase.firestore();
    let id = senderID + "ekang" + receiverID;
    console.log(id);

    db.collection(`messages`)
      .doc(id)
      .onSnapshot(messages => {
        let changes = messages.data();
        console.log(changes);
        this.messages = changes;
        if (this.messages["chats"].length) {
          this.messagesChat = this.messages["chats"];
        }
      });
  }
}
