import { Profil } from './profil.model';
import { Publication } from './publication.model';

export class NotificationEkang {

    id: string;
    profil: Profil;
    date = new Date();
    type: string;
    publication?: Publication;

    constructor(profil: Profil, type: string) {

        this.id = this.generateUID();
        this.profil = profil;
        this.type = type;

    }

    generateUID() {
        const date = new Date();
        const dateString = date.toISOString().split('T')[0]
        return dateString + Math.ceil(Math.random()*1000000)
    }



}
