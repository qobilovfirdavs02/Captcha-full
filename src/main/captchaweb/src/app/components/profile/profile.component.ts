import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.http.get(`http://localhost:8080/api/profile?email=${email}`).subscribe({
        next: (response: any) => (this.user = response),
        error: (err) => alert('Profilni yuklashda xato: ' + (err.message || 'Noma‘lum xatolik')),
      });
    }
  }
}