import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { RegisterationComponent } from '../../pages/User/registeration/registeration.component';
import { LoginComponent } from '../../pages/User/login/login.component';
import { OtpVerifyComponent } from '../../pages/User/otp-verify/otp-verify.component';
import { UserHomeComponent } from '../../pages/User/user-home/user-home.component';
import { ForgotpassComponent } from '../../pages/User/forgotpass/forgotpass.component';
import { ForgotpassotpComponent } from '../../pages/User/forgotpassotp/forgotpassotp.component';
import { SetPasswordComponent } from '../../pages/User/set-password/set-password.component';
import { BmiCalculatorComponent } from '../../pages/User/bmi-calculator/bmi-calculator.component';
import { ShowfoodComponent } from '../../pages/User/showfood/showfood.component';
import { ConsultComponent } from '../../pages/User/consult/consult.component';
import { Beef, Croissant, LucideAngularModule, Utensils } from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card'; 
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    UserComponent,
    RegisterationComponent,
    LoginComponent,
    OtpVerifyComponent,
    UserHomeComponent,
    ForgotpassComponent,
    ForgotpassotpComponent,
    SetPasswordComponent,
    BmiCalculatorComponent,
    ShowfoodComponent,
    ConsultComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    LucideAngularModule.pick({Utensils, Beef,Croissant}),
    FormsModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    DialogModule
  ]
})
export class UserModule { }
