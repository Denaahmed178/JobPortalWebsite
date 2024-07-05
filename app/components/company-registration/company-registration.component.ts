import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyRegistrationService } from '../../services/company-registration/company-registration.service';
@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.css'
})
export class CompanyRegistrationComponent {
  companyname: string= '';;
  email: string= '';;
  password: string= '';;
  confirmPassword: string= '';;
  phoneNumber: string= '';;
  companytype: string= '';;
  numberofEmployees: string= '';;
  companyDescription: string= '';;
  experience: string= '';;
  showErrorMessage: boolean = false;
 // constructor(private router: Router) {}
  checkPasswordStrength() {
    if (this.password.length < 5) {
      return 'Weak';
    } else if (this.password.length < 8) {
      return 'Medium';
    } else {
      return 'Strong';
    }
  }

  isWeakPassword() {
    return this.checkPasswordStrength() === 'Weak';
  }

  isMediumPassword() {
    return this.checkPasswordStrength() === 'Medium';
  }

  isStrongPassword() {
    return this.checkPasswordStrength() === 'Strong';
  }

  getPasswordStrengthMessage() {
    const strength = this.checkPasswordStrength();
    if (strength === 'Weak') {
      return 'Password strength: Weak';
    } else if (strength === 'Medium') {
      return 'Password strength: Medium';
    } else {
      return 'Password strength: Strong';
    }
  }
  clearErrorMessage() {
    this.showErrorMessage = false;
  }
  hasUpperCaseLetter(password: string): boolean {
    return /[A-Z]/.test(password);
  }
  
  showUpperCaseMessage() {
    return this.password.length > 0 && !this.hasUpperCaseLetter(this.password);
  }
  constructor(private router: Router, private userService: CompanyRegistrationService) {}
  submitForm() {
    if (this.companyname === '' && this.password === '') {
      alert('Please enter a password and companyname');
    } else if (this.companyname === '') {
      alert('Please enter a companyname');
    } else if (this.password === '') {
      alert('Please enter a password');
    } else if (this.password !== this.confirmPassword) {
      this.showErrorMessage = true;
    } else {
      // Passwords match, perform form submission or navigate to the next page
      const user = {
        CompanyName: this.companyname,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        CompannyType:this.companytype,
        EmployeesNumber:this.numberofEmployees,
        CompanyDescription:this.companyDescription,
        Experience:this.experience,
      };
  
      this.userService.checkIfUsernameExists(this.companyname).then((exists: boolean) => {
        if (exists) {
          alert('Companyname already exists!');
        } else {
          this.userService.addUser(user).then(() => {
            alert('Company added successfully!');
            this.router.navigate(['']);
          }).catch((error: any) => {
            console.error('Error adding Company: ', error);
          });
        }
      }).catch((error: any) => {
        console.error('Error checking companyname: ', error);
      });
    }
  }
}
