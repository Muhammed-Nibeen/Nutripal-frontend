import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { Food } from '../../../interfaces/auth';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrl: './add-food.component.css'
})
export class AddFoodComponent {
  previewImage: string | null = null
  image!: File;
  constructor(private router: Router,
    private fb: FormBuilder,
    private adminservice: AdminService,
    private messageService:MessageService) { }

  changeImage(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files?.length > 0) {
      this.image = target.files[0]
      const file = target.files[0]
      this.previewImage = URL.createObjectURL(file)
    }
  }

  logout() {
    localStorage.removeItem('admin_token');
    this.router.navigate(['adminlogin'])
  }

  addfoodForm = this.fb.group({
    foodName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    kcal: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    protein: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    carbs: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    fats: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    category:['',[Validators.required]],
    portion:['',[Validators.required]],
    description:['',Validators.required]
  })


  get foodName() {
    return this.addfoodForm.controls['foodName'];
  }
  get kcal() {
    return this.addfoodForm.controls['kcal'];
  }
  get protein() {
    return this.addfoodForm.controls['protein'];
  }
  get carbs() {
    return this.addfoodForm.controls['carbs'];
  }
  get fats() {
    return this.addfoodForm.controls['fats'];
  }
  get category() {
    return this.addfoodForm.controls['category'];
  }
  get portion() {
    return this.addfoodForm.controls['portion'];
  }
  get description() {
    return this.addfoodForm.controls['description'];
  }
  

  onSubmit() {
    if (this.addfoodForm) {
      console.log("This is the values in front end",this.addfoodForm.value)
      const formData: FormData = new FormData();
      const formValue: any = this.addfoodForm.value; 

      for (const key in formValue) {
        if (formValue.hasOwnProperty(key)) {
          formData.append(key, formValue[key]);
        }
      }

      if (this.image) {
        formData.append('image', this.image);
      }

      console.log('this is the image', formData)
      this.adminservice.addFood(formData as any).subscribe({
        next: (response: any) => {
          if(response.message){
            this.addfoodForm.reset()
            this.messageService.add({severity:'success',summary:'Success',detail: response.message})
          }
        },
        error:(error: any)=>{
          this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
        }
      })
    }
  }

}
