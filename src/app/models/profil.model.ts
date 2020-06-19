import * as firebase from "firebase";

export class Profil {
  id: string;
  photo: string;
  pays: string;
  profession: string;
  ville: string;
  continent: string;
  ekangName: string;
  tel: string;
  utilisateur: firebase.User;
  lastConnexionDate: number;
  abonnements = new Array<string>();
  abonnes = new Array<string>();
  sendersMessages = new Array<string>();
<<<<<<< HEAD
  
=======
  messagesNonlus = new Array<string>();
>>>>>>> 320794de4e4cfd402cb43848b13409da433a16db
  constructor(utilisateur: firebase.User) {
    this.utilisateur = utilisateur;
  }
}
