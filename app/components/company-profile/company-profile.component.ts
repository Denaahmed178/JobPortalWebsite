import { Component } from '@angular/core';
import { CompanyServeService } from '../../services/company-service/company-serve.service';
import { Company } from '../../interfaces/company-interface/company';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent {

  constructor(public comserve: CompanyServeService){}
  ngOnInit(): void {
    this.comserve.getcompanys().subscribe((comsData: Company[]) => {
        this.comserve.company = comsData;
       
    });
}


}
