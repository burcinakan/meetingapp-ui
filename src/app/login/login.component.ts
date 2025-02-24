import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-login',
  imports: [DividerModule, ButtonModule, InputTextModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';


  constructor(private http: HttpClient, private router: Router,private authService: AuthService) {

  }

  onSubmit() {

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post('https://localhost:7273/api/Auth/Login',loginData).subscribe((response: any) => {
      debugger
      if (response.token) {
        //localStorage.setItem('token', response.token); 

        this.authService.login(response.token);

        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      } else {
        alert('Hatalı');
      
      }
    },
    (error) => {
      console.error('Hatalı Giriş', error);
      alert('Hatalı Giriş');
    }
  )

  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn$) {
      this.router.navigate(['/home']);
    }
  }
}
