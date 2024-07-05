import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore'; 
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private firestore: Firestore) { }
  // to check if the email's password is correct
  async checkIfCredentialsValid(email: string, password: string) {
    if (await this.checkIfEmailExists(email)) {
      const q = query(collection(this.firestore, 'User'), 
                      where('Email', '==', email),
                      where('Password', '==', password));
      const querySnapshot = await getDocs(q);
      this.storeUserData(querySnapshot);
      return !querySnapshot.empty; // Return true if there are documents in the query result, false otherwise
    }
    else if(await this.checkIfEmailExistsCompanies(email)){
        let check =  this.checkIfCredentialsValidCompanies(email,password);
        return check;
    }
    return false; // Return false if the email format is invalid
  }
  storeUserData(q : any){
    const data = q.docs.map((doc: any ) => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(data);
    localStorage.clear();
     // Store the username in the local storage
     localStorage.setItem("user",JSON.stringify(data));
  }
  // companies checking  Credentials
  async checkIfCredentialsValidCompanies(email: string, password: string) {
    if (await this.checkIfEmailExistsCompanies(email)) {
      const q = query(collection(this.firestore, 'Company'), 
                      where('email', '==', email),
                      where('password', '==', password));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty; // Return true if there are documents in the query result, false otherwise
    }
   
    return false; // Return false if the email format is invalid
  }
  async checkIfEmailExists(email: string) {
    if (this.isValidEmail(email)) {
      const q = query(collection(this.firestore, 'User'), where('Email', '==', email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty; // Return true if there are documents in the query result, false otherwise
    }
    return false; // Return false if the email format is invalid
  }
   // companies valid its email 
  async checkIfEmailExistsCompanies(email: string) {
    if (this.isValidEmail(email)) {
      const q = query(collection(this.firestore, 'Company'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty; // Return true if there are documents in the query result, false otherwise
    }
    return false; // Return false if the email format is invalid
  }

  // Function to check if the input is in email format
  private isValidEmail(email: string): boolean {
    const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }
}