import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore'; 
@Injectable({
  providedIn: 'root'
})
export class CompanyRegistrationService {

 // url = "https://firestore.googleapis.com/v1/projects/job-portal-84b12/databases/(default)/documents/Jobs"

  constructor(private firestore: Firestore) { }

  async checkIfUsernameExists(companyname: string) {
    const q = query(collection(this.firestore, 'Company'), where('CompanyName', '==', companyname));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Return true if there are documents in the query result, false otherwise
  }

  addUser(company: any) {
    return addDoc(collection(this.firestore, 'Company'), company); 
  }
}