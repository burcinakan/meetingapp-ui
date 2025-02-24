import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';  
import { TableModule } from 'primeng/table';   
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';



@Component({
  selector: 'app-canceledmeeting',
  imports: [ButtonModule,TableModule, 
    BadgeModule,DialogModule ,CommonModule,InputTextModule,DatePickerModule, 
    TextareaModule,FormsModule,ReactiveFormsModule],
  templateUrl: './canceledmeeting.component.html',
  styleUrl: './canceledmeeting.component.css',

})
export class CanceledmeetingComponent {
  events: any[] = [];
  userId: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService,private router: Router) {}


  ngOnInit(): void {
    this.userId = this.authService.decodeToken().userId;
    this.fetchEvents();
  }
  setColor(docUrl: string) {
    if (docUrl === 'Hayır') return 'danger';
    else return 'success';
  }
  async fetchEvents() {
    try {   
      const response = await this.http.get<any[]>(`https://localhost:7273/api/Meeting/GetCancelMeetingsByUserId/${this.userId}`).toPromise();
      this.events = response ?? []; 
    } catch (error) {
      console.error('Error fetching events:', error);
      this.events = [];
    }
  }
  revertMeeting(event: any) {
    this.http.post(`https://localhost:7273/api/Meeting/RevertMeeting/${event.id}`, event)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.router.navigate(['/meeting']) 
          } else {
             console.log('Bir hata oluştu.')
          }
        },
        error: (error) => {
           console.error('Error:', error);
         
        },
      });
  }
}
