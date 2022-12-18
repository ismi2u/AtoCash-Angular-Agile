import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from 'src/app/services/location.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
	selector: 'app-location-form',
	templateUrl: './location-form.component.html',
	styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit {
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
				.updateLocationById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/location/list`);
				});
		} else {
			this.service.addLocation(this.form.value).subscribe(() => {
				this.router.navigateByUrl(`/location/list`);
			});
		}
	}

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private service: LocationService,
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
				this.service.getLocationById(param.id).subscribe((response: any) => {
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
			locationName: [null, [Validators.required]],
			city: [null, [Validators.required]],
			lattitude: [null],
			longitude: [null],
			locationDesc: [null, [Validators.required]],
			statusTypeId: [null, [Validators.required]],
		});
	}
}
