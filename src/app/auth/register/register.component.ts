import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, RegisterRequest } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;
    errorMessage = '';
    successMessage = '';
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.registerForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

  onSubmit() {
    if (this.registerForm.valid) {
        this.authService.register(this.registerForm.getRawValue() as RegisterRequest).subscribe({
            next: (res) => {
              this.successMessage = res;
              setTimeout(() => this.router.navigate(['/login']), 2000);
            },
            error: (err) => {
              this.errorMessage = err.error?.message || 'Registration failed';
            }
          });
    }
  }
}