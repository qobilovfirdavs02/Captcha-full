import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get('http://localhost:8080/api/user/products').subscribe({
      next: (response: any) => {
        this.products = response;
      },
      error: (err) => {
        console.error('Mahsulotlarni yuklash xatosi:', err);
        this.router.navigate(['/auth']); // Sessiya yo‘q bo‘lsa, login sahifasiga
      },
    });
  }

  logout() {
    this.http.post('http://localhost:8080/api/user/logout', {}).subscribe({
      next: () => {
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        console.error('Logout xatosi:', err);
      },
    });
  }
}