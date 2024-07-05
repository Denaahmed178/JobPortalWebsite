import { Component, OnInit } from '@angular/core';
import { PostingService } from '../../services/service-posting/posting.service';
import { HomeApplicantService } from '../../services/home-service/home-applicant.service';
import { Job } from '../../interfaces/job-interface/job';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-home-applicant',
  templateUrl: './home-applicant.component.html',
  styleUrls: ['./home-applicant.component.css']
})
export class HomeApplicantComponent implements OnInit {
  searchKeyword: string = '';
  selectedJobType: string = '';
  selectedLocation: string = '';
  selectedSalaryRange: string = '';
  jobTypes: string[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  locations: string[] = []; // Initialize with empty array
  salaryRanges: string[] = ['<50k', '50k-100k', '100k-150k', '>150k'];
  allJobs: Job[] = [];
  filteredJobs: Job[] = [];
  

  constructor(
    public homeServices: HomeApplicantService,
    private postingService: PostingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchJobs();
    this.fetchJobLocations(); 
  }

  fetchJobs(): void {
    this.homeServices.getjobs().subscribe((jobs: Job[]) => {
      //console.log(jobs); 
      this.allJobs = jobs;
      this.applyFilters(); 
    });
  }
  

  fetchJobLocations(): void {
    this.homeServices.getAllJobLocations().subscribe((locations: string[]) => {
      //console.log(locations);
      this.locations = locations; 
      this.applyFilters(); 
    });
  }
  search(): void {
    // Collect search parameters
    const searchParams: Params = {
      keyword: this.searchKeyword,
      jobType: this.selectedJobType,
      location: this.selectedLocation,
      salaryRange: this.selectedSalaryRange
    };
    
    // Navigate to the second page with search parameters as query params
   // this.router.navigate(['/available-jobs'], { queryParams: searchParams });
  }
  

  filterJobs(): void {
    console.log('Filter jobs function called');
    this.applyFilters();
  }

  applyFilters(): void {
    const isFilterSelected =
      this.searchKeyword || this.selectedJobType || this.selectedLocation || this.selectedSalaryRange;
  
    if (isFilterSelected) {
      this.filteredJobs = this.allJobs.filter(job => {
        const matchesSearch = this.searchKeyword ?
          job.job_title.toLowerCase().includes(this.searchKeyword.toLowerCase()) : true;
  
        const matchesJobType = this.selectedJobType ?
          job.job_Type === this.selectedJobType : true;
  
        const matchesLocation = this.selectedLocation ?
          job.location === this.selectedLocation : true;
  
        const matchesSalaryRange = this.selectedSalaryRange ?
          this.isSalaryInRange(job.salary, this.selectedSalaryRange) : true;
        console.log(matchesSearch,matchesJobType,matchesLocation,matchesSalaryRange)
        return matchesSearch && matchesJobType && matchesLocation && matchesSalaryRange;
      });
    } else {
      // If no filters are selected, show all jobs
      this.filteredJobs = this.allJobs;
    }
  }
  
  getFilteredJobs(): any[] {
    return this.filteredJobs;
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
}
