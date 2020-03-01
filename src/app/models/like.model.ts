import { Publication } from './publication.model';
import * as firebase from 'firebase';

export class Like {
    id: string;
    idpublication: string;
    idutilisateur: string;
    date: Date;
    valide: boolean

    constructor(utilisateur: firebase.User, publication: Publication) {
        this.id = utilisateur.uid + publication.id;
        this.date = new Date();
        this.valide = true;
        this.idpublication = publication.id;
        this.idutilisateur = utilisateur.uid;
    }
}