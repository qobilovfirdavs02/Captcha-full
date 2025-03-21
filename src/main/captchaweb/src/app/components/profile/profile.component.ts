import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  currentLang: string = 'uz';
  showDropdown: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('uz');
    this.translate.use('uz');
  }

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.http.get(`http://localhost:8080/api/profile?email=${email}`).subscribe({
        next: (response: any) => (this.user = response),
        error: (err) => alert('Profilni yuklashda xato: ' + (err.message || 'Noma‘lum xatolik')),
      });
    } else {
      this.router.navigate(['/login']);
    }
  }


  


  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  setLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    this.showDropdown = false;
  }


  logout() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}
