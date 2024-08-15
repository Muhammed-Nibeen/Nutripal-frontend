import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrl: './food-view.component.css'
})
export class FoodViewComponent {

  showForm = false;
  foodArray: any = [];

  constructor(private adminservice:AdminService,
    private router:Router,
    private messageService: MessageService){}

  logout(){
    localStorage.removeItem('admin_token');
    this.router.navigate(['adminlogin'])
  }

  toggleBreakfast(){
    this.adminservice.toogleBreakfast().subscribe({
      next:(response: any) => {
        this.foodArray = response.food
        this.showForm = true;
        console.log('THis is the fodd',this.foodArray);
        
      }
    })
  }

  toggleLunch(){
    console.log('this is the lunch');
    
    this.adminservice.toogleLunch().subscribe({
      next:(response: any) => {
        this.foodArray = response.food
        this.showForm = true;
        console.log('THis is the ',this.foodArray);
        
      }
    })
  }

  toggleDinner(){
    console.log('this is the dinner');
    this.adminservice.toogleDinner().subscribe({
      next:(response: any) => {
        this.foodArray = response.food
        this.showForm = true;
        console.log('THis is  ',this.foodArray);
      },
      error:(error: any)=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
    
  }

  submitForm(food:any){
    this.adminservice.updateFood(food._id, food).subscribe({
      next: (response: any) => {
        console.log('Food updated', response);
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.message})
      },
      error:(error: any)=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }

}
