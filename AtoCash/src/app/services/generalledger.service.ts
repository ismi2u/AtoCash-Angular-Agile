import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})

export class GeneralLedgerService {
	generalLedger = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getGeneralLedger = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/GeneralLedger/GetGeneralLedger`)
			.subscribe((response: any) => {
				this.generalLedger.next(response.data);
				this.commonService.loading.next(false);
			});
	};
	 

	getGeneralLedgerList = () =>
		this.http.get(`${this.commonService.getApi()}/api/GeneralLedger/GeneralLedgerForDropdown`);

	getGeneralLedgerById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/GeneralLedger/GetGeneralLedger/${id}`);

	updateGeneralLedgeraById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/GeneralLedger/PutGeneralLedger/${id}`,
			data,
		);

	addGeneralLedger = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/GeneralLedger/PostGeneralLedger`, data);

	deleteGeneralLedger = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/GeneralLedger/DeleteGeneralLedger/${id}`,
			{},
		);
}
