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

  getCostCenterList = () => this.http.get(`${this.commonService.getApi()}/api/CostCenters/CostCentersForDropDown`);

  getEmployeesByCostCenterId = (id:any) => this.http.get(`${this.commonService.getApi()}/api/AccountPayableMapping/GetEmployeesByCostCenterId/${id}`)
 
  assignEmployeesToCostCenter = (data:any) => this.http.post(`${this.commonService.getApi()}/api/AccountPayableMapping/AddEmployeesToCostCenter`,data)
   
}
