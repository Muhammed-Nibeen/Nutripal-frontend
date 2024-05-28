import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // const token = localStorage.getItem('user_token');
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

export const authGuardForLoggedUser: CanActivateChildFn = (route, state) => {
  const router = inject(Router);

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
    localStorage.removeItem('token')
    return true
  }

}