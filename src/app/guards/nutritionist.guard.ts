import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn,Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const nutritionistGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if(typeof window === 'undefined' || typeof localStorage === 'undefined'){
    router.navigate(['nutriLogin']);
    return false
  }

  const token = localStorage.getItem('nutri_token')
  if(!token){
    router.navigate(['nutriLogin'])
    return false;
  }

  try{
    const decodedToken: any = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime){
      return true
    }else{
      localStorage.removeItem('nutri_token')
      router.navigate(['nutriLogin'])
      return false;
    }
  }catch(error){
    localStorage.removeItem('nutri_token')
    router.navigate(['nutriLogin'])
    return false
  }
};

export const authGuardForLoggedNutritionist: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if(typeof window === 'undefined'){
    return true
  }
  const token = localStorage.getItem('nutri_token')
  if(!token){
    return true
  }
  
  try{
    const decodedToken: any = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)
    if (decodedToken.exp > currentTime){
      router.navigate(['nutrihome'])
      return false
    }
    return true
  }catch (error){
    localStorage.removeItem('nutri_token')
    return true
  }
}

export const nutritionistblockGuard: CanActivateFn = async(route,state)=>{
  const router = inject(Router)
  if(typeof window === 'undefined'){
    return true
  }

  const authService = inject(AuthService)
  const token = localStorage.getItem('nutri_token')
  if(!token){
    router.navigate(['nutriLogin'])
    return false
  }

  try{
    const decodedToken:any = jwtDecode(token)
    const currentTime = Math.floor(Date.now()/1000)
    if(decodedToken.exp > currentTime){
      if(decodedToken.user_type == 'Nutritionist'){
        const nutriid = decodedToken.id
        const res = await firstValueFrom(authService.getNutritionist(nutriid))
        if(res.nutritionist.isblocked){
          localStorage.removeItem('nutri_token')
          router.navigate(['nutriLogin'])
          return false
        }else{
          return true
        }
      }else{
        router.navigate(['nutriLogin'])
        return false
      }
    }else{
      localStorage.removeItem('nutri_token')
      router.navigate(['nutriLogin'])
      return false
    }
  }catch(error){
    localStorage.removeItem('nutri_token')
    router.navigate(['nutriLogin'])
    return false
  }
}