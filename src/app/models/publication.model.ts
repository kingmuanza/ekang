
import * as firebase from "firebase";
export class Publication {

    id: string;
    date: Date;
    utilisateur: firebase.User;
    cover: string; // image de base
    images: Array<string>;
    video: string;
    texte: string;

    constructor(texte: string, utilisateur: firebase.User) {
        this.date = new Date();
        this.id = this.generateUID();
        this.texte = texte;
        this.utilisateur = utilisateur;
    }

    generateUID() {
        const date = new Date();
        const dateString = date.toISOString().split('T')[0]
        return dateString + Math.ceil(Math.random() * 1000000)
    }



}
