import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/User/chat/chat.component';
import { ErrorComponent } from './pages/User/error/error.component';
import { HomeComponent } from './pages/User/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: 'nutritionist', loadChildren: () => import('./modules/nutritionist/nutritionist.module').then(m => m.NutritionistModule) },
  { path: '**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
