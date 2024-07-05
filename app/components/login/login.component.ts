import { Component } from '@angular/core';
import { LoginServiceService } from '../../services/login-service/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginResult: boolean | null = null;

  constructor(private loginService: LoginServiceService, private router: Router) {}

  async checkCredentials() {
    this.loginResult = await this.loginService.checkIfCredentialsValid(this.email, this.password);
    if (this.loginResult) {
      this.router.navigate(['/welcomepage']);
    }
  }
}
