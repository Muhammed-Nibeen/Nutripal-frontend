import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { ChatMessage, UserResponse } from '../../../interfaces/auth';
import { ChatService } from '../../../services/chat.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NutritionistService } from '../../../services/nutritionist.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chat-b',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  messageArray:ChatMessage []= []
  userId: string = ""
  nutriId!: string
  currentRoomId!: string
  newMessage: string = ''
  userName: UserResponse = { fullName: '' };

  unreadMessages: {[key: string]: ChatMessage [] } = {}

  constructor(private chatService: ChatService,
    private route: ActivatedRoute,
    private nutriService: NutritionistService,
    private cd: ChangeDetectorRef,
    private messageService:MessageService) {  }

  
  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => { 
      this.userId = params['id'] || '';
      this.loadMessage();  
    });

    if(typeof localStorage !== 'undefined'){
      const nutriId = localStorage.getItem('nutri_id')
      console.log("THis is the nutri_id 1",nutriId);
      if(nutriId && this.userId){
        this.nutriId = nutriId
        this.joinRoom(nutriId)
      }
    }else{
      console.log('localStorage is not availabe')
    }

    this.getName(this.userId)

  }

  getName(userId: string){
    this.nutriService.getNameUser(userId).subscribe({
      next:(response:UserResponse) =>{
        this.userName = response
        console.log('Response from getNameNutri:', response); 
        console.log('This is the name:', this.userName);
      },
      error: (error) => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }

  sendMessage() {
    if (this.newMessage.trim() && this.userId) {
      const newMessageObject: ChatMessage = {
        message: this.newMessage,
        senderId: this.nutriId,
        receiverId: this.userId,
        timestamp: new Date(),
        _id: ''
      };
      this.chatService.sendMessage(this.nutriId, this.userId, this.newMessage);
      this.messageArray.push(newMessageObject);
      this.newMessage = '';
    }
  }

  joinRoom(nutriId: string) {
    const newRoomId = this.getRoomId(nutriId, this.userId);
    this.currentRoomId = newRoomId;
    console.log('Joining room with ID:', this.currentRoomId);
    this.chatService.joinRoom(this.currentRoomId);
    this.loadMessage();
    this.chatService.receiveMessage().subscribe((message) => {
      console.log("This is the message im waiting for",message)
      
      // this.unreadMessages[message.senderId].push(message)
      this.messageArray.push(message)
    });
  }

  getRoomId(nutriId1: string, nutriId2: string): string {
    console.log('roomId: ', [nutriId1, nutriId2].sort().join('_'))    
    return [nutriId1, nutriId2].sort().join('_');
  }

  loadMessage(){
    this.chatService.getMessages(this.userId,this.nutriId).subscribe({
      next:(res) =>{
        this.messageArray = [...this.messageArray,...res.messages]
        console.log('messages: ',this.messageArray)
      }
    })
  }


  
}
