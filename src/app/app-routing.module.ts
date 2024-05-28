import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuardGuard, authGuardForLoggedAdmin } from './guards/admin-auth-guard.guard';
// import { adminAuthGuardGuard, authGuardForLoggedAdmin } from './guards/admin-auth-guard.guard';

import { authGuardForLoggedUser, userAuthGuard } from './guards/userAuth.guard';
import { AddFoodComponent } from './pages/Admin/add-food/add-food.component';
import { AdminDashboardComponent } from './pages/Admin/admin-dashboard/admin-dashboard.component';
import { AdminloginComponent } from './pages/Admin/adminlogin/adminlogin.component';
import { ViewNutritionistComponent } from './pages/Admin/view-nutritionist/view-nutritionist.component';
import { NutriDashboardComponent } from './pages/Nutritionist/nutri-dashboard/nutri-dashboard.component';
import { NutriLoginComponent } from './pages/Nutritionist/nutri-login/nutri-login.component';
import { NutriRegisterComponent } from './pages/Nutritionist/nutri-register/nutri-register.component';
import { NutriverifyOtpComponent } from './pages/Nutritionist/nutriverify-otp/nutriverify-otp.component';
import { BmiCalculatorComponent } from './pages/User/bmi-calculator/bmi-calculator.component';
import { ForgotpassComponent } from './pages/User/forgotpass/forgotpass.component';
import { ForgotpassotpComponent } from './pages/User/forgotpassotp/forgotpassotp.component';
import { HomeComponent } from './pages/User/home/home.component';
import { LoginComponent } from './pages/User/login/login.component';
import { OtpVerifyComponent } from './pages/User/otp-verify/otp-verify.component';
import { RegisterationComponent } from './pages/User/registeration/registeration.component';
import { SetPasswordComponent } from './pages/User/set-password/set-password.component';
import { ShowfoodComponent } from './pages/User/showfood/showfood.component';
import { UserHomeComponent } from './pages/User/user-home/user-home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'userRegister',component:RegisterationComponent},
  {path:'userLogin',component:LoginComponent,canActivate:[authGuardForLoggedUser]},
  {path:'userRegister/verify-otp',component:OtpVerifyComponent},
  {path:'userHome',component:UserHomeComponent,canActivate:[userAuthGuard]},
  {path:'forgotpass',component:ForgotpassComponent},
  {path:'forgotpassotp',component:ForgotpassotpComponent},
  {path:'setpassword',component:SetPasswordComponent},
  {path:'bmicalculator',component:BmiCalculatorComponent},
  {path:'showfood',component:ShowfoodComponent},
  
  //Admin

  {path:'adminlogin',component:AdminloginComponent,canActivate:[authGuardForLoggedAdmin]},
  {path:'admindash',component:AdminDashboardComponent,canActivate:[adminAuthGuardGuard]},
  {path: 'admin', redirectTo: 'adminlogin', pathMatch: 'full' },
  {path:'viewnutritionist',component:ViewNutritionistComponent},
  {path:'addfood',component:AddFoodComponent},
  
  //Nutritionist
  
  {path:'nutriregister',component:NutriRegisterComponent},
  {path:'nutriRegister/verify-otp',component:NutriverifyOtpComponent},
  {path:'nutriLogin',component:NutriLoginComponent},
  {path:'nutritionist', redirectTo:'nutriLogin',pathMatch:'full'},
  {path:'nutrihome',component:NutriDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
