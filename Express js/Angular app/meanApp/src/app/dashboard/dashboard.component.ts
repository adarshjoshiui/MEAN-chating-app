import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
// import { ChatService } from '../services/chat.service';
import * as moment from 'moment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: any;
  messages: any[] = [];
  id;
  onlineUsersArray: any[];
  constructor(public chatService: ChatService,public user: UserService) { } 
  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.chatService.getMessages()
      .subscribe((message: any) => {
        console.log(message.msg)
        message.time = moment().format('hh:mm:ss a');
        this.id = this.chatService.socketId
        this.messages.push(message);
      });
      // this.getOnlineUser()
      // console.log(this.messages)
  }

  getOnlineUser() {
    this.user.getOnlineUsers().subscribe(users=>this.onlineUsersArray = users)
  }
}
