import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.css'
})
export class VideoCallComponent implements OnInit {

  localStream!: MediaStream
  peerConnection: RTCPeerConnection | null = null 


  config = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  };

  userId: string = ""
  nutriId!: string
  currentRoomId!: string
  
  private messageSubscription!: Subscription;
  private offerSubscription!: Subscription;
  private answerSubscription!: Subscription;
  private candidateSubscription!: Subscription;

  constructor(private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router) {  }

    ngOnInit() {
      this.route.params.subscribe((params: Params) => { 
        this.userId = params['id'] || '';
        console.log('THis is userid1',this.userId);
         
      });
  
      if(typeof localStorage !== 'undefined'){
        const nutriId = localStorage.getItem('nutri_id')
        console.log("THis is the nutri_id 1",nutriId);
        if(nutriId && this.userId){
          this.nutriId = nutriId
        }
        this.joinRoom();
      }else{
        console.log('localStorage is not availabe')
      }
  
      this.offerSubscription = this.chatService.receiveOffer().subscribe(async (offer) => {
        if (this.peerConnection) {
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await this.peerConnection.createAnswer();
          await this.peerConnection.setLocalDescription(answer);
          this.chatService.sendAnswer(answer, this.currentRoomId);
        }
      });
  
      this.answerSubscription = this.chatService.receiveAnswer().subscribe(async (answer) => {
        if (this.peerConnection) {
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });
  
      this.candidateSubscription = this.chatService.receiveCandidate().subscribe(async (candidate) => {
        if (this.peerConnection) {
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });
  
    }

  joinRoom() {
    const newRoomId = this.getRoomId(this.nutriId, this.userId);
    this.currentRoomId = newRoomId;
    console.log('Joining room with ID:', this.currentRoomId);
    this.chatService.joinRoom(this.currentRoomId);
  }

  getRoomId(nutriId1: string, nutriId2: string): string {
    console.log('roomId: ', [nutriId1, nutriId2].sort().join('_'))    
    return [nutriId1, nutriId2].sort().join('_');
  }



  async startCall() {
    this.createPeerConnection();
    // Request local media stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.localStream = stream;
      stream.getTracks().forEach(track => this.peerConnection!.addTrack(track, stream));
  
      const localVideo: HTMLVideoElement = document.getElementById('localVideo') as HTMLVideoElement;
      localVideo.srcObject = stream;
  
      // Create offer and send it to the other peer
      const offer = await this.peerConnection!.createOffer();
      await this.peerConnection!.setLocalDescription(offer);
      this.chatService.sendOffer(this.peerConnection!.localDescription!, this.currentRoomId);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      }
    };

  async answerCall() {
    this.createPeerConnection();
  };

  createPeerConnection() {
    this.peerConnection = new RTCPeerConnection(this.config);

    this.peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        this.chatService.sendCandidate(candidate, this.currentRoomId);
      }
    };

    this.peerConnection.ontrack = (event) => {
      const [remoteStream] = event.streams;
      const remoteVideo: HTMLVideoElement = document.getElementById('remoteVideo') as HTMLVideoElement;
      console.log("remote video", remoteVideo);
      if (remoteVideo) {
        remoteVideo.srcObject = remoteStream;
      }
    };

    // Get local media stream and add tracks to peer connection
    const localVideo: HTMLVideoElement = document.getElementById('localVideo') as HTMLVideoElement;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.localStream = stream;
        stream.getTracks().forEach(track => this.peerConnection!.addTrack(track, stream));
        localVideo.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  };

endCall() {
  if (this.peerConnection) {
    this.peerConnection.close();
    this.peerConnection = null;

    // Stop all tracks in the local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }

    const localVideo: HTMLVideoElement  = document.getElementById('localVideo') as HTMLVideoElement;
    if (localVideo) {
      localVideo.srcObject = null;
    }
    const remoteVideo: HTMLVideoElement  = document.getElementById('remoteVideo') as HTMLVideoElement;;
    if (remoteVideo) {
      remoteVideo.srcObject = null;
    }

    }
    this.router.navigate(['/showappointment'])
  };

toggleCamera() {
  if (this.localStream) {
    const videoTrack = this.localStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    }
  };

ngOnDestroy(): void {
  this.messageSubscription?.unsubscribe();
  this.offerSubscription?.unsubscribe();
  this.answerSubscription?.unsubscribe();
  this.candidateSubscription?.unsubscribe();
  this.chatService.leaveRoom(this.currentRoomId); 
 };

}
