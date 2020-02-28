import { Injectable } from "@angular/core";
import * as firebase from "firebase";
@Injectable({
  providedIn: "root"
})
export class VilleService {
  constructor() {}

  getVilles(): Promise<Array<firebase.User>> {
    const db = firebase.firestore();
    const villes = [];
    return new Promise((resolve, reject) => {
      db.collection("villes")
        .get()
        .then(resultats => {
          resultats.forEach(resultat => {
            const ville = resultat.data();
            villes.push(ville);
          });
          resolve(villes);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
