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
import { FileUpload } from 'primeng/fileupload';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-meeting',
  imports: 
    [ButtonModule,TableModule, 
    BadgeModule,DialogModule ,CommonModule,InputTextModule,DatePickerModule, 
    TextareaModule,FormsModule,ReactiveFormsModule,ConfirmDialog, Toast,FileUpload],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css',
  providers: [ConfirmationService, MessageService]
})

export class MeetingComponent implements OnInit {
  events: any[] = [];
  userId: string | null = null;
  documentUrl: string = '';
  selectedMeeting: any = {};
  editDialogV: boolean = false;
  removeDialogV: boolean = false;
  addDialogV: boolean = false;
  isDocument: boolean = false;
  isResult: boolean = true;

  
  constructor(private http: HttpClient,private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService,private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.decodeToken().userId;
    this.fetchEvents();
  }
  fetchEvents() {
    this.http.get<any[]>(`https://localhost:7273/api/Meeting/GetMeetingsByUserId/${this.userId}`)
      .subscribe({
        next: (response) => this.events = response ?? [],
        error: (error) => {
          console.error('Error fetching events:', error);
          this.events = [];
        }
      });
  }
  resultCheck() {
    if(this.isResult) {
      this.showMessage('success','Başarılı','İşlemi başarılı!'); 
    } else {
      this.showMessage('error','Başarısız','İşlemi başarısız!');
    }
   
  }
  convertToLocal(dateString: string): string {
    const localDate = new Date(dateString);

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');
  const seconds = String(localDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
  add() {
    const event = this.selectedMeeting;
    const meetingData = {
      title: event.title,
      startDate: this.convertToLocal(event.startDate),
      endDate: this.convertToLocal(event.endDate),
      description: event.description,
      documentUrl: event.documentUrl,
      userId: this.userId
    };
    this.http.post('https://localhost:7273/api/Meeting/AddMeeting', meetingData)
      .subscribe({
        next: (response: any) => {
          if (response && response.message === "Başarılı!") {
            this.fetchEvents();
          } else {
            this.showMessage('error', 'Başarısız', response.message || 'Bir hata oluştu.');
          }
        },
        error: (error) => {
          this.isResult = false;
          console.error('Error:', error);
          this.showMessage('error', 'Hata', 'Toplantı eklenemedi.');
        },
      });
  
    this.addDialogV = false;
    this.isDocument = false;
  } 
  edit() {
    const event = this.selectedMeeting;
    const meetingData = {
      title: event.title,
      startDate: this.convertToLocal(event.startDate),
      endDate: this.convertToLocal(event.endDate),
      description: event.description,
      documentUrl: event.documentUrl,
      userId: this.userId
    };
    this.http.put(`https://localhost:7273/api/Meeting/UpdateMeeting/${event.id}`, meetingData)
    .subscribe({
      next: (response: any) => {
        if (response && response.message === "Başarılı!") {
          this.fetchEvents();
          this.showMessage('success', 'Başarılı', 'Toplantı başarıyla güncellendi!');
        } else {
          this.showMessage('error', 'Başarısız', response.message || 'Bir hata oluştu.');
        }
      },
      error: (error) => {
        this.isResult = false;
        console.error('Error:', error);
        this.showMessage('error', 'Hata', 'Toplantı güncellenemedi.');
      },
    });

  this.editDialogV = false;
  this.isDocument = false;

  }
  remove() {
    const event = this.selectedMeeting;
    this.http.delete(`https://localhost:7273/api/Meeting/DeleteMeeting/${event.id}`)
    .subscribe({
      next: (response: any) => {       
        this.isResult = true; 
        this.fetchEvents()  
      },
      error: (error) => {
        this.isResult = false;
      }
    });
    this.removeDialogV = false;
    this.resultCheck()
  }
  cancelMeeting(event: any) {
    this.http.post(`https://localhost:7273/api/Meeting/CancelMeeting/${event.id}`, event)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.router.navigate(['/canceledmeeting']) 
          } else {
            this.showMessage('error', 'Başarısız', response.message || 'Bir hata oluştu.');
          }
        },
        error: (error) => {
          this.isResult = false;
          console.error('Error:', error);
          this.showMessage('error', 'Hata', 'Toplantı iptal edilemedi.');
        },
      });
     
  }
  removeDialog(event: any) {
    this.selectedMeeting = {...event}
    this.addDialogV = false;
    this.removeDialogV = true;
  }
  editDialog(event: any) {
    this.selectedMeeting = {
      ...event,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate)
    };
    this.editDialogV = true;
  }
  addDialog(event: any) {
    this.selectedMeeting = {
      ...event,
      documentUrl: 'https://example.com/documents',
      startDate: new Date(),
      endDate: new Date()
    };
    this.editDialogV = false;
    this.addDialogV = true;

  }
  hideAddDialog() {
    this.addDialogV = false;
    this.isDocument = false;
  }
  hideEditDialog() {
    this.editDialogV = false;
    this.isDocument = false;
  }
  hideRemoveDialog() {
    this.removeDialogV = false;
  }
  showMessage(severity: string,summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
  uploadFile(event: any) {
    
    const formData = new FormData();
    formData.append("file", event.files[0]);
    formData.append("name", event.files[0].name);
    
    this.http.post('https://localhost:7273/api/Meeting/UploadFile', formData).subscribe(
      (response: any) => {
        this.selectedMeeting.documentUrl = response.dbPath
        this.isDocument = true;
      },
      error => {
        console.error('Aynı Dosya Zaten Yüklü', error);

        this.isDocument = false;
      }
    );


  }
  cancelFile(event: any) {
    this.isDocument = false;
  }
  setColor(docUrl: string) {
    if (docUrl === 'https://example.com/documents') return 'danger';
    else return 'success';
  }
}
