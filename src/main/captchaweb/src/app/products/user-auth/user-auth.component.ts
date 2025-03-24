import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent {
  isLogin: boolean = true;
  username: string = '';
  email: string = '';
  password: string = '';
  verifyPassword: string = '';
  recaptchaToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
    this.clearForm();
  }

  submit() {
    if (this.isLogin) {
      this.login();
    } else {
      if (this.password !== this.verifyPassword) {
        alert('Parollar mos kelmaydi!');
        return;
      }
      if (!this.recaptchaToken) {
        alert('Iltimos, reCAPTCHA ni tasdiqlang!');
        return;
      }
      this.register();
    }
  }

  login() {
    const body = { username: this.username, password: this.password };
    this.http.post('http://localhost:8080/api/user/login', body, { responseType: 'text' }).subscribe({
      next: (response) => {
        if (response === 'Login successful') {
          this.router.navigate(['/app/products/user-dashboard']);
        } else {
          alert('Login yoki parol xato!');
        }
      },
      error: (err) => {
        console.error('Login xatosi:', err);
        alert('Login yoki parol xato!');
      },
    });
  }

  register() {
    const body = {
      username: this.username,
      email: this.email,
      password: this.password,
      recaptchaToken: this.recaptchaToken,
    };
    this.http.post('http://localhost:8080/api/user/register', body, { responseType: 'text' }).subscribe({
      next: () => {
        alert('Ro‘yxatdan o‘tish muvaffaqiyatli! Endi kirishingiz mumkin.');
        this.isLogin = true;
        this.clearForm();
      },
      error: (err) => {
        console.error('Register xatosi:', err);
        alert('Ro‘yxatdan o‘tishda xato yuz berdi: ' + err.error);
      },
    });
  }

  onRecaptchaResolved(token: string | null) {
    this.recaptchaToken = token;
  }

  private clearForm() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.verifyPassword = '';
    this.recaptchaToken = null;
  }
}