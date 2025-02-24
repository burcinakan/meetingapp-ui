import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  constructor(private router: Router) {}

  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn$.next(true); 
    this.router.navigate(['/home']);
  }

  logout() {
    debugger
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }
}
