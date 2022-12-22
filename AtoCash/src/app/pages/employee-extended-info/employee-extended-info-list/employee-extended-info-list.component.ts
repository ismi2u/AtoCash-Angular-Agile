import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeExtendedInfoService } from 'src/app/services/employee-extended-info.service';

@Component({
	selector: 'app-employee-extended-info-list',
	templateUrl: './employee-extended-info-list.component.html',
	styleUrls: ['./employee-extended-info-list.component.scss'],
})
export class EmployeeExtendedInfoListComponent implements OnInit {
	employeeExtendedInfo: any;
	employeeExtendedInfoHeaders: any = [
		'tableHeader.employee-extended-info.employee',
		'tableHeader.employee-extended-info.businessType',
		'tableHeader.employee-extended-info.businessUnit',
		'tableHeader.employee-extended-info.jobRole',
		'tableHeader.employee-extended-info.approvalGroup',
		'tableHeader.employee-extended-info.statusType',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private employeeExtendedInfoService: EmployeeExtendedInfoService,
		private router: Router,
    private commonService: CommonService
	) {}

	ngOnInit(): void {
    this.commonService.loading.next(true);
		this.employeeExtendedInfoService.getEmployeeExtendedInfos();
		this.employeeExtendedInfoService.employeeExtendedInfo.subscribe((data) => {
			this.employeeExtendedInfo = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
    this.commonService.loading.next(true);
		this.employeeExtendedInfoService
			.deleteEmployeeExtendedInfo(event.id)
			.subscribe(() => {
				this.employeeExtendedInfoService.getEmployeeExtendedInfos();
        this.commonService.loading.next(false);
			});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/employee-extended-info/action/edit/${event.id}`);
	};
}
