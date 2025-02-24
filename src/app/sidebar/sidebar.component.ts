import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, Menu, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] | undefined;
  constructor(private router: Router) {}
    ngOnInit() {
        this.items = [
          {
            label: 'MeetingApp',
            items: [
                {
                    label: 'Anasayfa',
                    icon: 'pi pi-palette',
                    command: () => {
                      this.router.navigate(['/home']);
                  }
                },
                {
                    label: 'Toplantılar',
                    icon: 'pi pi-link',
                    command: () => {
                        this.router.navigate(['/meeting']);
                    }
                },
                {
                    label: 'İptal Edilen Toplantılar',
                    icon: 'pi pi-home',
                    command: () => {
                      this.router.navigate(['/canceledmeeting']);
                  }
                }
            ]
        }
        ];
    }
}
