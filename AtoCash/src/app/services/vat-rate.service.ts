import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class VATRateService {
	VATRates = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}
	 
	getVATRate = () => {
		return this.http.get(
			`${this.commonService.getApi()}/api/VATRate/GetVATPercentage/`,
		);
	};

	 
	updateVATRate = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/VATRate/PutVATRate/${id}`,
			data,
		);

	 
}
