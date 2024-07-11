import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { Appointment, Nutritionist, User } from '../../../interfaces/auth';
import { NutritionistService } from '../../../services/nutritionist.service';



@Component({
  selector: 'app-show-appointments',
  templateUrl: './show-appointments.component.html',
  styleUrl: './show-appointments.component.css'
})
export class ShowAppointmentsComponent implements OnInit {

  jwttoken!: string|null
  nutriData!: Nutritionist
  Appointments:Appointment[]=[]
  userDetails!:User
  visible: boolean = false;
  unreadmessageCount: { [key: string]: number } = {};

  constructor(private nutritionistservice:NutritionistService,
    private messageService:MessageService,
    private cdr: ChangeDetectorRef,
    private router:Router){}

  

  ngOnInit(): void {
      
    if(typeof window!== 'undefined'){
      this.jwttoken = localStorage.getItem('nutri_token')
      
      if(this.jwttoken){
        const decode = jwtDecode(this.jwttoken)
        this.nutriData = decode as Nutritionist
      }
    }
     
    this.getAppointment()

  }
   getCount() {
    console.log("Function call 1");
    this.Appointments.map(async (appointment) => {
       this.unreadMessages(appointment.user_id,appointment.nutri_id);
      console.log("Function call 2", appointment.user_id);
    });
  }
  

  getAppointment(){
   this.nutritionistservice.getAppointment(this.nutriData).subscribe({
       next: (response: any) => {
         this.Appointments = response.appoinments;
         console.log('app', this.Appointments);
         this.getCount()

       },
       error: (error: any) => {
         this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
       }
     })
  }

  // getToken(){
  //   if(typeof window!== 'undefined'){
  //     this.jwttoken = localStorage.getItem('nutri_token')
  //     if(this.jwttoken){
  //       const decode = jwtDecode(this.jwttoken)
  //       this.nutriData = decode as Nutritionist
  //     }
  //   }
  // }

  // getAppointments(){
    
  // }

  showInfo(id: string){
    this.nutritionistservice.showUserApp(id as string).subscribe({
      next:(response:any)=>{
        this.visible = true;
        this.userDetails = response.user
        console.log("This is the user details",this.userDetails)
        
      },
      error:(error)=>{
        if(error && error.error.error){
          this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
        }
      }
    })
  }

  chat(user_id:string){
    this.router.navigateByUrl(`/nutrichat/${user_id}`)
  }

  unreadMessages(user_id: string,nutri_id: string){
    console.log("Function call 3");
    this.nutritionistservice.getCount(user_id,nutri_id).subscribe({
      next:(response:any)=>{
        this.unreadmessageCount[user_id] = response.unreadMessageCounts[user_id];
        console.log("This is the responese",this.unreadmessageCount);
      },
      error:(error)=>{
        this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
      }
    })
  }

}
