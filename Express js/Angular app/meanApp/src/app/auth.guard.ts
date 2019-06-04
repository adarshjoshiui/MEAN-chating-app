import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './guards/auth-guard.service';

// import the auth service here
// import { AuthService } from '../core/auth.service';

@Injectable({
  'providedIn': 'root'
})
export class AuthGuard implements CanActivate {

  // add the service we need
  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // handle any redirects if a user isn't authenticated
    let isLogin: boolean;
    this.auth.isLoggedIn.subscribe(res => {
      isLogin = res
    })


    let local = localStorage.getItem('isLogedIn')
    if (!isLogin) {
      if (local && local === 'true') {
        return true;
      }

      // redirect the login
      this.router.navigate(['/login']);
      return false;
    }

    localStorage.setItem('isLogedIn', 'true')
    return true;
  }

}