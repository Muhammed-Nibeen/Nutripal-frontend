import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { NutriProfile } from '../../../interfaces/auth';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-nutri-profile',
  templateUrl: './nutri-profile.component.html',
  styleUrl: './nutri-profile.component.css'
})
export class NutriProfileComponent implements OnInit{

  nutriId!: string
  nutriProfile:NutriProfile = {
    _id: '',
    fullName: '',
    email: '',
    experience: '',
    specialization: '',
    password: '',
    isblocked: false
  }

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.nutriId = params['id'] || '';
        console.log('THis is nutriId1',this.nutriId);
      })
    this.nutriprofile()
  }

  nutriprofile(){
    this.userService.getNutriProfile(this.nutriId).subscribe({
      next:(response: any)=>{
        this.nutriProfile = response.nutri
        console.log('Thsi is profile',this.nutriProfile);
      },
      error:(error: any) => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }

  logout(){
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id')
    this.router.navigate(['userLogin'])
  }

}
