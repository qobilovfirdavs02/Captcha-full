import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false; // Parolni ko‘rish uchun

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.http
      .post('http://localhost:8080/api/login', { email: this.email, password: this.password })
      .subscribe({
        next: () => {
          localStorage.setItem('userEmail', this.email);
          this.router.navigate(['/profile']);
        },
        error: () => alert('Login xato!'),
      });
  }
}