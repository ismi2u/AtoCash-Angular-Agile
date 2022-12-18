import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})

export class BankService {
	banks = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getBanks = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/Bank/GetBanks`)
			.subscribe((response: any) => {
				this.banks.next(response.data);
				this.commonService.loading.next(false);
			});
	};
	
	getBankList = () =>
		this.http.get(`${this.commonService.getApi()}/api/Bank/BanksForDropdown`);

	getBankById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/Bank/GetBank/${id}`);

	updateBankById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/Bank/PutBank/${id}`,
			data,
		);

	addBank = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/Bank/PostBank`, data);

	deleteBank = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/Bank/DeleteBank/${id}`,
			{},
		);
}
