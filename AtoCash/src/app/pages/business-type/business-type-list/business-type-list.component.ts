import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessTypeService } from 'src/app/services/business-type.service';

@Component({
	selector: 'app-business-type-list',
	templateUrl: './business-type-list.component.html',
	styleUrls: ['./business-type-list.component.scss'],
})
export class BusinessTypeListComponent implements OnInit {
	businessTypes: any;
	businessTypeHeaders: any = [
		'tableHeader.business-type.businessTypeName',
		'tableHeader.business-type.businessTypeDesc',
		'tableHeader.business-type.status',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private service: BusinessTypeService,
		private router: Router,
		private commonService:CommonService
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.service.getBusinessTypes();
		this.service.businessTypes.subscribe((data) => {
			this.businessTypes = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.commonService.loading.next(true);
		this.service.deleteBusinessType(event.id).subscribe(() => {
			this.service.getBusinessTypes();
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/business-type/action/edit/${event.id}`);
	};
}
