import { Injectable } from '@angular/core';
import * as firebsase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor() { }

  connexion(login: string, passe: string) {
    return firebsase.auth().signInWithEmailAndPassword(login, passe);
  }

  inscription(login: string, passe: string) {
    return firebsase.auth().createUserWithEmailAndPassword(login, passe);
  }

}
