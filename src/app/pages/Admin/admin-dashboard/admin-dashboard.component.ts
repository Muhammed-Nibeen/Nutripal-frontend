import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService,MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from '../../../interfaces/auth';
import { AdminService } from '../../../services/admin.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  private getUsersSubscription: Subscription | null = null

  filterObj = { Email: '' };
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 0;

  constructor(private adminservice:AdminService,
    private messageService:MessageService,
    private confirmationService: ConfirmationService,
    private router:Router,
    ){}

  Users:User[]=[]
  
  searchUser(){
    console.log(this.filterObj.Email)
    this.adminservice.searchbyEmail(this.filterObj.Email).subscribe(
      (response) => {
        this.Users = response.user

      },
      (error:any)=>{
         this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
      }
    )
  }
  
  ngOnInit(): void{
    this.getusers()
  }

  getusers(){
    this.getUsersSubscription = this.adminservice.getUsers(this.currentPage, this.itemsPerPage).subscribe(
      (response:any)=>{
        this.Users = response.users
        this.totalPages = Math.ceil(response.totalcount / this.itemsPerPage);
      },
      (error:any) =>{
        this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
      }
    )
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getusers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getusers();
    }
  }
  
  confirmBlock(user: any, event: Event) {
    // Show confirmation dialog before blocking the user
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to block this user?',
      icon: 'pi pi-exclamation-circle',
      accept: () => {
        this.toggleBlockStatus(user);
      },
      reject: () => {
        // Show rejection message
        this.messageService.add({
          severity: 'error',
          summary: 'Action Canceled',
          detail: 'You have canceled the block action.',
          life: 3000,
        });
      }
    });
  }


  toggleBlockStatus(user:any){
    user.isblocked = !user.isblocked;
    this.adminservice.manageUsers(user._id).subscribe(
      (response:any)=>{
        if(response){
          console.log(response.updatedUser)
          const index = this.Users.findIndex(u => u._id === response.updatedUser._id)
          if(index !== -1){
            this.Users[index].isblocked = response.updatedUser.isblocked
          }
          
        }
      },
      (error:any)=>{
        this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
      }
    )
  }

  logout(){
    localStorage.removeItem('admin_token');
    this.router.navigate(['adminlogin'])
  }

  ngOnDestroy(): void {
    if(this.getUsersSubscription){
      this.getUsersSubscription.unsubscribe()
    } 
  }

}