import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BadgeModule,FormsModule, InputTextModule, ButtonModule, FileUploadModule, CommonModule,CardModule, DividerModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent {
  registerData: any = {
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordret: '',
    profileImage: '',
  };
  isDocument: boolean = false;

  constructor(private http: HttpClient,private authService: AuthService,private router: Router) {};

  onSubmit() {
    const registrationData = {
      name: this.registerData.name,
      lastName: this.registerData.lastName,
      email: this.registerData.email,
      phoneNumber: this.registerData.phoneNumber,
      password: this.registerData.password,
      profileImage: this.registerData.profileImage
    };
    if(registrationData.profileImage == '') {
      return alert('Profil resmi zorunlu!');
    }
    this.http.post('https://localhost:7273/api/Auth/Register',registrationData).subscribe((response: any) => {

      if (response) {
        this.router.navigate(['/login']);
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
  goLogin() {
    this.router.navigate(['/login']);
  }
  uploadFile(event: any) {
    
    const formData = new FormData();
    formData.append("file", event.files[0]);
    formData.append("name", event.files[0].name);
    
    this.http.post('https://localhost:7273/api/Auth/UploadImage', formData).subscribe(
      (response: any) => {
        this.registerData.profileImage = response.dbPath
        this.isDocument = true;
      },
      error => {
        console.error('Aynı Resim Zaten Yüklü', error);
        this.isDocument = false;
      }
    );
  }
}
