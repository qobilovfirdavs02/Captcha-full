import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  isDarkMode: boolean = false;
  currentYear: number;
  selectedProduct: any = null;
  currentImageIndex: number = 0;
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private router: Router // private sifatida qoldiramiz
  ) {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateDarkMode();
    this.currentYear = new Date().getFullYear();
    this.translate.setDefaultLang('uz');
    this.checkLoginStatus();
  }

  ngOnInit() {
    this.loadProducts();
    if (this.isLoggedIn) {
      this.loadUserInfo();
    }
  }

  loadProducts() {
    const url = 'http://localhost:8080/api/products';
    this.http.get(url).subscribe({
      next: (response: any) => {
        this.products = response;
      },
      error: (err) => {
        console.error('Mahsulotlarni yuklashda xato:', err);
        alert('Mahsulotlarni yuklashda xato yuz berdi!');
      },
    });
  }

  loadUserInfo() {
    const token = localStorage.getItem('token');
    this.http.get('http://localhost:8080/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (response: any) => {
        this.username = response.username;
      },
      error: (err) => {
        console.error('Foydalanuvchi ma\'lumotlarini yuklashda xato:', err);
        this.logout();
      },
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateDarkMode();
  }

  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.translate.use(target.value);
    }
  }

  openModal(product: any) {
    this.selectedProduct = product;
    this.currentImageIndex = 0;
  }

  closeModal() {
    this.selectedProduct = null;
    this.currentImageIndex = 0;
  }

  prevImage() {
    if (this.selectedProduct && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage() {
    if (this.selectedProduct && this.currentImageIndex < this.selectedProduct.imageUrls.length - 1) {
      this.currentImageIndex++;
    }
  }

  navigateToAuth() {
    this.router.navigate(['/auth']); // Auth sahifasiga yo‘naltirish
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.username = null;
    this.router.navigate(['/']);
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  private updateDarkMode() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}