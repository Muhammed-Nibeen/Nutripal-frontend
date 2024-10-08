import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardForLoggedUser, userAuthGuard, userblockGuard } from '../../guards/userAuth.guard';
import { AboutUsComponent } from '../../pages/User/about-us/about-us.component';
import { BmiCalculatorComponent } from '../../pages/User/bmi-calculator/bmi-calculator.component';
import { BookingComponent } from '../../pages/User/booking/booking.component';
import { ChatComponent } from '../../pages/User/chat/chat.component';


import { ConsultComponent } from '../../pages/User/consult/consult.component';
import { ForgotpassComponent } from '../../pages/User/forgotpass/forgotpass.component';
import { ForgotpassotpComponent } from '../../pages/User/forgotpassotp/forgotpassotp.component';
import { HomeComponent } from '../../pages/User/home/home.component';
import { LoginComponent } from '../../pages/User/login/login.component';
import { NutriProfileComponent } from '../../pages/User/nutri-profile/nutri-profile.component';
import { OtpVerifyComponent } from '../../pages/User/otp-verify/otp-verify.component';
import { ProfileComponent } from '../../pages/User/profile/profile.component';
import { RegisterationComponent } from '../../pages/User/registeration/registeration.component';
import { SetPasswordComponent } from '../../pages/User/set-password/set-password.component';
import { ShowfoodComponent } from '../../pages/User/showfood/showfood.component';
import { UserHomeComponent } from '../../pages/User/user-home/user-home.component';
import { UserProgressComponent } from '../../pages/User/user-progress/user-progress.component';
import { VideocallEndComponent } from '../../pages/User/videocall-end/videocall-end.component';
import { VideochatComponent } from '../../pages/User/videochat/videochat.component';

const routes: Routes = [ 
{path:'',component:HomeComponent},
{path:'userRegister',component:RegisterationComponent},
{path:'userLogin',component:LoginComponent,canActivate:[authGuardForLoggedUser]},
{path:'userRegister/verify-otp',component:OtpVerifyComponent},
{path:'userHome',component:UserHomeComponent},
{path:'forgotpass',component:ForgotpassComponent},
{path:'forgotpassotp',component:ForgotpassotpComponent},
{path:'setpassword',component:SetPasswordComponent},
{path:'bmicalculator',component:BmiCalculatorComponent,canActivate:[userblockGuard]},
{path:'showfood',component:ShowfoodComponent},
{path:'consult',component:ConsultComponent},
{path:'chat/:id',component:ChatComponent},
{path:'aboutus',component:AboutUsComponent},
{path:'profile',component:ProfileComponent},
{path:'userprogress',component:UserProgressComponent},
{path:'uservideochat/:id',component:VideochatComponent},
{path:'booking',component:BookingComponent},
{path:'videocallend',component:VideocallEndComponent},
{path:'nutriprofile/:id',component:NutriProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

// {path:'userLogin',component:LoginComponent,canActivate:[authGuardForLoggedUser]},
// {path:'userHome',component:UserHomeComponent,canActivate:[userAuthGuard]},
// {path:'bmicalculator',component:BmiCalculatorComponent,canActivate:[userblockGuard]},