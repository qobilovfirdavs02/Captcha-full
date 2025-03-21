import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any = null;
  isDarkMode: boolean = false; // Rejim holati

  constructor(private http: HttpClient, private router: Router) {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true'; // Oxirgi rejimni olish
    this.updateDarkMode(); // Rejimni qo‘llash
  }

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.http.get(`http://localhost:8080/api/profile?email=${email}`).subscribe({
        next: (response: any) => (this.user = response),
        error: (err) => alert('Ma\'lumotlarni yuklashda xato: ' + (err.message || 'Noma‘lum xatolik')),
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateDarkMode();
  }

  private updateDarkMode() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}