import { Injectable } from '@angular/core';
import { Firestore, collection, getDoc,DocumentSnapshot, query, where, getDocs, doc } from '@angular/fire/firestore'; 
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedJobsService {
  url = "https://firestore.googleapis.com/v1/projects/job-portal-84b12/databases/(default)/documents/User"
  constructor(private firestore: Firestore) { }
  
    
  async getUserSavedJobs(userId: string): Promise<string[]> {
    try {
        // Reference to the specific document
        const docRef = doc(this.firestore, 'User', userId);

        // Get the document snapshot
        const docSnap: DocumentSnapshot<any> = await getDoc(docRef);

        // Check if the document exists and contains the 'savedJobs' array
        const docData = docSnap.data();
        if (docSnap.exists() && docData && docData["SavedJobs"]) {
            return docData["SavedJobs"];
            console.log(" in the getUserSavedJobs condition")
        } else {
            return []; // Return an empty array if the document or 'savedJobs' array doesn't exist
            console.log(" in the getUserSavedJobs 2nd condition")
        }
    } catch (error) {
        console.error('Error fetching user saved jobs:', error);
        return []; // Return an empty array in case of error
    }
}

}
