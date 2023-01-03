import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeExtendedInfoService {

  employeeExtendedInfo = new BehaviorSubject([]);

  constructor(private http:HttpClient, private commonService:CommonService) { }

  getEmployeeExtendedInfos = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/EmployeeExtendedInfo/GetEmployeeExtendedInfos`)
			.subscribe((response: any) => {
				this.employeeExtendedInfo.next(response.data);
				this.commonService.loading.next(false);
			});
	};
	
	 
	getEmployeeExtendedInfoById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/EmployeeExtendedInfo/GetEmployeeExtendedInfoById/${id}`);

  getEmployeeExtendedInfoByEmployeeId = (id) => {
    return this.http.get(
      `${this.commonService.getApi()}/api/EmployeeExtendedInfo/GetEmployeeExtendedInfoByEmployeeId/${id}`,
    );
  };

	updateEmployeeExtendedInfoById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/EmployeeExtendedInfo/PutEmployeeExtendedInfo/${id}`,
			data,
		);

	addEmployeeExtendedInfo = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/EmployeeExtendedInfo/PostEmployeeExtendedInfo`, data);

	deleteEmployeeExtendedInfo = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/EmployeeExtendedInfo/DeleteEmployeeExtendedInfo/${id}`,
			{},
		);
  

}
