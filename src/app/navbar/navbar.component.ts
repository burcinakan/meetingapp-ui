import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { HttpClient } from '@angular/common/http';
import { Menubar } from 'primeng/menubar';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../_service/auth.service';
import { Image } from 'primeng/image';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [AvatarModule,Menubar, ButtonModule, Image],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn$;
  res: any = {};  // res objesi tanımlandı
  userId: string | null = null;
  profileImage: string = '';

  constructor(private http: HttpClient,private router: Router,private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  ngOnInit(): void {
    this.userId = this.authService.decodeToken().userId;
    this.getUsers();
  }

  async getUsers() {
    try {
      this.res = await firstValueFrom(
        this.http.get(`https://localhost:7273/api/User/GetUserById?userId=${this.userId}`)
      );

      if (this.res) {
        
        this.profileImage = `https://localhost:7273/${this.res.profileImage}`;
    
      }

    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  logout() {
    this.authService.logout()
  }




}
