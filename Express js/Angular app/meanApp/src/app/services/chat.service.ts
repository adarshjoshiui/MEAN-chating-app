import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;
    public socketId;
    constructor() {
        this.socket = io(this.url);
        // console.log(this.socket.id,'id:::')
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                this.socketId = this.socket.id;
                console.log(this.socket.id,'id');
                observer.next(message);
            });
        });
    }
}