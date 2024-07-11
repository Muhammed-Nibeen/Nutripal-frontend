import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // const token = localStorage.getItem('user_token');

  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    router.navigate(['userLogin']);
    return false;
  }

  const token = localStorage.getItem(
    'user_token'
  )
  if (!token) {
    router.navigate(['userLogin']);
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      return true;
    } else {
      localStorage.removeItem('user_token');
      router.navigate(['userLogin']);
      return false;
    }
  } catch (error) {
    localStorage.removeItem('user_token');
    router.navigate(['userLogin']);
    return false;
  }
};

export const authGuardForLoggedUser: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if(typeof window === 'undefined'){
    return true;
  }
  const token = localStorage.getItem('user_token');
  if (!token) {
    return true
  }

  try {
    const decodedToken: any = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)
    if (decodedToken.exp > currentTime) {
      router.navigate(['userHome'])
      return false;
    }
    return true
  } catch (error) {
    localStorage.removeItem('user_token')
    return true
  }

}

export const userblockGuard: CanActivateFn = async(route,state)=>{
  const router = inject(Router)
  if(typeof window === 'undefined'){
    return true;
  }
  const authService = inject(AuthService)
  const token = localStorage.getItem('user_token')
  if(!token){
    router.navigate(['userLogin'])
    return false
  }

  try{
    const decodedToken:any = jwtDecode(token)
    const currentTime = Math.floor(Date.now()/1000)
    if(decodedToken.exp > currentTime){
      if(decodedToken.user_type == 'User'){
        const userid = decodedToken.id
        const res = await firstValueFrom(authService.getUser(userid))
        if(res.user.isblocked){
          localStorage.removeItem('user_token')
          router.navigate(['userLogin'])
          return false
        }else{
          return true
        }
      }else{
        router.navigate(['userLogin'])
        return false
      }
    }else{
      localStorage.removeItem('user_token')
      router.navigate(['userLogin'])
      return false
    }
  }catch(error){
    localStorage.removeItem('user_token')
    router.navigate(['userLogin'])
    return false
  }

}