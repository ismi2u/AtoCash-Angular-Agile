import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})

export class LocationService {
	locations = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getLocations = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/Locations/GetLocations`)
			.subscribe((response: any) => {
				this.locations.next(response.data);
				this.commonService.loading.next(false);
			});
	};
	
	geLocationList = () =>
		this.http.get(`${this.commonService.getApi()}/api/Locations/LocationsForDropdown`);

	getLocationById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/Locations/GetLocation/${id}`);

	updateLocationById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/Locations/PutLocation/${id}`,
			data,
		);

	addLocation = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/Locations/PostLocation`, data);

	deleteLocation = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/Locations/DeleteLocation/${id}`,
			{},
		);
}
