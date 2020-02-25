import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { NotificationEkang } from '../models/notification.model';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  purifier(element) {
    return JSON.parse(JSON.stringify(element));
  }

  createNotification(notification: NotificationEkang) {
    const db = firebase.firestore();
    return new Promise((resolve, reject)=>{
      db.collection('notifications').doc(notification.id).set(this.purifier(notification)).then(()=>{
        resolve(notification);
      }).catch((e)=>{
        reject(e);
      })
    });
  }

  getNotifications(): Promise<Array<NotificationEkang>> {
    const db = firebase.firestore();
    const notifications = new Array<NotificationEkang>();
    return new Promise((resolve, reject) => {
      db.collection('notifications').get().then((resultats)=>{
        resultats.forEach(resultat => {
          const notification = resultat.data() as NotificationEkang;
          notifications.push(notification);
        });
        resolve(notifications);
      }).catch((e)=>{
        reject(e);
      });
    });
  }

}
