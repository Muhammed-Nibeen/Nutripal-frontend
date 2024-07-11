import { inject,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


export const adminAuthGuardGuard: CanActivateChildFn = (route, state) => {

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.navigate(['adminlogin']);
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      console.log('decode token', decodedToken);
      console.log('expire', decodedToken.exp > currentTime);

      if (decodedToken.exp > currentTime) {
        if (decodedToken.user_type === 'Admin') {
          return true;
        } else {
          router.navigate(['adminlogin']);
          return false;
        }
      } else {
        localStorage.removeItem('admin_token');
        router.navigate(['adminlogin']);
        return false;
      }
    } catch {
      localStorage.removeItem('admin_token');
      router.navigate(['adminlogin']);
      return false;
    }
  } else {
    return false;
  }
};

export const authGuardForLoggedAdmin: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('admin_token');
    console.log('token', token);
    if (!token) {
      return true;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      console.log('decode', decodedToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp > currentTime) {
        router.navigate(['admindash']);
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem('admin_token');
      return true;
    }
  } else {
    return true;
  }
};