import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-general-management',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterModule],
  templateUrl: './general-management.component.html',
  styleUrls: ['./general-management.component.scss'],
})
export class GeneralManagementComponent implements OnInit {
  products: any[] = [];
  product = { productId: null as number | null, name: '', description: '', price: 0, stock: 0, category: '', imageUrls: [''] };
  isEditing: boolean = false;
  isDarkMode: boolean = false;
  categories: string[] = ['Electronics', 'Clothing', 'Books', 'Furniture'];

  constructor(private http: HttpClient) {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateDarkMode();
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const url = 'http://localhost:8080/api/products';
    console.log('GET URL:', url);
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log('Backend’dan kelgan ma\'lumot:', response);
        this.products = response;
      },
      error: (err) => {
        console.error('GET xatosi:', err);
        alert('Mahsulotlarni yuklashda xato: ' + (err.message || 'Noma‘lum xatolik'));
      }
    });
  }

  addProduct() {
    if (!this.product.category) {
      alert('Kategoriyani tanlash majburiy!');
      return;
    }
    this.isEditing = false; // Aniq false qilish
    const url = 'http://localhost:8080/api/products';
    console.log('POST URL:', url, 'Data:', this.product, 'isEditing:', this.isEditing);
    this.http.post(url, this.product).subscribe({
      next: (response) => {
        console.log('POST response:', response);
        this.loadProducts();
        this.resetProduct();
      },
      error: (err) => {
        console.error('POST xatosi:', err);
        alert('Mahsulot qo‘shishda xato: ' + (err.message || 'Noma‘lum xatolik'));
      }
    });
  }

  updateProduct() {
    if (!this.isEditing) {
      console.log('updateProduct chaqirildi, lekin isEditing false — bu xatolik!');
      return;
    }
    if (this.product.productId === null || this.product.productId === undefined) {
      alert('Mahsulot ID topilmadi!');
      return;
    }
    if (!this.product.category) {
      alert('Kategoriyani tanlash majburiy!');
      return;
    }
    const url = `http://localhost:8080/api/products/${this.product.productId}`;
    console.log('PUT URL:', url, 'Data:', this.product, 'isEditing:', this.isEditing);
    this.http.put(url, this.product).subscribe({
      next: () => {
        this.loadProducts();
        this.resetProduct();
      },
      error: (err) => {
        console.error('PUT xatosi:', err);
        alert('Mahsulotni yangilashda xato: ' + (err.message || 'Noma‘lum xatolik'));
      }
    });
  }

  deleteProduct(productId: number) {
    if (productId == null || productId === undefined) {
      alert('Mahsulot ID topilmadi!');
      return;
    }
    const url = `http://localhost:8080/api/products/${productId}`;
    console.log('DELETE URL:', url);
    this.http.delete(url).subscribe({
      next: () => this.loadProducts(),
      error: (err) => {
        console.error('DELETE xatosi:', err);
        alert('Mahsulotni o‘chirishda xato: ' + (err.message || 'Noma‘lum xatolik'));
      }
    });
  }

  startEdit(product: any) {
    this.product = { ...product };
    this.isEditing = true;
    console.log('Editing product:', this.product);
  }

  addImageUrl() {
    this.product.imageUrls.push('');
  }

  removeImageUrl(index: number) {
    this.product.imageUrls.splice(index, 1);
  }

  resetProduct() {
    this.product = { productId: null, name: '', description: '', price: 0, stock: 0, category: '', imageUrls: [''] };
    this.isEditing = false;
    console.log('Form reset, isEditing:', this.isEditing);
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