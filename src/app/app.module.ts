import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/User/home/home.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptor/auth2.interceptor';
import { DialogModule } from 'primeng/dialog';
import { DatePipe } from '@angular/common';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { NutritionistModule } from './modules/nutritionist/nutritionist.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card'; 
import { ButtonModule } from 'primeng/button';
 //websocket
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

//Websocket configuaration
const config:SocketIoConfig = {url:'http://localhost:8080',options:{} }

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    AdminModule,
    UserModule,
    NutritionistModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    FormsModule,
    DialogModule,
    SocketIoModule.forRoot(config),
    
  ],
  providers: [
    provideClientHydration(),
    MessageService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
