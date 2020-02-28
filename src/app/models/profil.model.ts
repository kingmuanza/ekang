import * as firebase from "firebase";

export class Profil {
  id: string;
  photo: string;
  pays: string;
  profession: string;
  ville: string;
  utilisateur: firebase.User;

  constructor(utilisateur: firebase.User) {
    this.utilisateur = utilisateur;
  }
}
