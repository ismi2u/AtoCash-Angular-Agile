import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountPayableMappingServices {

  projects = new BehaviorSubject([]);

  constructor(private http:HttpClient,private commonService:CommonService) { }

  getBusinessUnitList = () => this.http.get(`${this.commonService.getApi()}/api/BusinessUnits/BusinessUnitsForDropdown`);

  getEmployeesByApprovalGroupId = (id:any) => this.http.get(`${this.commonService.getApi()}/api/AccountPayableMapping/GetEmployeesByBusinessUnitId/${id}`)
 
  assignEmployeesToApprovalGroup = (data:any) => this.http.post(`${this.commonService.getApi()}/api/AccountPayableMapping/AddEmployeesToBusinessUnit`,data)
   
}
