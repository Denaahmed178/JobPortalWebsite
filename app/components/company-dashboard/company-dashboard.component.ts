import { Component } from '@angular/core';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})

export class CompanyDashboardComponent {
  user: any;
  editedUser: any;
  editMode: boolean = false;
  originalUser: any;
  userData: any[] = []; // Declare and initialize userData as an empty array
  //
  Name: any;
  phone: any;
  Email: any;
  Address: any;
  Gender: any;
  Birthday: any;
  Experience: any;
  Skills: string[] = [];
  id: any;
  //
  loading = true;
  error = '';

  ngOnInit(): void {
    this.retrieveUserData();
  }

  retrieveUserData(): void {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      this.userData = JSON.parse(userDataString); // Assign parsed userData to this.userData
      this.id = this.userData[0].id;
      this.Name = this.userData[0].UserName;
      this.Address = this.userData[0].Address;
      this.Email = this.userData[0].Email;
      this.phone = this.userData[0].PhoneNumber;
      this.Experience = this.userData[0].Experience;
      this.Skills = this.userData[0].Skills;
    } 
    localStorage.clear();
  }

  searchKeyword: string = '';

  searchUserData(searchCriteria: string): void {
    // Check if searchCriteria is not empty
    if (searchCriteria.trim() !== '') {
      // Convert searchCriteria to lowercase for case-insensitive search
      const searchTerm = searchCriteria.toLowerCase();

      // Filter user data based on searchCriteria
      const filteredUserData = this.userData.filter((user: any) => {
        // Convert user name to lowercase for case-insensitive search
        const userName = user.Name.toLowerCase();
        // Check if userName contains the searchTerm
        return userName.includes(searchTerm);
      });

      // Update user data with filtered results
      this.user = filteredUserData.length > 0 ? filteredUserData[0] : null;
    } else {
      // If searchCriteria is empty, reset user data to original
      this.user = { ...this.originalUser };
    }
  }
}
