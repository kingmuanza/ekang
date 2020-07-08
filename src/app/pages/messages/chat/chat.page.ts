import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessagerieService } from "src/app/services/messagerie.service";
import { Message } from "src/app/models/message.model";
import { AuthentificationService } from "src/app/services/authentification.service";
import * as firebase from "firebase";
import { IonContent, ActionSheetController } from "@ionic/angular";
import { MessageChat } from 'src/app/models/message.chat.model';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"]
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;
  profil: Profil;
  monProfil: Profil;
  user: boolean = false;
  sontAmis = false;
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  messages = new Array<MessageChat>();
  messagesChat = [];
  messageText: any;
  senderId: string;
  receiverId: string;
  actionSheet: any;
  chat: Chat;
  messagesGroupes = [];
  aujourdhui = new Date().toISOString().split('T')[0];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public auth: AuthentificationService,
    private router: Router,
    private messagerie: MessagerieService,
    public actionSheetController: ActionSheetController
  ) {
  }

  ngOnInit() {
    this.profil = JSON.parse(localStorage.getItem('interlocuteurEkang'));
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      console.log('ID du recepteur');
      console.log(id);
      if (id) {
        this.userService.getProfilByID(id).then((profil) => {
          if (profil) {
            this.profil = profil;
            this.receiverId = this.profil.utilisateur.uid;
            this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe((utilisateur) => {
              if (!utilisateur) {
                this.router.navigate(['connexion']);
              } else {
                this.utilisateur = utilisateur;
                this.senderId = utilisateur.uid;
                this.getMessages(this.senderId, this.receiverId);
                this.userService.getProfil(this.utilisateur).then(monProfil => {
                  this.monProfil = monProfil;
                  this.chat = new Chat(profil, monProfil);
                  this.getChat(this.chat.id);
                  console.log('this.chat');
                  console.log(this.chat);
                });
              }
            });
            this.auth.emettre();
          } else {
            console.log('On ne retrouve plus le profil');
          }
        });
      }
    });
  }

  async presentActionSheet(message) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.supprimerMessage(message);
        }
      }]
    });
    await actionSheet.present();
  }

  messageGroupe(messages: Array<MessageChat>) {
    let groupes = {

    } as any;

    messages.forEach((message) => {
      if (message.date) {
        const key = new Date(message.date).toISOString().split('T')[0];
        if (groupes[key]) {

        } else {
          groupes[key] = []
        }
        groupes[key].push(message);
      }
    });

    const messagesGroupesParDate = [];
    const keys = Object.keys(groupes);
    keys.forEach((key) => {
      messagesGroupesParDate.push({
        date: key,
        messages: groupes[key]
      });
    });
    // console.log('messagesGroupesParDate');
    // console.log(messagesGroupesParDate);
    return messagesGroupesParDate;

  }

  supprimerMessage(message: MessageChat) {
    if (!this.messages) {
      console.log("rien");
    } else {
      this.messages = this.messages.filter((element) => {
        const isID = message.id === element.id;
        return !(isID);
      });
      const db = firebase.firestore();
      db.collection(`messagesChats`).doc(message.id).delete().then(() => {

      });
    }
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
    this.messageText = "";
  }


  getIDChat(senderID: string, receiverID: string) {
    let ids = [];
    ids.push(senderID);
    ids.push(receiverID);
    ids = ids.sort();
    let ID = '';
    ids.forEach((id) => {
      ID = ID + id;
    });
    return ID;
  }

  getMessages(senderID: string, receiverID: string) {
    this.messages = [];
    console.log('messages...');
    const db = firebase.firestore();
    let ID = this.getIDChat(senderID, receiverID);
    db.collection(`messagesChats`)
      .where('chatID', '==', ID)
      .orderBy('date')
      .onSnapshot((resultats) => {
        this.messages = [];
        resultats.forEach((resultat) => {
          const message = resultat.data() as MessageChat;
          this.messages.push(message);
        })
        this.messagesGroupes = this.messageGroupe(this.messages);
        setTimeout(() => {
          this.content.scrollToBottom(200);
        }, 400);
      });
  }

  envoyerMessage() {
    if (this.messageText) {
      let ID = this.getIDChat(this.senderId, this.receiverId);
      const messageChat = new MessageChat();
      messageChat.chatID = this.chat.id;
      messageChat.texte = this.messageText;
      messageChat.emetteurID = this.monProfil.utilisateur.uid;
      messageChat.date = new Date();
      messageChat.lu = false;
      this.chat.dernierMessages = [];
      this.chat.dernierMessages.push(messageChat);
      this.chat.dernierMessageDate = new Date();
      if (this.chat.nonLus) {
      } else {
        this.chat.nonLus = {};
        this.chat.nonLus[this.profil.utilisateur.uid] = 0;
      }
      this.chat.nonLus[this.profil.utilisateur.uid] += 1;

      const db = firebase.firestore();
      db.collection(`messagesChats`)
        .doc(messageChat.id).set(JSON.parse(JSON.stringify(messageChat))).then(() => {
          this.saveChat(this.chat);
          setTimeout(() => {
            this.content.scrollToBottom(200);
          }, 200);
        });
      this.messageText = '';
    }
  }

  saveChat(chat: Chat) {
    console.log('chat');
    console.log(chat);
    const db = firebase.firestore();
    db.collection(`chats`)
      .doc(chat.id).set(JSON.parse(JSON.stringify(chat))).then(() => {

      });
  }

  getChat(id: string) {
    const db = firebase.firestore();
    db.collection(`chats`)
      .doc(id).get().then((resultat) => {
        this.chat = resultat.data() as Chat;
        if (this.chat.dernierVus) {
          this.chat.dernierVus[this.monProfil.utilisateur.uid] = new Date();
        } else {
          this.chat.dernierVus = {};
          this.chat.dernierVus[this.monProfil.utilisateur.uid] = new Date();
        }
        if (this.chat.nonLus) {
        } else {
          this.chat.nonLus = {};
        }
        this.chat.nonLus[this.monProfil.utilisateur.uid] = 0;
        this.saveChat(this.chat);
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('this.chat');
        console.log(this.chat);
      });
  }

  resolveDate(date) {
    if (date.seconds) {
      return date.toDate();
    } else {
      return date;
    }
  }
}
