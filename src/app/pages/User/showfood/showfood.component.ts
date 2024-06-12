import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Food, User } from '../../../interfaces/auth';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-showfood',
  templateUrl: './showfood.component.html',
  styleUrl: './showfood.component.css'
})
export class ShowfoodComponent implements OnInit{

  constructor(private router:Router,
    private userservice:UserService){}

  userData!:User
  jwttoken!:string|null
  bmiValue!:number
  bmiResult!: number
  foodArray!: Food[]
  
  ngOnInit(): void {
    if(typeof document!== 'undefined'){
      const buttons = document.querySelectorAll('.buttons button') as NodeListOf<HTMLButtonElement>;
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
        });
      });
    }

    
    this.jwttoken = localStorage.getItem('user_token')
    if(this.jwttoken){
      const decode = jwtDecode(this.jwttoken)
      this.userData = decode as User
    }

    this.userservice.showBmi(this.userData as User).subscribe({
      next:(response:any)=>{
        this.bmiValue = response.bmiValues
        this.bmiResult = response.result
      }
    })
  
    this.toggleBreakfast();
    this.toggleLunch();
    this.toggleDinner();
    
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
        console.log(response.food)
        },
        error: (error: any) => {
          console.error('Error fetching breakfast food');
        }
      });
    }
  }

  toggleLunch() {
    if (this.bmiResult) {
      this.userservice.displayLunch(this.bmiResult).subscribe({
        next: (response: any) => {
        this.foodArray = response.food
        console.log(response.food)
        },
        error: (error: any) => {
          console.error('Error fetching breakfast food');
        }
      });
    }
  }

  toggleDinner() {
    if (this.bmiResult) {
      this.userservice.displayDinner(this.bmiResult).subscribe({
        next: (response: any) => {
        this.foodArray = response.food
        console.log(response.food)
        },
        error: (error: any) => {
          console.error('Error fetching breakfast food');
        }
      });
    }
  }


}




