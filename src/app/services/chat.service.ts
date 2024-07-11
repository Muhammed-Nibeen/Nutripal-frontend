import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { getEnvironmentData } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _socket: Socket;
  private baseUrl = 'http://localhost:3000';
  constructor(private http:HttpClient) { 
    this._socket = io(this.baseUrl,{})

    this._socket.on('connect_error',(error)=>{
      console.log('Socket connection error',error);
    })

    this._socket.on('connect',()=>{
      console.log('Successfully connected to socket server')
    })
  }

  hello(){
    return this.http.get(`${this.baseUrl}/user/sample`)
  }

  joinRoom(roomId: string){
    this._socket.emit('joinRoom',roomId)
  }

  leaveRoom(roomId: string){
    this._socket.emit('leaveRoom',roomId)
  }
  sendMessage(senderId: string,receiverId: string,message: string){
    this._socket.emit('sendMessage',{senderId,receiverId,message})
  }

  receiveMessage(): Observable<any>{
    return new Observable(observer => {
      this._socket.on('receiverMessage',(data)=>{
        console.log('Message received from socket:', data);
        if (data) {
          observer.next(data);
        } else {
          console.log('Received undefined data from socket.');
        }
      })
    })
  }

  getMessages(userId: string,nutriId: string): Observable<any>{
    const requestBody = {userId: userId,nutriId: nutriId};
    return this.http.post(`${this.baseUrl}/user/getmessages`,requestBody)
  }

}
