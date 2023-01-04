import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessUnitService } from 'src/app/services/business-unit.service';

@Component({
	selector: 'app-business-unit-list',
	templateUrl: './business-unit-list.component.html',
	styleUrls: ['./business-unit-list.component.scss'],
})
export class BusinessUnitListComponent implements OnInit {
	businessUnits: any;
	businessUnitHeaders: any = [
		'tableHeader.business-unit.businessType',
		'tableHeader.business-unit.businessUnitCode',
		'tableHeader.business-unit.businessUnitName',
		'tableHeader.business-unit.businessDesc',
		'tableHeader.business-unit.costCenter',		
		'tableHeader.business-unit.location',
		'tableHeader.business-unit.status',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private service: BusinessUnitService,
		private router: Router,
		private commonService:CommonService
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.service.getBusinessUnits();
		this.service.businessUnits.subscribe((data) => {
			this.businessUnits = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.commonService.loading.next(true);
		this.service.deleteBusinessUnit(event.id).subscribe(() => {
			this.service.getBusinessUnits();
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/business-unit/action/edit/${event.id}`);
	};
}
