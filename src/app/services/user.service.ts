import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase';
import { Profil } from '../models/profil.model';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private firestore: AngularFirestore) { }

  // Cette fonction permet de mettre une classe en format JSON pour firebase
  purifier(element) {
    return JSON.parse(JSON.stringify(element));
  }

  createUser(utilisateur: firebase.User) {
    const element = this.purifier(utilisateur);
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').doc(utilisateur.uid).set(element).then(() => {
        resolve();
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getUtilisateurs(): Promise<Array<firebase.User>>{
    const db = firebase.firestore();
    const utilisateurs = new Array<firebase.User>();
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').get().then((resultats) => {
        resultats.forEach((resultat)=>{
          const utilisateur = resultat.data() as firebase.User;
          utilisateurs.push(utilisateur);
        });
        resolve(utilisateurs);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getProfils(): Promise<Array<Profil>>{
    const db = firebase.firestore();
    const profils = new Array<Profil>();
    return new Promise((resolve, reject) => {
      db.collection('profils').get().then((resultats) => {
        resultats.forEach((resultat)=>{
          const profil = resultat.data() as Profil;
          profils.push(profil);
        });
        resolve(profils);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  updateProfil(profil: Profil) {
    const db = firebase.firestore();
    const element = this.purifier(profil);
    return new Promise((resolve, reject) => {
      if (profil.utilisateur) {
        db.collection('profils').doc(profil.utilisateur.uid).set(element).then(() => {
          resolve();
        }).catch((e) => {
          reject(e);
        });
      } else {
        reject('NO_UTILISATEUR');
      }
    });
  }

  getProfil(utilisateur: firebase.User): Promise<Profil> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('profils').doc(utilisateur.uid).get().then((resultat) => {
        if (resultat.data()) {
          const profil = resultat.data() as Profil;
          resolve(profil);
        } else {
          resolve(null);
        }
      }).catch((e) => {
        reject(e);
      })
    });
  }

  read_Users() {
    return this.firestore.collection("Users").snapshotChanges();
  }

  update_Student(recordID, record) {
    this.firestore.doc("Users/" + recordID).update(record);
  }

  delete_User(record_id) {
    this.firestore.doc("Users/" + record_id).delete();
  }

  read_ProfessionList() {
    return this.firestore.collection("Professions").snapshotChanges();
  }
}
