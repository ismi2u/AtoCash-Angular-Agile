import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CostService } from 'src/app/services/cost.service';
import { LocationService } from 'src/app/services/location.service';
import { BusinessUnitService } from 'src/app/services/business-unit.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
	selector: 'app-business-unit-form',
	templateUrl: './business-unit-form.component.html',
	styleUrls: ['./business-unit-form.component.scss'],
})
export class BusinessUnitFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	costCenterList = [];
	LocationList = [];
	status = [];

	submitForm(): void {
		this.commonService.loading.next(true);
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.service
				.updateBusinessUnitById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/business-unit/list`);
				});
		} else {
			this.service.addBusinessUnit(this.form.value).subscribe(() => {
				this.router.navigateByUrl(`/business-unit/list`);
			});
		}
	}

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private service: BusinessUnitService,
		private router: Router,
		private costCenterService: CostService,
		private locationService:LocationService,
		private translate: TranslateService,
		private statusService: StatusService,
		private commonService: CommonService,
	) {}

	getButtonLabel = () => {
		return this.mode !== 'edit'
			? this.translate.instant('button.create')
			: this.translate.instant('button.update');
	};
	ngOnInit(): void {
		this.statusService.getStatusList().subscribe((response: any) => {
			this.status = response.data;
		});
		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.service.getBusinessUnitById(param.id).subscribe((response: any) => {
					this.recordId = param.id;
					delete response.data.id;
					delete response.data.statusType;
					delete response.data.costCenter;
					this.form.setValue(response.data);
					if (this.mode === 'edit') this.form.controls['deptCode'].disable();
					this.commonService.loading.next(false);
				});
			} else {
				this.commonService.loading.next(false);
			}
		});

		this.costCenterService.getCostCenterList().subscribe((response: any) => {
			this.costCenterList = response.data;
		});
		
		this.locationService.geLocationList().subscribe((response: any) => {
			this.LocationList = response.data;
		});

		this.form = this.fb.group({
			businessUnitType: [null, [Validators.required]],
			businessUnitName: [null, [Validators.required]],
			costCenterId: [null, [Validators.required]],
			businessDesc: [null, [Validators.required]],
			locationId: [null, [Validators.required]],
			statusTypeId: [null, [Validators.required]],
		});
	}
}
