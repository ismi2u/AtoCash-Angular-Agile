import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { VendorService } from 'src/app/services/vendor.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
	selector: 'app-vendor-form',
	templateUrl: './vendor-form.component.html',
	styleUrls: ['./vendor-form.component.scss'],
})
export class VendorFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	status = [];

	submitForm(): void {
		this.commonService.loading.next(true);
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.service
				.updateVendorById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/vendor/list`);
				});
		} else {
			this.service.addVendor(this.form.value).subscribe(() => {
				this.router.navigateByUrl(`/vendor/list`);
			});
		}
	}

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private service: VendorService,
		private router: Router,
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
				this.service.getVendorById(param.id).subscribe((response: any) => {
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

		 
		this.form = this.fb.group({
			vendorName: [null, [Validators.required]],
			description: [null, [Validators.required]],
			city: [null],
			statusTypeId: [null, [Validators.required]],
		});
	}
}
