import * as firebase from "firebase";
export class Message {
  //  id: string;
  date: Date;
  utilisateur: firebase.User;
  cover: string; // image de base
  images: Array<string>;
  video: string;
  texte: string;
  senderId: string;
  receiverId: string;

  constructor(texte: string, senderId: string, receiverId: string) {
    this.date = new Date();

    this.texte = texte;

    this.senderId = senderId;
    this.receiverId = receiverId;
  }

  /* generateUID() {
        const date = new Date();
        const dateString = date.toISOString().split('T')[0]
        return dateString + Math.ceil(Math.random() * 1000000)
    } */
}
