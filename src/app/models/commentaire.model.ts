import { Publication } from './publication.model';
import * as firebase from 'firebase';

export class Commentaire {
    id: string;
    date = new Date();
    publication: Publication;
    texte: string;
    utilisateur: firebase.User;

    constructor(texte: string, publication: Publication, utilisateur: firebase.User) {
        this.id = this.generateUID();
        this.texte = texte;
        this.publication = publication;
        this.utilisateur = utilisateur;
    }

    generateUID() {
        const date = new Date();
        const dateString = date.toISOString().split('T')[0]
        return dateString + Math.ceil(Math.random()*1000000)
    }

}