import { Injectable } from '@angular/core';
import { Firestore, collection, getDoc,DocumentSnapshot, query, where, getDocs, doc, onSnapshot, QuerySnapshot, DocumentData, updateDoc } from '@angular/fire/firestore'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  constructor(private firestore: Firestore, private sanitizer: DomSanitizer) { }
  getAllJobTitles(): Observable<string[]> {
    const db = collection(this.firestore, 'AppliedJobs');
    return new Observable<string[]>((observer) => {
      getDocs(db).then((querySnapshot: QuerySnapshot<any>) => {
        const jobTitles: string[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const title = data["job_title"];
          if (!jobTitles.includes(title)) {
            jobTitles.push(title);
          }
        });
        observer.next(jobTitles);
      }).catch((error) => {
        console.error('Error getting documents: ', error);
        observer.error(error);
      });
    });
  }
  getApplicantNames(jobtitle :string): Observable<string[]>{
    // Get reference to the Firestore database
    const db = collection(this.firestore, 'AppliedJobs');
    const q = query(db,where('job_title', '==', jobtitle))
    return new Observable<string[]>((observer) => {
      getDocs(q).then((querySnapshot: QuerySnapshot<DocumentData>) => {
        const applicantNames: string[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          applicantNames.push(data['applicant_name']);
        });
        observer.next(applicantNames);
      }).catch((error) => {
        console.error('Error getting documents: ', error);
        observer.error(error);
      });
    });
    }

   
    async getStatus(UserName: string): Promise<string> {
      const db = collection(this.firestore, 'AppliedJobs');
      const q = query(db, where('applicant_name', '==', UserName));
      const querySnapshot = await getDocs(q);

      // If there are no documents with the provided UserName, return "Rejected"
      if (querySnapshot.empty) {
        return "Rejected";
      }
      // Otherwise, loop through each document and check the value of isAccepted
      let isAccepted = false;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data["isAccepted"]) {
          isAccepted = true;
        }
      });
  
      // If any document has isAccepted set to true, return "Accepted", otherwise return "Rejected"
      return isAccepted ? "Accepted" : "Rejected";
    }

    async setStatus(UserName: String, status: boolean): Promise<boolean> {
      const db = collection(this.firestore, 'AppliedJobs');
      const q = query(db, where('applicant_name', '==', UserName));
      const querySnapshot = await getDocs(q);
    
      // If there are no documents with the provided UserName, return "Rejected"
      if (querySnapshot.empty) {
        return false;
      }
    
      // Otherwise, loop through each document and update the isAccepted field
      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        // Update the document with the modified data
        updateDoc(docRef, { isAccepted: status });
      });
    
      return true;
    }
    async getResume(userName: string) {
      const db = collection(this.firestore, 'AppliedJobs');
      const q = query(db, where('applicant_name', '==', userName));
      const querySnapshot = await getDocs(q);
      let  Resume_Url : SafeResourceUrl ="";
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          Resume_Url = this.sanitizer.bypassSecurityTrustResourceUrl(data["cvFileName"]); // Assuming the field storing the CV URL is named 'cv'
  
      });
      return Resume_Url ;
  }
  
}
