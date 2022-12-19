import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class BusinessTypeService {
	businessTypes = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getBusinessTypesList = () =>
		this.http.get(`${this.commonService.getApi()}/api/BusinessTypes/BusinessTypesForDropdown`);


	getBusinessTypes = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/BusinessTypes/GetBusinessTypes`)
			.subscribe((response: any) => {
				this.businessTypes.next(response.data);
				this.commonService.loading.next(false);
			});
	};
	 	
	getBusinessTypeById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/BusinessTypes/GetBusinessType/${id}`);

	updateBusinessTypeById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/BusinessTypes/PutBusinessTypes/${id}`,
			data,
		);

	addBusinessType = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/BusinessTypes/PostBusinessTypes`, data);

	deleteBusinessType = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/BusinessTypes/DeleteBusinessTypes/${id}`,
			{},
		);
}
