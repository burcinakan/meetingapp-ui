import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  imports: [DividerModule,ToastModule,RippleModule, ButtonModule, InputTextModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  email: string = '';
  password: string = '';


  constructor(private http: HttpClient, private router: Router,private authService: AuthService,private messageService: MessageService) {

  }

  onSubmit() {

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post('https://localhost:7273/api/Auth/Login',loginData).subscribe((response: any) => {

      if (response.token) {
        this.authService.login(response.token.result);

        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      } else {
        alert('Hatalı');
      
      }
    },
    (error) => {
      console.error('Hatalı Giriş', error);
      this.messageService.add({ severity: 'error', summary: 'Hatalı Giriş', detail: 'Üye değilseniz lütfen üye olunuz!', life: 3000 });

    }
  )

  }
  goRegister() {
    this.router.navigate(['/register']);
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn$) {
      this.router.navigate(['/home']);
    }
  }
}
