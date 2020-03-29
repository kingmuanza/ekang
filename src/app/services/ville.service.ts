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

  verifieVille(data): Promise<Array<firebase.User>> {
    const db = firebase.firestore();
    const res = [];
    return new Promise((resolve, reject) => {
      db.collection("lesvilles")
        .where("pays", "==", `${data.pays}`)
        .where("ville", "==", `${data.ville}`)
        .get()
        .then(resultats => {
          resultats.forEach(resultat => {
            const ville = resultat.data();
            res.push(ville);
          });
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  getVillePays(data): Promise<any> {
    const db = firebase.firestore();
    const villes = [];
    return new Promise((resolve, reject) => {
      db.collection("lesvilles")
        .where("pays", "==", `${data.pays}`)
        .orderBy("ville")
        .get()
        .then(resultats => {
          resultats.forEach(resultat => {
            let ville = resultat.data();
            ville["id"] = resultat.id;
            villes.push(ville);
          });
          resolve(villes);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  addVille(data): Promise<any> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection(`lesvilles`)
        .add({ ville: data.ville, pays: data.pays })
        .then(resultats => {
          resolve(resultats);
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

  getPays(): Promise<Array<any>> {
    const db = firebase.firestore();
    let pays = [];
    return new Promise((resolve, reject) => {
      db.collection("pays")
        .get()
        .then(resultats => {
          // console.log(resultats);
          // console.log(resultats.docs);
          resultats.docs.forEach(doc => {
            console.log(doc.data());

            const p = doc.data();
            pays.push(p);
          });
          resolve(pays);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
  addPays(data): Promise<any> {
    const db = firebase.firestore();
    //const villes = [];
    let obj = { continent: "Oceanie", pays: data };
    return new Promise((resolve, reject) => {
      db.collection("pays")
        .add(obj)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
