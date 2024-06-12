import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/User/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: 'nutritionist', loadChildren: () => import('./modules/nutritionist/nutritionist.module').then(m => m.NutritionistModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
