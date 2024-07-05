import { Component } from '@angular/core';
import { ProfileService } from '../../services/service-userprofile/profile.service';
// import { UserProfile } from '../../interfaces/user-profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user: any;
  editedUser: any;
  editMode: boolean = false;
  originalUser: any;
  //
  Name: any;
  phone: any;
  Email: any;
  Address: any;
  Gender : any ;
  Birthday :any;
  Experience : any ;
  Skills : string[] = [];
  id:any;
  //
  // userData: UserProfile[] = [];
  loading = true;
  error = '';

  constructor(private userService: ProfileService) {}

  ngOnInit(): void {
    //
    // this.user = this.userService.getUser();
    // this.originalUser = { ...this.user };
    // this.editedUser = { ...this.user }; // Ensure editedUser is initialized
    this.retrieveUserData();
  }
  retrieveUserData(): any {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
       // Now you can use userData as needed
      this.id=userData[0].id;
      this.Name = userData[0].UserName;
      this.Address = userData[0].Address;
      this.Email = userData[0].Email;
      this.phone = userData[0].PhoneNumber
      this.Experience = userData[0].Experience;
      this.Skills = userData[0].Skills;

    } else {
      console.log("No user data found in local storage.");
      return null;
    }
    localStorage.clear();
  }    
  toggleEditMode(): void {

    // if (this.editMode) {
    //   // Save changes if in edit mode
    //   this.user = { ...this.editedUser };
    //   this.firestore.collection('User').update(this.editedUser)
    //   .then(() => {
    //     console.log('Profile updated successfully!');
    //     // Handle success (e.g., display confirmation message)
    //   })
    //   .catch((error :any)=> {
    //     console.error('Error updating profile:', error);
    //     // Handle error (e.g., display error message)
    //   });
      
      // Optionally, save to backend here
     // const db = firebase.firestore();
      //db.collection('users').doc(this.user.id).update(this.editedUser)
        //.then(() => {
          //console.log('User data updated successfully in Firestore');
        //})
        //.catch((error:any) => {
          //console.error('Error updating user data in Firestore:', error);
        //});
       // this.updateUserData(this.user); // Update user data in Firestore
      
    // }
    // this.editMode = !this.editMode;
  }
  ///update try !!!!!
 /* updateUserData(user: any): void {
    // Assuming you have a collection named 'users' in Firestore
    // Replace 'userId' with the actual ID of the user document
    this.firestore.doc(`users/userId`).set(user, { merge: true })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error:any) => {
            console.error("Error updating document: ", error);
        });
      }*/
  cancelEdit(): void {
    // Revert editedUser to originalUser
    this.editedUser = { ...this.originalUser };
    this.editMode = false;
  }
}
