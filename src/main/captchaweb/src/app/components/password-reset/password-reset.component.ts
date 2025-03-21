import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showModal: boolean = false; 
  isDarkMode: boolean = false;

  constructor(private http: HttpClient) {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateDarkMode();
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

  togglePasswordVisibility(field: 'old' | 'new' | 'confirm') {
    if (field === 'old') this.showOldPassword = !this.showOldPassword;
    if (field === 'new') this.showNewPassword = !this.showNewPassword;
    if (field === 'confirm') this.showConfirmPassword = !this.showConfirmPassword;
  }

  resetPassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      alert('Yangi parollar mos emas!');
      return;
    }

    const email = localStorage.getItem('userEmail');
    if (!email) {
      alert('Foydalanuvchi topilmadi. Iltimos, qayta kiring!');
      return;
    }

    const resetData = {
      email: email,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };

    this.http.post('http://localhost:8080/api/password-reset', resetData).subscribe({
      next: (response: any) => {
        alert(response.message);
        this.showModal = false; // Muvaffaqiyatdan keyin modal yopiladi
      },
      error: (err) => {
        const errorMsg = err.error?.error || err.error?.details || err.message || 'Noma‘lum xatolik';
        alert('Xato: ' + errorMsg);
      },
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}