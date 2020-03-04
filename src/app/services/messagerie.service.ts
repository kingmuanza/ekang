import { Injectable } from "@angular/core";
import { Message } from "../models/message.model";
import * as firebase from "firebase";
@Injectable({
  providedIn: "root"
})
export class MessagerieService {
  constructor() {}

  purifier(element) {
    return JSON.parse(JSON.stringify(element));
  }
  saveMessage(message: Message): Promise<any> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection("messages")
        .add(this.purifier(message))
        .then(() => {
          resolve(message);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
