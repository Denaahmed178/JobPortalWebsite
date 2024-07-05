import { Injectable } from '@angular/core';
import { Company } from '../../interfaces/company-interface/company';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc ,updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyServeService {

  company:Company[] =[]
  url = "https://firestore.googleapis.com/v1/projects/job-portal-84b12/databases/(default)/documents/Company"

  getcompanys() : Observable<Company[]>{
    const com_scollection=collection(this.firestore,'Company');
    const comscoll=collectionData(com_scollection,{idField:'id_com'});
    return comscoll as Observable<Company[]>;
  }

  Editpost(jobid: any, company: Company) {
    const jobscollection = collection(this.firestore, 'Copmany');
    const document = doc(jobscollection, company.id_com);
    this.company[0]=company
    const updatedJobData = {
      CompanyName: company.CompanyName,
      CompanyDescription: company.CompanyDescription,
      email: company.email,
      phoneNumber: company.phoneNumber
    };
  
    return updateDoc(document, updatedJobData)
      .then(() => {
        console.log('Company data updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating job data:', error);
        throw error;
      });
  
  }

  constructor(private firestore: Firestore) { }
}
