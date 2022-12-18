import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { GeneralLedgerService } from 'src/app/services/generalledger.service';

@Component({
	selector: 'app-general-ledger-list',
	templateUrl: './general-ledger-list.component.html',
	styleUrls: ['./general-ledger-list.component.scss'],
})
export class GeneralLedgerListComponent implements OnInit {
	generalLedger: any;
	generalLedgerHeaders: any = [
		'tableHeader.generalLedger.generalLedgerAccountNo',
		'tableHeader.generalLedger.generalLedgerAccountName',
		'tableHeader.generalLedger.status',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private generalLedgerService: GeneralLedgerService,
		private router: Router,
		private commonService: CommonService,
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.generalLedgerService.getGeneralLedger();
		this.generalLedgerService.generalLedger.subscribe((data) => {
			this.generalLedger = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.commonService.loading.next(true);
		this.generalLedgerService.deleteGeneralLedger(event.id).subscribe(() => {
			this.generalLedgerService.getGeneralLedger();
			this.commonService.loading.next(false);
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/general-ledger/action/edit/${event.id}`);
	};
}
