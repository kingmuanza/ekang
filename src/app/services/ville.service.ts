import { Injectable } from "@angular/core";
import * as firebase from "firebase";
@Injectable({
  providedIn: "root"
})
export class VilleService {
  list = [
    { name: "Amérique" },
    { name: "Afrique" },
    { name: "Asie" },
    { name: "Europe" }
  ];
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

  getContinent(): Promise<Array<any>> {
    const db = firebase.firestore();
    const continents = [];
    return new Promise((resolve, reject) => {
      db.collection("continents")
        .get()
        .then(resultats => {
          resultats.forEach(resultat => {
            const continent = resultat.data();
            continents.push(continent);
          });
          if (continents.length == 0) {
            resolve(this.list);
          } else {
            resolve(continents);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  }
  addPays(data): Promise<any> {
    const db = firebase.firestore();
    //const villes = [];
    return new Promise((resolve, reject) => {
      db.collection("pays")
        .add(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
