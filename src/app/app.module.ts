import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//components
import { RegisterationComponent } from './pages/User/registeration/registeration.component';
import { HomeComponent } from './pages/User/home/home.component';
import { LoginComponent } from './pages/User/login/login.component';
//styles
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

//Routing
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OtpVerifyComponent } from './pages/User/otp-verify/otp-verify.component';
import { UserHomeComponent } from './pages/User/user-home/user-home.component';

import { AdminloginComponent } from './pages/Admin/adminlogin/adminlogin.component';
import { ForgotpassComponent } from './pages/User/forgotpass/forgotpass.component';
import { ForgotpassotpComponent } from './pages/User/forgotpassotp/forgotpassotp.component';
import { AdminDashboardComponent } from './pages/Admin/admin-dashboard/admin-dashboard.component';
import { SetPasswordComponent } from './pages/User/set-password/set-password.component';
import { NutriRegisterComponent } from './pages/Nutritionist/nutri-register/nutri-register.component';
import { NutriLoginComponent } from './pages/Nutritionist/nutri-login/nutri-login.component';
import { NutriDashboardComponent } from './pages/Nutritionist/nutri-dashboard/nutri-dashboard.component';
import { NutriverifyOtpComponent } from './pages/Nutritionist/nutriverify-otp/nutriverify-otp.component';
import { ViewNutritionistComponent } from './pages/Admin/view-nutritionist/view-nutritionist.component';
import { BmiCalculatorComponent } from './pages/User/bmi-calculator/bmi-calculator.component';
import { AuthInterceptor } from './core/interceptor/auth2.interceptor';

import { AddFoodComponent } from './pages/Admin/add-food/add-food.component';
import { ShowfoodComponent } from './pages/User/showfood/showfood.component';
import { Beef, Croissant, LucideAngularModule, Utensils } from 'lucide-angular';

@NgModule({
  declarations: [
    AppComponent,
    RegisterationComponent,
    HomeComponent,
    LoginComponent,
    OtpVerifyComponent,
    UserHomeComponent,
    AdminloginComponent,
    ForgotpassComponent,
    ForgotpassotpComponent,
    AdminloginComponent,
    AdminDashboardComponent,
    SetPasswordComponent,
    NutriRegisterComponent,
    NutriLoginComponent,
    NutriDashboardComponent,
    NutriverifyOtpComponent,
    ViewNutritionistComponent,
    BmiCalculatorComponent,
    AddFoodComponent,
    ShowfoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    FormsModule,
    LucideAngularModule.pick({Utensils, Beef,Croissant   })
  ],
  providers: [
    provideClientHydration(),
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
