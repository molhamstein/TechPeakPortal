import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { MainService } from './main.service';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public main: MainService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    //const token = localStorage.getItem('token');
    // decode the token to get its payload
    //const tokenPayload = decode(token);
    if (
      !this.main.loginServ.isLogin() || 
      this.main.loginServ.getRole() !== expectedRole
    ) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}