import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore'; 

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  //url = "https://firestore.googleapis.com/v1/projects/job-portal-84b12/databases/(default)/documents/Jobs"

  constructor(private firestore: Firestore) { }

  async checkIfUsernameExists(username: string) {
    const q = query(collection(this.firestore, 'User'), where('UserName', '==', username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Return true if there are documents in the query result, false otherwise
  }

  addUser(user: any) {
    return addDoc(collection(this.firestore, 'User'), user);
  }
}
