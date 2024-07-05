import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection,query ,getDocs,CollectionReference,where} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url="https://firestore.googleapis.com/v1/projects/job-portal-84b12/databases/(default)/documents/User"
constructor(private firestore: Firestore){}
httpOptions={headers:new HttpHeaders({'content-Type':'application/json','Acess-Control-Allow-Origin':'*'})}
getUser(){
  //const userCollection = collection(this.firestore, 'User');

  return getDocs(collection(this.firestore, 'User'));

/*getUser() {
  return {
    name: 'John Doe',
    gender: 'Female',
    dateOfBirth: '2002-02-16', // Use YYYY-MM-DD format for <input type="date">
    phoneNumber: '123-456-7890',
    email:   'janedoe@example.com',
    address: '1234 Maple Drive, NY 10001, USA',
  };*/
/*getUser(): Observable<any> {
 // return this.firestore.app('users/userId').valueChanges();
// return this.firestore.get<user>(this.url);
return this.firestore
}*/
}}

/*getUser() {
  try {
    // Get reference to the Firestore database
    const db = collection(this.firestore, 'User');

    

    console.log('user data get successfully.');

  } catch (error) {
    console.error('Error user data:', error);
    throw error;
  }
} */
/*httpOptions={headers:new HttpHeaders({'content-Type':'application/json','Acess-Control-Allow-Origin':'*'})}
getUser():Observable<UserProfileComponent> 
{}
return this.http
.get<UserProfileComponent>(this.url);
}

}  */
/* getUser() {
    return {
      name: 'John Doe',
      gender: 'Female',
      dateOfBirth: '2002-02-16', // Use YYYY-MM-DD format for <input type="date">
      phoneNumber: '123-456-7890',
      email:   'janedoe@example.com',
      address: '1234 Maple Drive, NY 10001, USA',
    };
  }*/  
  
  /// update  try!!!!!!
/*updateUserProfile(userId: string, newData: any): Promise<void> {
  // Construct a reference to the user document
  const userDocRef = this.firestore.collection('users').doc(userId);
  
  // Use the update method to update specific fields in the document
  return userDocRef.update(collection('users').doc(userId));
}
}*/
