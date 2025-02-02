import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component {
  username = '';

  constructor(private authService: AuthService, private http: HttpClient) {
    this.http.get('http://localhost:8080/api/user/page1',{responseType:'text'}).subscribe({
      next: (res: any) => this.username = res,
      error: (err) => console.error('Error:', err)
    });
  }

  logout() {
    this.authService.logout();
  }
}