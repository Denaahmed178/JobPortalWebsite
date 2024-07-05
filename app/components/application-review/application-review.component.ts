import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewServiceService } from '../../services/reviews-services/review-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-application-review',
  templateUrl: './application-review.component.html',
  styleUrl: './application-review.component.css'
})
export class ApplicationReviewComponent {
  applicantNames!: Observable<string[]>;
  Jobs!: Observable<string[]>;
  status: string | undefined;
  selectedJob: string = ''; // Define a variable to hold the selected job title
  selectedApplicant: string = '';
  isAccepted :boolean =false ;
  isRejected:boolean =false ;
  resume: SafeResourceUrl = '';
  constructor(private reviewService: ReviewServiceService,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getJobTitles();
  }
  getJobTitles(){
    this.Jobs = this.reviewService.getAllJobTitles();
  }
  getApplicants(jobtitle :string){
    this.applicantNames = this.reviewService.getApplicantNames(jobtitle);
  }
  async getStatusForUser(userName: string): Promise<void> {
    try {
      this.status = await this.reviewService.getStatus(userName);
      this.getResumeForUser(userName);

      console.log("Status for user ${userName}: ${status}");
      // You can do further processing with the status here
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  }
  async setStatusForUser(userName: string, status:boolean): Promise<void> {
    try {
      if(status){
       this.isAccepted = false;
      this.isAccepted = await this.reviewService.setStatus(userName,status);
      console.log("Status for user ${userName}:  is updated");
      }
      else{
        this.isRejected = false;
        this.isRejected=await this.reviewService.setStatus(userName,status);
        console.log("Status for user ${userName}:  is updated");
      }
      // You can do further processing with the status here
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  }

  async getResumeForUser(userName: string) {
    try {
      this.resume  = await this.reviewService.getResume(userName);
      // Sanitize the URL before assigning it to the resume property
     // console.log(url);
     console.log("in the getResumeForUser ");
     // this.resume = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        //this.resume = await this.reviewService.getResume(userName);
        // Further processing with the status can be done here
    } catch (error) {
        console.error('Error fetching status:', error);
    }
}

}
