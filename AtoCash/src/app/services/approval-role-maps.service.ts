import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovalRoleMapsService {

  approvalRoles = new BehaviorSubject([]);

  constructor(private http:HttpClient, private commonService:CommonService) { }


  getApprovalRoleMaps = () =>{
     this.http.get(`${this.commonService.getApi()}/api/ApprovalRoleMaps/GetApprovalRoleMaps`).subscribe((response:any)=>{
      this.approvalRoles.next(response.data);
      this.commonService.loading.next(false);
     });
    }
  

  getApprovalRoleMapById = (id:any) => 
    this.http.get(`${this.commonService.getApi()}/api/ApprovalRoleMaps/GetApprovalRoleMap/${id}`);

  updateApprovalRoleMapById = (id:any,data:any) => 
    this.http.put(`${this.commonService.getApi()}/api/ApprovalRoleMaps/PutApprovalRoleMap/${id}`,data);

  addApprovalRoleMap = (data:any) => 
    this.http.post(`${this.commonService.getApi()}/api/ApprovalRoleMaps/PostApprovalRoleMap`,data);  

  deleteApprovalRoleMapById = (id:any) => 
  this.http.delete(`${this.commonService.getApi()}/api/ApprovalRoleMaps/DeleteApprovalRoleMap/${id}`,{});
  
}
