import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Menubar } from 'primeng/menubar';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../_service/auth.service';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-navbar',
  imports: [AvatarModule,Menubar, ButtonModule, Image],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn$;
  constructor(private router: Router,private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  logout() {
    this.authService.logout()
  }
}
