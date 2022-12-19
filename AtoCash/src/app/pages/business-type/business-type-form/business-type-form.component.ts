import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
	selector: 'app-business-type-form',
	templateUrl: './business-type-form.component.html',
	styleUrls: ['./business-type-form.component.scss'],
})
export class BusinessTypeFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	businessTypeList = [];
	status = [];

	submitForm(): void {
		this.commonService.loading.next(true);
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.service
				.updateBusinessTypeById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/business-type/list`);
				});
		} else {
			this.service.addBusinessType(this.form.value).subscribe(() => {
				this.router.navigateByUrl(`/business-type/list`);
			});
		}
	}

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private router: Router,
		private translate: TranslateService,
		private statusService: StatusService,
		private commonService: CommonService,
		private service:BusinessTypeService,
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
				this.service.getBusinessTypeById(param.id).subscribe((response: any) => {
					this.recordId = param.id;
					delete response.data.id;
					delete response.data.statusType;
					this.form.setValue(response.data);
					this.commonService.loading.next(false);
				});
			} else {
				this.commonService.loading.next(false);
			}
		});

		 
		this.service.getBusinessTypesList().subscribe((response: any) => {
			this.businessTypeList = response.data;
		});

		this.form = this.fb.group({
			businessTypeName: [null, [Validators.required]],
			businessTypeDesc: [null, [Validators.required]],
			statusTypeId: [null, [Validators.required]],
		});
	}
}
