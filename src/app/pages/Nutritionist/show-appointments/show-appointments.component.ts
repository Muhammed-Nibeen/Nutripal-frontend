import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ConfirmationService,MessageService } from 'primeng/api';
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
  selectedAppointment: Appointment = {
    _id: '',
    user_id: '',
    nutri_id: '',
    date: '',
    time: '',
    end_time: '',
    status: '',
    // add other properties if needed
  };
  editVisible: boolean = false;

  medications: { name: string, dosage: string, frequency: string }[] = [
    { name: '', dosage: '', frequency: '' }
  ];
  
  prescriptionDetails: string = '';

  isModalOpen:boolean = false;
  Pvisible: boolean = false;
  appointmentId: string = ''
  userId: string = ''
  nutriId: string = ''
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 0;


  constructor(private nutritionistservice:NutritionistService,
    private messageService:MessageService,
    private cdr: ChangeDetectorRef,
    private router:Router,
    private confirmationService: ConfirmationService,
    ){}

  

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
  //  getCount() { 
  //   this.Appointments.map(async (appointment) => {
  //      this.unreadMessages(appointment.user_id,appointment.nutri_id);
  //     console.log("Function call 2", appointment.user_id);
  //   });
  // }
  

  getAppointment(){
   this.nutritionistservice.getAppointment(this.nutriData,this.currentPage,this.itemsPerPage).subscribe({
       next: (response: any) => {
         this.Appointments = response.appoinments;
         this.totalPages = Math.ceil(response.totalcount / this.itemsPerPage)
         console.log('Appointments fetched:', this.Appointments);
        //  this.getCount()

       },
       error: (error: any) => {
        console.error('Error fetching appointments:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
       }
     })
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAppointment();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAppointment();
    }
  }

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

  videoCall(user_id:string){
    this.router.navigateByUrl(`/videocall/${user_id}`)
  }

  editAppointment(appointment:Appointment){
    console.log('This is the appointemnt',appointment);
    const formattedDate = new Date(appointment.date).toISOString().split('T')[0];
    this.selectedAppointment = {...appointment,date: formattedDate}
    this.visible = true;
  }

  saveAppointment(){
    this.visible = false;
    const updatedAppointment: Appointment = {
      ...this.selectedAppointment,
      date: new Date(this.selectedAppointment.date).toISOString(), // Convert date back to ISO string
    };

    this.nutritionistservice.updateAppointment(updatedAppointment).subscribe({
      next:(response:any)=>{
        // this.Appointments = response.Appointment
        this.getAppointment()
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.message})
      },
      error:(error)=>{
        this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
      }
    })

  }

  deleteAppointment(appointmentId:string){
    console.log('This is a show',appointmentId);
    
    this.nutritionistservice.deleteAppointment(appointmentId,this.nutriData).subscribe({
      next:(response:any)=>{
        // this.Appointments = response.appointment
        this.getAppointment()
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.message})
      },
      error:(error)=>{
        this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
      }
    })
  }

  showDialog(id: string,userid: string,nutriid: string) {
    
    this.userId = userid
    this.nutriId = nutriid
    this.appointmentId = id
    this.Pvisible = true;
  }


  closePrescriptionModal() {
    this.Pvisible = false;
  }

  addMedication() {
    this.medications.push({ name: '', dosage: '', frequency: '' });
  }

  removeMedication(index: number) {
    if (this.medications.length > 1) {
      this.medications.splice(index, 1);
    }
  }

  savePrescription() {
    const prescriptionData = {
      appointmentId: this.appointmentId,
      userId: this.userId,
      nutriIdS: this.nutriId,
      medications: this.medications,
      details: this.prescriptionDetails
    };
  
    this.nutritionistservice.savePrescription(prescriptionData).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.resetForm();
        this.closePrescriptionModal();
      },
      error:(error: any)=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    });
  }

  resetForm() {
    this.medications = [{ name: '', dosage: '', frequency: '' }];
    this.prescriptionDetails = '';
  }



}
