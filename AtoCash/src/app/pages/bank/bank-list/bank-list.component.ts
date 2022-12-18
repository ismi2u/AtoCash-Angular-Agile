import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankService } from 'src/app/services/bank.service';

@Component({
	selector: 'app-bank-list',
	templateUrl: './bank-list.component.html',
	styleUrls: ['./bank-list.component.scss'],
})
export class BankListComponent implements OnInit {
	Banks: any;
	bankHeaders: any = [
		'tableHeader.bank.id',
		'tableHeader.bank.bankName',
		'tableHeader.bank.bankDesc',
		'tableHeader.bank.status',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private service: BankService,
		private router: Router,
		private commonService:CommonService
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.service.getBanks();
		this.service.banks.subscribe((data) => {
			this.Banks = data;
			console.log(data);
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.commonService.loading.next(true);
		this.service.deleteBank(event.id).subscribe(() => {
			this.service.getBanks();
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/bank/action/edit/${event.id}`);
	};
}
