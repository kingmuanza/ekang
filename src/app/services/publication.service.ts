import { Injectable } from '@angular/core';
import { Publication } from '../models/publication.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor() { }

  // Cette fonction permet de mettre une classe en format JSON pour firebase
  purifier(element) {
    return JSON.parse(JSON.stringify(element));
  }
  savePublication(publication: Publication): Promise<Publication> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('publications').doc(publication.id).set(this.purifier(publication)).then(() => {
        resolve(publication);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getPublication(id: string) {

  }

  getPublications(): Promise<Array<Publication>> {
    const db = firebase.firestore();
    let publications = new Array<Publication>();
    return new Promise((resolve, reject) => {
      db.collection('publications').get().then((resultats) => {
        resultats.forEach(resultat => {
          const publication = resultat.data() as Publication;
          publications.push(publication);
        });
        resolve(publications);
      }).catch((e)=>{
        reject(e);
      });
    });
  }

  getPublicationsFromUser(utilisateur: firebase.User): Promise<Array<Publication>> {
    const db = firebase.firestore();
    let publications = new Array<Publication>();
    return new Promise((resolve, reject) => {
      db.collection('publications').where('utilisateur.uid', '==', utilisateur.uid).get().then((resultats) => {
        resultats.forEach(resultat => {
          const publication = resultat.data() as Publication;
          publications.push(publication);
        });
        resolve(publications);
      }).catch((e)=>{
        reject(e);
      });
    });
  }

  deletePublication(id: string) {

  }
}
