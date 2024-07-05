import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection,query ,getDocs,CollectionReference,where} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobFormserviceService {

  constructor(private firestore: Firestore) { }
  addUser(fullName: string, email: string, phone: string, cvFile: string, job_title: string){
    try {
      const db = collection(this.firestore, 'AppliedJobs');

      addDoc(db, {
        job_title :job_title,
        fullName: fullName,
        email: email,
        phone: phone,
        cvFileName: cvFile // Assuming you want to store the name of the CV file
      });
      return true;
    } catch (error) {
      console.error('Error submitting :', error);
      throw error;
      return false;
      //return Promise.reject(error);
    }
  } 
}
