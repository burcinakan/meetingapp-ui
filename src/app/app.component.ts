import { Component, OnInit } from '@angular/core';
import { RouterOutlet  } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { AuthService } from './_service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, RouterOutlet,DividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit  {
  title = 'meetingapp-ui';
  isLoggedIn$;
  
  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  ngOnInit(): void {
    // Eğer authService üzerinden işlem yapılması gerekirse, buraya yazılabilir.
    debugger
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
 
}
