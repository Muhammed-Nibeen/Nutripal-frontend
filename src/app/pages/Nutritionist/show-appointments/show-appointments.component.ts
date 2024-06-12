import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(private nutritionistservice:NutritionistService,
    private messageService:MessageService,
    private cdr: ChangeDetectorRef){}

  

  ngOnInit(): void {
      
    if(typeof window!== 'undefined'){
      this.jwttoken = localStorage.getItem('nutri_token')
      console.log('toke',this.jwttoken);
      
      if(this.jwttoken){
        const decode = jwtDecode(this.jwttoken)
        this.nutriData = decode as Nutritionist
      }
    }
    
    this.getAppointment()

  }

    getAppointment(){
    this.nutritionistservice.getAppointment(this.nutriData).subscribe({
      next:(response:any)=>{
        this.Appointments = response.appoinments
        console.log('app',this.Appointments);
      },
      error:(error:any)=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error})
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

  

}
