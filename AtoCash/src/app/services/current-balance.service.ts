import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentBalanceService {
  currentEmployeesBalance = new BehaviorSubject([]);

  constructor(private http: HttpClient,private commonService:CommonService) {}

  getEployeesBalance = () => {
    this.http
      .get(`${this.commonService.getApi()}/api/EmpCurrentCashAdvanceBalances`)
      .subscribe((response: any) => {
        this.currentEmployeesBalance.next(response.data);
      });
  };

  getEmployeesBalanceById = (id: any) =>
    this.http.get(`${this.commonService.getApi()}/api/EmpCurrentCashAdvanceBalances/${id}`);

  updateEmployeeBalanceById = (id: any, data: any) =>
    this.http.put(
      `${this.commonService.getApi()}/api/EmpCurrentCashAdvanceBalances/${id}`,
      data
    );

  addEmployeeBalance = (data: any) =>
    this.http.post(`${this.commonService.getApi()}/api/EmpCurrentCashAdvanceBalances`, data);

  deleteEmployeeBalance = (id: any) =>
    this.http.delete(
      `${this.commonService.getApi()}/api/EmpCurrentCashAdvanceBalances/${id}`,
      {}
    );
}
