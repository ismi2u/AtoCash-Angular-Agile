import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})

export class VendorService {
	vendors = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getVendors = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/Vendors/GetVendors`)
			.subscribe((response: any) => {
				this.vendors.next(response.data);
				this.commonService.loading.next(false);
			});
	};
	
	getVendorList = () =>
		this.http.get(`${this.commonService.getApi()}/api/Vendors/VendorsForDropdown`);

	getVendorById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/Vendors/GetVendor/${id}`);

	updateVendorById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/Vendors/PutVendor/${id}`,
			data,
		);

	addVendor = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/Vendors/PostVendor`, data);

	deleteVendor = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/Vendors/DeleteVendor/${id}`,
			{},
		);
}
