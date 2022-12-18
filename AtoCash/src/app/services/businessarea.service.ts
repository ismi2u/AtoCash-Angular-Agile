import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class BusinessAreaService {
	BusinessAreas = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getBusinessAreas = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/BusinessAreas/GetBusinessAreas`)
			.subscribe((response: any) => {
				this.BusinessAreas.next(response.data);
				this.commonService.loading.next(false);
			});
	};
	getBusinessAreasByCostCenterId = (id) => {
		return this.http.get(
			`${this.commonService.getApi()}/api/BusinessAreas/BusinessAreasForDropdownByCostCentre/${id}`,
		);
	};

	getBusinessAreaList = () =>
		this.http.get(`${this.commonService.getApi()}/api/BusinessAreas/BusinessAreasForDropdown`);

	getBusinessAreaById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/BusinessAreas/GetBusinessArea/${id}`);

	updateBusinessAreaById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/BusinessAreas/PutBusinessArea/${id}`,
			data,
		);

	addBusinessArea = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/BusinessAreas/PostBusinessArea`, data);

	deleteBusinessArea = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/BusinessAreas/DeleteBusinessArea/${id}`,
			{},
		);
}
