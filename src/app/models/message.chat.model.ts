import { Chat } from './chat.model';

export class MessageChat {
    id: string;
    texte: string;
    image: string;
    date: Date;
    emetteurID: string;
    chatID: string; 
    lu: boolean;
    constructor() {
        this.id = this.generateUID();
        this.lu = false;
    }
    generateUID() {
        const date = new Date();
        const dateString = date.toISOString().split('T')[0]
        return dateString + Math.ceil(Math.random() * 100000000)
    }
}