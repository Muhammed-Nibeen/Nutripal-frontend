import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import e from 'express';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { DailyIntake, TrackProgress, User } from '../../../interfaces/auth';
import { UserService } from '../../../services/user.service';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
// import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrl: './user-progress.component.css'
})
export class UserProgressComponent implements OnInit{

  xIcon = faXTwitter

  constructor(private router:Router,
  private userservice:UserService,  
  private messageService:MessageService,
  private fb:FormBuilder){}
  
  weightChangeMessage = '';
  progressPercentage = 0;
  showProgressSection:boolean = false;
  numberofDays!:Number
  weightChange!:Number
  userData!:User
  jwttoken!:string|null
  days!:number
  dailyIntake:DailyIntake = {
    program: '',
    calories: '',
    protein: '',
    fats: '',
    carbs: ''
  }
  
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // Only run this code in the browser
      this.jwttoken = localStorage.getItem('user_token');
      if (this.jwttoken) {
        const decode = jwtDecode(this.jwttoken);
        this.userData = decode as User;
      }
    }

    this.getUserProgress()
  }

  logout(){
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id')
    this.router.navigate(['userLogin'])
  }

  progressForm = this.fb.group({
    currentDate: ['',[Validators.required]],
    currentWeight: ['',[Validators.required]]
  })

  get currentDate(){
    return this.progressForm.controls['currentDate']
  }

  get currentWeight(){
    return this.progressForm.controls['currentWeight']
  }

  getUserProgress(){
    this.userservice.userProgress(this.userData).subscribe({
      next:(response: any) => {
        this.days = response.daysDifference
        this.dailyIntake = response.dailyIntake
      },
      error:(error: any) =>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }

  onSubmit(){
    if(this.progressForm.valid){
      console.log("THis is the onsubmit",this.progressForm.value);
      this.userservice.trackProgress(this.progressForm.value as TrackProgress,this.userData).subscribe({
        next:(response: any) => {
          
          this.weightChange = response.weightChange
          this.numberofDays = response.numberofDays
          const weightStatus = response.progress.program
          const initialWeight = response.progress.initialWeight
          const currentWeight = response.progress.currentWeight
          const desiredWeight = response.progress.desiredWeight

          this.progressPercentage = this.calculateProgressPercentage(initialWeight,currentWeight,desiredWeight);
          console.log("hayaya",this.progressPercentage)
          if (weightStatus === 'Weightgain') {
            this.weightChangeMessage = `User has gained weight by ${this.weightChange} kg over ${this.numberofDays} days.`;
          } else {
            this.weightChangeMessage = `User has lost weight by ${this.weightChange} kg over ${this.numberofDays} days.`;
          }
          
          this.showProgressSection = true;

        },
        error:(error: any) =>{
  
        }
      })
    }else{
      console.log('Form is invalid')
    }

  }

  calculateProgressPercentage(initialWeight: number, currentWeight: number,desiredWeight: number): number {
    const totalWeightChangeGoal = initialWeight - desiredWeight;
    const currentProgress = initialWeight - currentWeight;
    let progressPercentage = (currentProgress / totalWeightChangeGoal) * 100;

    progressPercentage = Math.max(0, Math.min(100, progressPercentage));

    return progressPercentage;
  }

  shareOnX() {
    // Logic for sharing on X platform
    console.log('Sharing on X platform');
  }

  shareOnInstagram() {
    // Logic for sharing on Instagram
    console.log('Sharing on Instagram');
  }

  shareOnFacebook() {
    // Logic for sharing on Facebook
    console.log('Sharing on Facebook');
  }

}
