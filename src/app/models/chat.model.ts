import { Profil } from './profil.model';
import { MessageChat } from './message.chat.model';

export class Chat {

    id: string;
    profil1: Profil;
    profil2: Profil;
    dernierMessages: Array<MessageChat>;
    chatersID = new Array<string>();
    dernierMessageDate: Date;

    constructor(profil1: Profil, profil2: Profil) {
        this.id = this.generateID(profil1, profil2);
        this.profil1 = profil1;
        this.profil2 = profil2;
        this.chatersID.push(profil1.utilisateur.uid);
        this.chatersID.push(profil2.utilisateur.uid);
    }

    generateID(profil1: Profil, profil2: Profil) {
        let ids = [];
        ids.push(profil1.utilisateur.uid);
        ids.push(profil2.utilisateur.uid);
        ids = ids.sort();
        let ID = '';
        ids.forEach((id) => {
            ID = ID + id;
        });
        return ID;
    }

}
