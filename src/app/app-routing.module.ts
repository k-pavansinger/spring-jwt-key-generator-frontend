import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { AuthGuard } from './guards/auth.guard';
import { Page3Component } from './pages/page3/page3.component';
import { AdminGuard } from './guards/admin.guard';
import { Page4Component } from './pages/page4/page4.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'page1', component: Page1Component, canActivate: [AuthGuard] },
  { path: 'page2', component: Page2Component, canActivate: [AuthGuard] },
  { 
    path: 'admin/page3', 
    component: Page3Component,
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: 'admin/page4', 
    component: Page4Component,
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
