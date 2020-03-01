
import * as firebase from "firebase";
export class Publication {

    id: string;
    date: Date;
    utilisateur: firebase.User;
    cover: string; // image de base
    images: Array<string>;
    video: string;
    texte: string;
    likes?: number;
    likeurs = new Array<string>();

    constructor(texte: string, utilisateur: firebase.User) {
        this.date = new Date();
        this.id = this.generateUID();
        this.texte = texte;
        this.utilisateur = utilisateur;
        this.likes = 0;
    }

    generateUID() {
        const date = new Date();
        const dateString = date.toISOString().split('T')[0]
        return dateString + Math.ceil(Math.random() * 1000000)
    }



}
