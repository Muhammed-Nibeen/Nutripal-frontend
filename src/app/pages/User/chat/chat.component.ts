import { Component, OnInit } from '@angular/core';
import { ChatMessage, NutritionistResponse } from '../../../interfaces/auth';
import { ChatService } from '../../../services/chat.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NutritionistService } from '../../../services/nutritionist.service';
import { MessageService } from 'primeng/api';

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
  nutriName: NutritionistResponse = { fullName: '' };

  constructor(private chatService: ChatService,
    private route: ActivatedRoute,
    private nutriService: NutritionistService,
    private messageService:MessageService) { }
  
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
    
    this.getName(this.nutriId)
 
  }

  getName(nutriId: string){
    this.nutriService.getNameNutri(nutriId).subscribe({
      next:(response:NutritionistResponse) =>{
        this.nutriName = response
        console.log('Response from getNameNutri:', response); 
        console.log('This is the name:', this.nutriName);
      },
      error: (error) => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
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
