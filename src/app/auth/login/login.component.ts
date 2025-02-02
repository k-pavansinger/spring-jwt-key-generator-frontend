import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginRequest } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage = '';
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    onSubmit() {
        if (this.loginForm.valid) {
          this.authService.login(this.loginForm.getRawValue() as LoginRequest).subscribe({
            next: () => this.router.navigate(['/page1']),
            error: (err) => this.errorMessage = JSON.stringify(err.error) || 'Login failed'
          });
        }
      }
}