import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { NotificationEkang } from "../models/notification.model";
import { resolve } from "url";
import { Profil } from "../models/profil.model";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor() {}

  purifier(element) {
    return JSON.parse(JSON.stringify(element));
  }

  createNotification(notification: NotificationEkang) {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection("notifications")
        .doc(notification.id)
        .set(this.purifier(notification))
        .then(() => {
          resolve(notification);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  getNotifications(): Promise<Array<NotificationEkang>> {
    const db = firebase.firestore();
    const notifications = new Array<NotificationEkang>();
    return new Promise((resolve, reject) => {
      db.collection("notifications")
        .get()
        .then(resultats => {
          resultats.forEach(resultat => {
            const notification = resultat.data() as NotificationEkang;
            notifications.push(notification);
          });
          // console.log(notifications);

          resolve(notifications);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  getMyNotifications(profil: Profil): Promise<Array<NotificationEkang>> {
    const db = firebase.firestore();
    let notifications = new Array<NotificationEkang>();
    return new Promise((resolve, reject) => {
      db.collection("notifications")
        .get()
        .then(resultats => {
          resultats.forEach(resultat => {
            const notification = resultat.data() as NotificationEkang;
            notifications.push(notification);
          });
          notifications = notifications.filter(notification => {
            if (profil.abonnements) {
              if (profil.abonnements.length > 0) {
                const resultats = profil.abonnements.filter(index => {
                  return index === notification.profil.utilisateur.uid;
                });
                if (resultats.length > 0) {
                  return true;
                }
              }
            }
            return false;
          });
          console.log("profil");
          // console.log(profil);
          // console.log("notifications pour utilisateur");
          //console.log(notifications);
          resolve(notifications);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
  envoyeurEmail(data, name, auteur) {
    const email = firebase.functions().httpsCallable("sendCommentaireEmail");
    email({ tabMails: data, nom: name, auteur: auteur })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
