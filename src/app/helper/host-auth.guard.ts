import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostAuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = localStorage.getItem('currentUser');
    let user = JSON.parse(currentUser);
    if (user != null) {
      if (user.roles.authority === 'ROLE_HOST') {
        return true;
      }
    } else {
      localStorage.removeItem('currentUser');
    }
    this.router.navigateByUrl('');
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = localStorage.getItem('currentUser');
    let user = JSON.parse(currentUser);
    if (user != null) {
      if (user.roles === 'ROLE_HOST') {
        return true;
      }
    } else {
      localStorage.removeItem('currentUser');
    }
    this.router.navigateByUrl('');
    return false;
  }

}
