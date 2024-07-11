import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../../interfaces/auth';
import { ChatService } from '../../../services/chat.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-chat-a',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messageArray:ChatMessage []= []
  nutriId: string = ""
  userId!: string
  currentRoomId!: string
  newMessage: string = ''
  constructor(private chatService: ChatService,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => { 
      this.nutriId = params['id'] || '';
      this.loadMessage();
    });

    if (typeof localStorage !== 'undefined') {
      const userId = localStorage.getItem('user_id');
      if (userId && this.nutriId) {
        this.userId = userId;
        this.joinRoom(userId);
      }
    } else {
      console.log('localStorage is not available.');
    }
  
 
  }

  sendMessage() {
    if (this.newMessage.trim() && this.nutriId) {
      const newMessageObject: ChatMessage = {
        message: this.newMessage,
        senderId: this.userId,
        receiverId: this.nutriId,
        timestamp: new Date(),
        _id: ''
      };
      this.chatService.sendMessage(this.userId, this.nutriId, this.newMessage);
      this.messageArray.push(newMessageObject);
      this.newMessage = '';
    }
  }

  joinRoom(userId: string) {
    const newRoomId = this.getRoomId(userId, this.nutriId);
    this.currentRoomId = newRoomId;
    console.log('Joining room with ID:', this.currentRoomId);
    this.chatService.joinRoom(this.currentRoomId);
    this.loadMessage();
    this.chatService.receiveMessage().subscribe((message) => {
      console.log("This is the message im waiting for",message)
      this.messageArray.push(message)
      // this.chatmessages.push(message);
    });
  }

  getRoomId(userId1: string, userId2: string): string {
    console.log('roomId: ', [userId1, userId2].sort().join('_'))
    return [userId1, userId2].sort().join('_');
  }

  
  loadMessage(){
    this.chatService.getMessages(this.nutriId,this.userId).subscribe({
      next:(res) =>{
        this.messageArray = [...this.messageArray,...res.messages]
        console.log('messages: ',this.messageArray)
      }
    })
  }

}
