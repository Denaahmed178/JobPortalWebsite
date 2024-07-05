import { Injectable } from '@angular/core';
import { Job } from '../../interfaces/job-interface/job';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc ,updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostingService {

  jobs: Job[] = []
  url = "https://firestore.googleapis.com/v1/projects/job-portal-84b12/databases/(default)/documents/Jobs"
  // default link 
  // https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/{COLLECTION_NAME}
  constructor(private firestore: Firestore) { }

  // submitJob(jobtitle:any,companyname:any,jobdescription:any,jobrequirement:any,jobsalary:any,jobdeadline:any){
  //   this.jobs.push({
  //     job_title:jobtitle,
  //     company_name:companyname,
  //     job_description:jobdescription,
  //     job_requirement:jobrequirement,
  //     salary:jobsalary,
  //     job_deadline:jobdeadline
  //   })
  // }
  submitJob(jobtitle: any, companyname: any, jobdescription: any, jobrequirement: any, jobsalary: any, jobdeadline: any) {
    try {
      // Get reference to the Firestore database
      const db = collection(this.firestore, 'Jobs');

      // Add job data to a collection
      addDoc(db, {
        id_pro:" ",
        job_title: jobtitle,
        company_name: companyname,
        job_description: jobdescription,
        job_requirement: jobrequirement,
        salary: jobsalary,
        job_deadline: jobdeadline
      });

      console.log('Job data submitted successfully.');

    } catch (error) {
      console.error('Error submitting job data:', error);
      throw error;
    }
  }
  getJobs() : Observable<Job[]>{
    const jobscollection=collection(this.firestore,'Jobs');
    const jobscoll=collectionData(jobscollection,{idField:'id_pro'});
    return jobscoll as Observable<Job[]>;
  }

  deleteJob(i: number,job:Job) {
    const jobscollection=collection(this.firestore,'Jobs');
    const document=doc(jobscollection,job.id_pro);
    deleteDoc(document);
    this.jobs.splice(i, 1);
  }


  Editpost(jobid: any, job: Job) {
    const jobscollection = collection(this.firestore, 'Jobs');
    const document = doc(jobscollection, job.id_pro);
    this.jobs[jobid]=job
    const updatedJobData = {
      job_title: job.job_title,
      company_name: job.company_name,
      job_description: job.job_description,
      job_requirement: job.job_requirement,
      salary: job.salary,
      job_deadline: job.job_deadline
    };
  
    return updateDoc(document, updatedJobData)
      .then(() => {
        console.log('Job data updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating job data:', error);
        throw error;
      });
  
  }
}
