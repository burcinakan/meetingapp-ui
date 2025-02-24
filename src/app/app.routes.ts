import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MeetingComponent } from './meeting/meeting.component';
import { CanceledmeetingComponent } from './canceledmeeting/canceledmeeting.component';
import { HomeComponent } from './home/home.component';
import { AuthguardService } from './_service/authguard.service';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthguardService]
    },
    {
        path: 'meeting',
        component: MeetingComponent,
        canActivate: [AuthguardService]
    },
    {
        path: 'canceledmeeting',
        component: CanceledmeetingComponent,
        canActivate: [AuthguardService]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: '/login', 
        pathMatch: 'full'
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }