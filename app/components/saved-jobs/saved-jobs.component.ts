import { Component, OnInit } from '@angular/core';
import { SavedJobsService } from '../../services/service-savedJobs/saved-jobs.service';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrl: './saved-jobs.component.css',
})
export class SavedJobsComponent implements OnInit {

  userSavedJobs: string[] = [];
 id : any ;
  constructor(private jobService: SavedJobsService) { }

  ngOnInit(): void {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
       // Now you can use userData as needed
      this.id = userData[0].id;
      this.getSavedJobs(this.id);
      localStorage.clear();
    }
  }

  async getSavedJobs(userId: string): Promise<void> {
    //const userId = 'yourUserId'; // Replace with the actual user ID
    try {
      this.userSavedJobs = await this.jobService.getUserSavedJobs(userId);
      console.log('User saved jobs:', this.userSavedJobs);
    } catch (error) {
      console.error('Error fetching user saved jobs:', error);
    }
  }

}