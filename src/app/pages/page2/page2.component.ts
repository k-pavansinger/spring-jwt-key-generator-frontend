import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component {
  email = '';

  constructor(private authService: AuthService, private http: HttpClient) {
    this.http.get('http://localhost:8080/api/user/page2',{responseType:'text'}).subscribe({
      next: (res: any) => this.email = res,
      error: (err) => console.error(err)
    });
  }

  logout() {
    this.authService.logout();
  }
}