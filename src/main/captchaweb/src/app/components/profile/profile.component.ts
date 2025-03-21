import { Component, OnInit } from '@angular/core';
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
  currentLang: string;
  showDropdown: boolean = false;
  isSidebarOpen: boolean = true;
  isDarkMode: boolean = false; // Rejim holati

  constructor(private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('uz');
    this.currentLang = localStorage.getItem('currentLang') || 'uz';
    this.translate.use(this.currentLang);
    this.isDarkMode = localStorage.getItem('darkMode') === 'true'; // Oxirgi rejimni olish
    this.updateDarkMode(); // Rejimni qo‘llash
  }

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.router.navigate(['/login']);
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('currentLang', lang);
    this.showDropdown = false;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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

  logout() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}