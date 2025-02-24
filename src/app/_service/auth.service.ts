import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
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
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  decodeToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded;
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  }
}
