import { Profil } from './profil.model';
import { MessageChat } from './message.chat.model';

export class Chat {

    id: string;
    profil1: Profil;
    profil2: Profil;
    dernierMessages: Array<MessageChat>;
    chatersID = new Array<string>();
    dernierMessageDate: Date;
    nonLus: Object;
    dernierVus: Object;

    constructor(profil1: Profil, profil2: Profil) {
        this.id = this.generateID(profil1, profil2);
        this.profil1 = profil1;
        this.profil2 = profil2;
        this.chatersID.push(profil1.utilisateur.uid);
        this.chatersID.push(profil2.utilisateur.uid);
        this.nonLus = {};
        this.nonLus[this.profil1.utilisateur.uid] = 0; 
        this.nonLus[this.profil2.utilisateur.uid] = 0; 
        this.dernierVus = {};
        this.dernierVus[this.profil1.utilisateur.uid] = new Date('2020-01-01'); 
        this.dernierVus[this.profil2.utilisateur.uid] = new Date('2020-01-01');
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
