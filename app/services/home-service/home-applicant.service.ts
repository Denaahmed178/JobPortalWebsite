import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job } from '../../interfaces/job-interface/job';
import { PostingService } from '../service-posting/posting.service';
import { Firestore, QuerySnapshot, collection, collectionData, getDocs } from '@angular/fire/firestore';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeApplicantService {
  jobs: Job[] = [];



  getjobs(): Observable<Job[]> {
    const jobCollection = collection(this.firestore, 'Jobs'); 
    const jobData = collectionData(jobCollection, { idField: 'job_title' });
    return jobData as Observable<Job[]>;
  }
  
  getAllJobLocations(): Observable<string[]> {
    const db = collection(this.firestore, 'Jobs');
    return new Observable<string[]>((observer) => {
      getDocs(db).then((querySnapshot: QuerySnapshot<any>) => {
        const location: string[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const locations = data["Location"];
          if (!location.includes(locations)) {
            location.push(locations);
          }
        });
        observer.next(location);
      }).catch((error) => {
        console.error('Error getting documents: ', error);
        observer.error(error);
      });
    });
  }
  filterJobs(jobs: Job[], searchParams: Params): Job[] {
    let filteredJobs = jobs;

    // Filter by keyword
    if (searchParams['keyword']) {
      filteredJobs = filteredJobs.filter(job =>
        job.job_title.toLowerCase().includes(searchParams['keyword'].toLowerCase()) ||
        job.job_description.toLowerCase().includes(searchParams['keyword'].toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchParams['keyword'].toLowerCase())
      );
    }

    // Filter by job type
    if (searchParams['jobType']) {
      filteredJobs = filteredJobs.filter(job =>
        job.job_Type === searchParams['jobType']
      );
    }

    // Filter by location
    if (searchParams['location']) {
      filteredJobs = filteredJobs.filter(job =>
        job.location === searchParams['location']
      );
    }

    // Filter by salary range
    if (searchParams['salaryRange']) {
      filteredJobs = filteredJobs.filter(job =>
        this.isSalaryInRange(job.salary, searchParams['salaryRange'])
      );
    }

    return filteredJobs;
  }

  isSalaryInRange(salary: number, salaryRange: string): boolean {
    switch (salaryRange) {
      case '<50k':
        return salary < 50000;
      case '50k-100k':
        return salary >= 50000 && salary <= 100000;
      case '100k-150k':
        return salary > 100000 && salary <= 150000;
      case '>150k':
        return salary > 150000;
      default:
        return false;
    }
  }

  constructor(private firestore: Firestore) { }

}
