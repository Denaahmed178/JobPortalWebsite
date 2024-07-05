import { Injectable } from '@angular/core';
import { Job } from '../../interfaces/job-interface/job';
import { PostingService } from '../service-posting/posting.service';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {
   url = "https://firestore.googleapis.com/v1/projects/job-portal-84b12/databases/(default)/documents/Jobs"
  // default link 
  // https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/{COLLECTION_NAME}

  jobs: Job[] = []
  constructor(public jobserve:PostingService,private firestore: Firestore) { }

  availableJobs(){
    this.jobserve.getJobs().subscribe((jobsData: Job[]) => {
     this.jobs=jobsData;
      
   });
  }
  toggleSave(index: number) {
    this.jobs[index].isSaved = !this.jobs[index].isSaved;
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
    this.addJobToSavedJobs(userData[0].id,this.jobs[index].job_title);
    }
  }

// Assuming 'this.firestore' is your Firestore instance and 'userId' is the user's ID
async  addJobToSavedJobs(userId: string, newJob: any) {
    try {
        // Reference to the specific document
        const docRef = doc(this.firestore, 'User', userId);

        // Get the document snapshot
        const docSnap = await getDoc(docRef);

        // Check if the document exists and contains the 'SavedJobs' array
        if (docSnap.exists()) {
            const docData = docSnap.data();

            if (docData && docData["SavedJobs"]) {
                // Retrieve the existing SavedJobs array
                const savedJobs = docData["SavedJobs"];

                // Add the new job to the array
                savedJobs.push(newJob);

                // Update the document with the modified array
                await setDoc(docRef, { SavedJobs: savedJobs }, { merge: true });

                // Return the updated SavedJobs array
                return savedJobs;
            }
        }
        
        // If the document doesn't exist or SavedJobs array doesn't exist, return null or handle accordingly
        return null;
    } catch (error) {
        console.error('Error adding job to SavedJobs:', error);
        throw error;
    }
  }
}