import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _socket: Socket;
  baseUrl = enviroment.baseUrl
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

  // Webrtr Signaling methods

  sendOffer(offer: RTCSessionDescriptionInit, roomId: string): void {
    this._socket.emit('offer', offer, roomId);
    console.log("The offered room id is", roomId);
  };

  sendAnswer(answer: RTCSessionDescriptionInit, roomId: string): void {
    this._socket.emit('answer', answer, roomId);
    console.log("The answered room id is", roomId);
  };

  sendCandidate(candidate: RTCIceCandidate, roomId: string): void {
    this._socket.emit('candidate', candidate, roomId);
    console.log("The candidate room id is", roomId);
  };

  receiveOffer(): Observable<any> {
    return new Observable<any>(observer => {
      this._socket.on('offer', (offer) => {
        observer.next(offer);
      });
    });
  };

  receiveAnswer(): Observable<any> {
    return new Observable<any>(observer => {
      this._socket.on('answer', (answer) => {
        observer.next(answer);
      });
    });
  };

  receiveCandidate(): Observable<any> {
    return new Observable<any>(observer => {
      this._socket.on('candidate', (candidate) => {
        observer.next(candidate);
      });
    });
  };
}
