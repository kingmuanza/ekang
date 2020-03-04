import * as firebase from "firebase";

export class Profil {
  id: string;
  photo: string;
  pays: string;
  profession: string;
  ville: string;
  utilisateur: firebase.User;

  abonnements = new Array<string>();
  abonnes = new Array<string>();
  sendersMessages = new Array<string>();
  constructor(utilisateur: firebase.User) {
    this.utilisateur = utilisateur;
  }
}
