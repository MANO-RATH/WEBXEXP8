import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './app/auth.service';
import { BookFilterPipe } from './app/book.filter';
import { Book } from './app/book.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, BookFilterPipe],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1><i class="fas fa-book-open"></i> BookHub</h1>
        <div class="auth-status">
          <span *ngIf="isAuthenticated" class="welcome-msg">
            Welcome, {{currentUser}}!
            <button (click)="logout()" class="btn-logout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </span>
        </div>
      </header>

      <!-- Login Form -->
      <section *ngIf="!isAuthenticated" class="card login-section">
        <h2><i class="fas fa-lock"></i> Secure Login</h2>
        <form (ngSubmit)="login()" class="login-form">
          <div class="form-group">
            <label><i class="fas fa-user"></i> Username</label>
            <input 
              type="text" 
              [(ngModel)]="credentials.username" 
              name="username" 
              required 
              class="form-control"
              placeholder="Enter your username"
            >
          </div>
          <div class="form-group">
            <label><i class="fas fa-key"></i> Password</label>
            <input 
              type="password" 
              [(ngModel)]="credentials.password" 
              name="password" 
              required 
              class="form-control"
              placeholder="Enter your password"
            >
          </div>
          <button type="submit" class="btn-primary">
            <i class="fas fa-sign-in-alt"></i> Login
          </button>
          <div 
            [ngClass]="{ 'alert-success': authSuccess, 'alert-error': !authSuccess }" 
            class="auth-message" 
            *ngIf="authMessage"
          >
            <i [class]="authSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
            {{authMessage}}
          </div>
        </form>
      </section>

      <!-- Book Search -->
      <section *ngIf="isAuthenticated" class="card book-section">
        <div class="search-header">
          <h2><i class="fas fa-search"></i> Book Explorer</h2>
          <div class="search-box">
            <i class="fas fa-search search-icon"></i>
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              placeholder="Search by title, author or genre..." 
              class="search-input"
            >
          </div>
        </div>

        <div class="book-grid">
          <div *ngFor="let book of books | bookFilter:searchQuery" class="book-card">
            <div class="book-cover">
              <i class="fas fa-book-open"></i>
            </div>
            <div class="book-details">
              <h3>{{book.title}}</h3>
              <p><strong><i class="fas fa-user-edit"></i> Author:</strong> {{book.author}}</p>
              <p><strong><i class="fas fa-bookmark"></i> Genre:</strong> 
                <span class="genre-tag">{{book.genre}}</span>
              </p>
              <p><strong><i class="fas fa-calendar-alt"></i> Year:</strong> {{book.year}}</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="app-footer">
        © 2025 BookHub | Made with <i class="fas fa-heart" style="color: #dc3545;"></i> for book lovers
      </footer>
    </div>
  `
})
export class App {
  isAuthenticated = false;
  currentUser = '';
  authMessage = '';
  authSuccess = false;
  searchQuery = '';
  credentials = {
    username: '',
    password: ''
  };

  books: Book[] = [
    { title: 'The Immortals of Meluha', author: 'Amish Tripathi', genre: 'Mythology', year: 2010 },
    { title: 'The White Tiger', author: 'Aravind Adiga', genre: 'Fiction', year: 2008 },
    { title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', genre: 'Biography', year: 1999 },
    { title: 'Chanakyas Chant', author: 'Ashwin Sanghi', genre: 'Thriller', year: 2010 },
    { title: 'Train to Pakistan', author: 'Khushwant Singh', genre: 'Historical Fiction', year: 1956 },
    { title: 'Sita: Warrior of Mithila', author: 'Amish Tripathi', genre: 'Mythology', year: 2017 },
    { title: 'The God of Small Things', author: 'Arundhati Roy', genre: 'Fiction', year: 1997 },
    { title: 'Sacred Games', author: 'Vikram Chandra', genre: 'Thriller', year: 2006 },
    { title: 'Midnights Children', author: 'Salman Rushdie', genre: 'Fiction', year: 1981 },
    { title: 'The Glass Palace', author: 'Amitav Ghosh', genre: 'Historical Fiction', year: 2000 },
    { title: 'I Am Malala', author: 'Malala Yousafzai', genre: 'Biography', year: 2013 }
  ];

  constructor(private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.getCurrentUser() || '';
  }

  login() {
    const response = this.authService.login(this.credentials);
    if (response.success) {
      this.isAuthenticated = true;
      this.currentUser = this.authService.getCurrentUser() || '';
      this.authSuccess = true;
      this.authMessage = response.message;
    } else {
      this.authSuccess = false;
      this.authMessage = response.message;
    }
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.currentUser = '';
    this.credentials = { username: '', password: '' };
    this.authMessage = 'You have been logged out';
    this.searchQuery = '';
  }
}

bootstrapApplication(App);