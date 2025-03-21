import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RecaptchaModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  captchaResponse: string | null = null;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onCaptchaResolved(response: string | null) {
    this.captchaResponse = response;
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Parollar mos emas!');
      return;
    }
    if (!this.captchaResponse) {
      alert('reCAPTCHA ni tasdiqlang!');
      return;
    }
    const registerData = {
      email: this.email,
      password: this.password,
      captchaResponse: this.captchaResponse,
    };
    this.http.post('http://localhost:8080/api/register', registerData).subscribe({
      next: (response: any) => {
        alert(response.message || 'Ro‘yxatdan o‘tish muvaffaqiyatli!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const errorMessage = err.error?.error || err.message || 'Noma‘lum xatolik';
        alert(errorMessage);
      },
    });
  }
}