import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from '../../../interfaces/auth';
import { AdminService } from '../../../services/admin.service';
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
    private router:Router
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


  toggleBlockStatus(user:any){
    alert(user)
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