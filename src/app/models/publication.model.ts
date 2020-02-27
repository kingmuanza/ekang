import { Profil } from './profil.model';

export class Publication {

    id: string;
    date: Date;
    profil: Profil;
    cover: string; // image de base
    images: Array<string>;
    video: string;
    texte: string;

    constructor(texte: string, profil: Profil) {
        this.date = new Date();
        this.id = this.generateUID();
        this.texte = texte;
        this.profil = profil;
    }

    generateUID() {
        const date = new Date();
        const dateString = date.toISOString().split('T')[0]
        return dateString + Math.ceil(Math.random()*1000000)
    }



}
