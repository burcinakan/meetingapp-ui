import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
@Component({
  selector: 'app-home',
  imports: [CardModule,BadgeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }
}
