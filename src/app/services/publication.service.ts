import { Injectable } from "@angular/core";
import { Publication } from "../models/publication.model";
import * as firebase from "firebase";
import { Like } from "../models/like.model";
import { Commentaire } from "../models/commentaire.model";

@Injectable({
  providedIn: "root"
})
export class PublicationService {
  constructor() {}

  // Cette fonction permet de mettre une classe en format JSON pour firebase
  purifier(element) {
    return JSON.parse(JSON.stringify(element));
  }
  savePublication(publication: Publication): Promise<Publication> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection("publications")
        .doc(publication.id)
        .set(this.purifier(publication))
        .then(() => {
          resolve(publication);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  getPublication(id: string): Promise<Publication> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection("publications")
        .doc(id)
        .get()
        .then(resultat => {
          const publication = resultat.data() as Publication;
          resolve(publication);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  getPublications(): Promise<Array<Publication>> {
    const db = firebase.firestore();
    let publications = new Array<Publication>();
    return new Promise((resolve, reject) => {
      db.collection("publications")
        .get()
        .then(resultats => {
          resultats.forEach(resultat => {
            const publication = resultat.data() as Publication;
            publications.push(publication);
          });
          resolve(publications);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  getPublicationsFromUser(
    utilisateur: firebase.User
  ): Promise<Array<Publication>> {
    const db = firebase.firestore();
    let publications = new Array<Publication>();
    return new Promise((resolve, reject) => {
      db.collection("publications")
        .where("utilisateur.uid", "==", utilisateur.uid)
        .get()
        .then(resultats => {
          resultats.forEach(resultat => {
            const publication = resultat.data() as Publication;
            publications.push(publication);
          });
          resolve(publications);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  deletePublication(id: string) {}

  like(
    utilisateur: firebase.User,
    publication: Publication
  ): Promise<Publication> {
    const db = firebase.firestore();
    const like = new Like(utilisateur, publication);
    return new Promise((resolve, reject) => {
      db.collection("likes")
        .doc(like.id)
        .set(this.purifier(like))
        .then(() => {
          if (publication.likes) {
            publication.likes += 1;
          } else {
            publication.likes = 1;
          }
          if (publication.likeurs) {
            publication.likeurs.push(utilisateur.uid);
          } else {
            publication.likeurs = new Array<string>();
            publication.likeurs.push(utilisateur.uid);
          }
          this.savePublication(publication)
            .then(p => {
              resolve(publication);
            })
            .catch(e => {
              reject(e);
            });
        })
        .catch(e => {
          reject(e);
        });
    });
  }
  unlike(
    utilisateur: firebase.User,
    publication: Publication
  ): Promise<Publication> {
    const db = firebase.firestore();
    const like = new Like(utilisateur, publication);
    return new Promise((resolve, reject) => {
      db.collection("likes")
        .doc(like.id)
        .set(this.purifier(like))
        .then(() => {
          if (publication.likes) {
            publication.likes -= 1;
          } else {
            publication.likes = 0;
          }
          if (publication.likeurs) {
            publication.likeurs.push(utilisateur.uid);
          } else {
            publication.likeurs = new Array<string>();
            publication.likeurs.push(utilisateur.uid);
          }
          this.savePublication(publication)
            .then(p => {
              resolve(publication);
            })
            .catch(e => {
              reject(e);
            });
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  saveCommentaire(commentaire: Commentaire): Promise<Commentaire> {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection("commentaires")
        .doc(commentaire.id)
        .set(this.purifier(commentaire))
        .then(() => {
          resolve(commentaire);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  getCommentaires(publication: Publication): Promise<Array<Commentaire>> {
    const db = firebase.firestore();
    const commentaires = new Array<Commentaire>();
    return new Promise((resolve, reject) => {
      db.collection("commentaires")
        .where("publication.id", "==", publication.id)
        .get()
        .then(resutats => {
          resutats.forEach(resutat => {
            const commentaire = resutat.data() as Commentaire;
            commentaires.push(commentaire);
          });
          commentaires.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
              ? -1
              : 1;
          });
          resolve(commentaires);
        });
    });
  }
  getCommentairesofUtilisateur(utilisateur: firebase.User): Promise<Array<Commentaire>> {
    const db = firebase.firestore();
    const commentaires = new Array<Commentaire>();
    return new Promise((resolve, reject) => {
      db.collection("commentaires")
        .where("utilisateur.uid", "==", utilisateur.uid)
        .get()
        .then(resutats => {
          resutats.forEach(resutat => {
            const commentaire = resutat.data() as Commentaire;
            commentaires.push(commentaire);
          });
          commentaires.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
              ? -1
              : 1;
          });
          resolve(commentaires);
        });
    });
  }
  getLikesofUtilisateur(utilisateur: firebase.User): Promise<Array<Publication>> {
    const db = firebase.firestore();
    const publications = new Array<Publication>();
    return new Promise((resolve, reject) => {
      db.collection("publications")
        .where("likeurs", "array-contains", utilisateur.uid)
        .get()
        .then(resutats => {
          resutats.forEach(resutat => {
            const publication = resutat.data() as Publication;
            publications.push(publication);
          });
          publications.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
              ? -1
              : 1;
          });
          resolve(publications);
        });
    });
  }
}
