import { Component } from '@angular/core';

import { Job } from '../../interfaces/job-interface/job';
import { Title } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { JobServiceService } from '../../services/service-job/job-service.service';
import { PostingService } from '../../services/service-posting/posting.service';

@Component({
  selector: 'app-available-jobs',
  templateUrl: './available-jobs.component.html',
  styleUrl: './available-jobs.component.css'
})
export class AvailableJobsComponent {
  //jobs2: Job[] = [];
  // jobs2: Job[] = [
  //   {
  //     id_pro:" ",
  //     job_title:"Software Engineer",
  //     job_description: "Develop and maintain software applications, troubleshoot technical issues, and collaborate with cross-functional teams to deliver high-quality software products.",
  //     company_name: "Tech Solutions Inc.",
  //     job_requirement:"Bachelor's degree in Computer Science, Software Engineering, or related field. Proficiency in programming languages such as Java, Python, C++, etc. Experience with software development methodologies and tools. Strong problem-solving skills and attention to detail.",
  //     salary: 20000 ,
  //     isSaved: false
  //   },
  //   {
  //     id_pro:" ",
  //     job_title:"Marketing Manager",
  //     job_description: "Plan and execute marketing campaigns, analyze market trends, manage advertising and promotional activities, and oversee the marketing team to achieve business objectives.",
  //     company_name: "Bright Marketing Agency.",
  //     job_requirement:"Bachelor's degree in Marketing, Business Administration, or related field. Proven experience in marketing, including campaign management and digital marketing. Strong analytical and project management skills. Excellent communication and interpersonal skills.",
  //     salary: 50000 ,
  //     isSaved: false
  //   },
  //   {
  //     id_pro:" ",
  //     job_title:"Graphic Designer",
  //     job_description: "Design visual content for various marketing materials, including websites, advertisements, brochures, and logos, using graphic design software and creative skills.",
  //     company_name: "Creative Designs Co.",
  //     job_requirement:"Bachelor's degree in Graphic Design or related field. Proficiency in graphic design software such as Adobe Creative Suite (Photoshop, Illustrator, InDesign). Strong portfolio demonstrating creativity and design skills. Attention to detail and ability to work under tight deadlines.",
  //     salary: 10000 ,
  //     isSaved: false
  //   },
  //   {
  //     id_pro:" ",
  //     job_title:"Registered Nurse",
  //     job_description: "Provide patient care, administer medications, monitor vital signs, collaborate with healthcare professionals, and educate patients and their families about medical conditions and treatments.",
  //     company_name: "CareHealth Hospital.",
  //     job_requirement:"Bachelor of Science in Nursing (BSN) or Associate Degree in Nursing (ADN) from an accredited institution. Current RN license in the state of practice. Strong clinical skills and knowledge of nursing practices and procedures. Compassionate and empathetic bedside manner.",
  //     salary: 40000 ,
  //     isSaved: false
  //   },
  //   {
  //     id_pro:" ",
  //     job_title:"Financial Analyst",
  //     job_description: "Conduct financial analysis, prepare reports and forecasts, assess investment opportunities, analyze financial data, and provide insights to support strategic decision-making.",
  //     company_name: "Global Finance Group.",
  //     job_requirement:"Bachelor's degree in Finance, Accounting, Economics, or related field. Proficiency in financial analysis and modeling techniques. Advanced Excel skills and experience with financial software. Strong analytical and problem-solving skills. ",
  //     salary: 60000 ,
  //     isSaved: false
  //   },
  //   {
  //     id_pro:" ",
  //     job_title:"Customer Service Representative",
  //     job_description: "Assist customers with inquiries, resolve complaints, process orders and returns, provide product information, and maintain customer satisfaction through effective communication and problem-solving.",
  //     company_name: "Stellar Services.",
  //     job_requirement:"High school diploma or equivalent. Excellent communication and interpersonal skills. Ability to handle customer inquiries and resolve issues effectively. Basic computer skills and familiarity with customer service software. ",
  //     salary: 20000 ,
  //     isSaved: false
  //   },
  //   {
  //     id_pro:" ",
  //     job_title:"Project Manager",
  //     job_description: "Plan, execute, and monitor projects from initiation to completion, manage project teams, allocate resources, track progress, and ensure deliverables are on time and within budget.",
  //     company_name: "Enterprise Solutions Ltd.",
  //     job_requirement:"Bachelor's degree in Business Administration, Project Management, or related field. Proven experience in project management, including planning, execution, and monitoring. Strong leadership and team management skills. Excellent organizational and communication skills.",
  //     salary: 3000 ,
  //     isSaved: false
  //   },
  //   {
  //     id_pro:" ",
  //     job_title:"Sales Associate",
  //     job_description: "Assist customers with purchases, restock merchandise, operate cash registers, maintain store cleanliness, and provide exceptional customer service to drive sales and achieve targets.",
  //     company_name: "Bright Retail Stores.",
  //     job_requirement:"High school diploma or equivalent. Sales experience in retail or customer service environment preferred. Excellent communication and interpersonal skills. Ability to work well in a team and achieve sales targets.",
  //     salary:7000 ,
  //     isSaved: false
  //   },
  //   {
  //     id_pro:" ",
  //     job_title:"Data Scientist",
  //     job_description: "Analyze complex data sets, develop predictive models and algorithms, extract insights, and present findings to support data-driven decision-making and business strategies.",
  //     company_name: "DataTech Innovations.",
  //     job_requirement:"Master's or Ph.D. in Computer Science, Statistics, Mathematics, or related field. Proficiency in programming languages such as Python, R, SQL, etc. Experience with machine learning algorithms and data visualization techniques. Strong problem-solving and analytical skills.",
  //     salary: 8000 ,
  //     isSaved: false
  //   },
  //   {
  //     id_pro:" ",
  //     job_title:"Human Resources Specialist",
  //     job_description: "Manage recruitment processes, onboard new employees, administer employee benefits, handle employee relations, and ensure compliance with HR policies and regulations.",
  //     company_name: "Talent Solutions Inc.",
  //     job_requirement:"Bachelor's degree in Human Resources Management, Business Administration, or related field. Experience in HR roles such as recruitment, employee relations, or benefits administration. Knowledge of employment laws and regulations. Strong interpersonal and communication skills.",
  //     salary: 10000,
  //     isSaved: false
  //   },
  //   {
  //     id_pro:" ",
  //     job_title:"Web Developer",
  //     job_description: "Develop responsive and user-friendly websites, optimize website performance, implement web design principles, and collaborate with designers and content creators to deliver high-quality web solutions. Proficiency in HTML, CSS, JavaScript, and knowledge of web development frameworks such as React or Angular is required. Experience with content management systems (CMS) like WordPress or Drupal is a plus.",
  //     company_name: "Digital Solutions Agency",
  //     job_requirement:"Bachelor's degree in Computer Science, Web Development, or related field. Proficiency in HTML, CSS, JavaScript, and other web development languages. Experience with web development frameworks such as React, Angular, or Vue.js. Strong problem-solving skills and attention to detail.",
  //     salary: 30000 ,
  //     isSaved: false
  //   },
  //   {
  //     id_pro:" ",
  //     job_title:"Accountant",
  //     job_description: "Maintain financial records, prepare and analyze financial statements, manage accounts payable and receivable, reconcile accounts, and ensure compliance with accounting principles and regulations. Provide financial reports to management, assist with budgeting and forecasting, and support audits and tax filings. Strong analytical skills, attention to detail, and proficiency in accounting software such as QuickBooks or SAP are preferred.",
  //     company_name: "Financial Dynamics LLC.",
  //     job_requirement:"achelor's degree in Accounting, Finance, or related field. CPA certification preferred. Proficiency in accounting software such as QuickBooks, SAP, or Oracle. Strong analytical and mathematical skills.",
  //     salary: 15000,
  //     isSaved: false
  //   }
  // ]
  faBookmark = faBookmark
  constructor(public JobServices:JobServiceService, private title:Title, public jobserve:PostingService) {
    this.title.setTitle("Available Jobs")
  }

  ngOnInit(): void {
   this.JobServices.availableJobs();
  }
  toggleSave(index: number) {
    this.JobServices.toggleSave(index)
  }

}
