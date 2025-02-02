import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page4',
  template: `<div class="container mt-5">
              <h2>Admin Page 4</h2>
              <div class="alert alert-success" *ngIf="content">{{ content }}</div>
              <div class="alert alert-danger" *ngIf="errorMessage">{{ errorMessage }}</div>
            </div>`
})
export class Page4Component {
  content = '';
  errorMessage = '';

  constructor(private http: HttpClient) {
    this.fetchPageContent();
  }

  private fetchPageContent() {
    this.http.get('http://localhost:8080/api/admin/page4', {responseType : 'text'}).subscribe({
      next: (res: any) => this.content = res,
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load admin content';
        console.error('Admin page4 error:', err);
      }
    });
  }
}