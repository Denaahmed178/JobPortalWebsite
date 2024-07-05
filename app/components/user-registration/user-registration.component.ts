import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../../services/user-registration/user-registration.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  username: string= '';;
  email: string= '';;
  password: string= '';;
  confirmPassword: string= '';;
  phoneNumber: string= '';;
  workExperience: string= '';;
  skills: string= '';;
  education: string= '';;
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
  
  
  constructor(private router: Router, private userService: UserRegistrationService) {}
  submitForm() {
    if (this.username === '' && this.password === '') {
      alert('Please enter a password and username');
    } else if (this.username === '') {
      alert('Please enter a username');
    } else if (this.password === '') {
      alert('Please enter a password');
    } else if (this.password !== this.confirmPassword) {
      this.showErrorMessage = true;
    } else {
      // Passwords match, perform form submission or navigate to the next page
      const user = {
        UserName: this.username,
        Email: this.email,
        Password: this.password,
        PhoneNumber: this.phoneNumber,
        WorkExperience: this.workExperience,
        Skills: this.skills,
        Education: this.education
      };
  
      this.userService.checkIfUsernameExists(this.username).then((exists: boolean) => {
        if (exists) {
          alert('Username already exists!');
        } else {
          this.userService.addUser(user).then(() => {
            alert('User added successfully!');
            this.router.navigate(['']);
          }).catch((error: any) => {
            console.error('Error adding user: ', error);
          });
        }
      }).catch((error: any) => {
        console.error('Error checking username: ', error);
      });
    }
  }
}
