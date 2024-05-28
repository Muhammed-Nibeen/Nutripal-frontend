import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Nutritionist } from '../../../interfaces/auth';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-view-nutritionist',
  templateUrl: './view-nutritionist.component.html',
  styleUrl: './view-nutritionist.component.css'
})
export class ViewNutritionistComponent {

    constructor(private adminservice:AdminService,
    private messageService:MessageService,
    private router:Router
    ){}

    Nutritionist:Nutritionist[]=[]

    ngOnInit(): void{
      this.adminservice.getnutris().subscribe(
        (response:any)=>{
          this.Nutritionist = response.users
        },
        (error:any) =>{
          this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
        }
      )
      }

    logout(){
      localStorage.removeItem('admin_token');
      this.router.navigate(['adminlogin'])
    } 

    toggleBlockStatus(user:any){
      this.adminservice.managenutri(user._id).subscribe(
        (response:any)=>{
          if(response){
            console.log(response.updatedUser)
            const index = this.Nutritionist.findIndex(u => u._id === response.updatedUser._id)
            if(index !== -1){
              this.Nutritionist[index].isblocked = response.updatedUser.isblocked
            }
          }
        },
        (error:any)=>{
          this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
        }
      )
    }

}
