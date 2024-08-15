import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { Food, User } from '../../../interfaces/auth';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-showfood',
  templateUrl: './showfood.component.html',
  styleUrl: './showfood.component.css'
})
export class ShowfoodComponent implements OnInit{

  constructor(private router:Router,
    private userservice:UserService,
    private renderer: Renderer2,
    private el: ElementRef,
    private messageService: MessageService,
    ){}

  userData!:User
  jwttoken!:string|null
  bmiValue!:number
  bmiResult!: number
  foodArray!: Food[]
  

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // Only run this code in the browser
      this.jwttoken = localStorage.getItem('user_token');
      if (this.jwttoken) {
        const decode = jwtDecode(this.jwttoken);
        this.userData = decode as User;
      }

      this.userservice.showBmi(this.userData as User).subscribe({
        next: (response: any) => {
          this.bmiValue = response.bmiValues;
          this.bmiResult = response.result;
        }
      });

      this.toggleBreakfast();
      this.toggleLunch();
      this.toggleDinner();

      const buttons = document.querySelectorAll('.buttons button') as NodeListOf<HTMLButtonElement>;
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
        });
      });
    }
  }

  logout(){
    localStorage.removeItem('user_token');
    this.router.navigate(['userLogin'])
  }


  toggleBreakfast() {
    if (this.bmiResult) {
      this.userservice.displayFood(this.bmiResult).subscribe({
        next: (response: any) => {
        this.foodArray = response.food
        this.foodArray.forEach(food => {
          if (!food.description) {
            food.description = "Very nice and tasty food";
          }
        });
        },
        error:(error: any)=>{
          this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
        }
      });
    }
  }

  toggleLunch() {
    if (this.bmiResult) {
      this.userservice.displayLunch(this.bmiResult).subscribe({
        next: (response: any) => {
        this.foodArray = response.food
        this.foodArray.forEach(food => {
          if (!food.description) {
            food.description = "Very nice and tasty Lunch";
          }
        });
        console.log(response.food)
        },
        error:(error: any)=>{
          this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
        }
      });
    }
  }

  toggleDinner() {
    if (this.bmiResult) {
      this.userservice.displayDinner(this.bmiResult).subscribe({
        next: (response: any) => {
        this.foodArray = response.food
        this.foodArray.forEach(food => {
          if (!food.description) {
            food.description = "A really good breakfast option";
          }
        });
        console.log(response.food)
        },
        error:(error: any)=>{
          this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
        }
      });
    }
  }

  startDiet(){

    this.userservice.startDiet(this.userData).subscribe({
      
    })
  }

}




