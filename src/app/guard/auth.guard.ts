import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private auth: AuthService,private route: Router){

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    console.log('inside auth guard');
    
     return  this.auth.getId().then(id=>{
       if(id)
         return true;
         else{
           this.route.navigateByUrl('/login');
           return false;
         }
     }).catch(e=>{
       console.log(e);
      this.route.navigateByUrl('/login');
      return false;
     })
  }
}
