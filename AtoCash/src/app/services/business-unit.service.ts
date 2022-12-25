import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class BusinessUnitService {
	businessUnits = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getBusinessUnitsList = () =>
		this.http.get(`${this.commonService.getApi()}/api/BusinessUnits/BusinessUnitsForDropdown`);


	getBusinessUnits = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/BusinessUnits/GetBusinessUnits`)
			.subscribe((response: any) => {
				this.businessUnits.next(response.data);
				this.commonService.loading.next(false);
			});
	};
	 	
	getBusinessUnitById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/BusinessUnits/GetBusinessUnit/${id}`);

	getBusinessUnitByBusinessTypeId = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/BusinessUnits/BusinessUnitsByBusinessTypeIdForDropdown/${id}`);

	updateBusinessUnitById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/BusinessUnits/PutBusinessUnits/${id}`,
			data,
		);

	addBusinessUnit = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/BusinessUnits/PostBusinessUnits`, data);

	deleteBusinessUnit = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/BusinessUnits/DeleteBusinessUnits/${id}`,
			{},
		);
}
