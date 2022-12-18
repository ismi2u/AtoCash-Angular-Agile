import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { VATRateService } from 'src/app/services/vat-rate.service'; 

@Component({
	selector: 'app-vat-rate-form',
	templateUrl: './vat-rate-form.component.html',
	styleUrls: ['./vat-rate-form.component.scss'],
})
export class VATRateFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	status = [];

	submitForm(): void {
		this.commonService.loading.next(false);
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.service
				.updateVATRate(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/vat-rate/action/edit/1`);
				});
		} else {
			this.service.getVATRate().subscribe((response: any) => {
				this.recordId = response.data.id;
				this.form.setValue(response.data);
				this.commonService.loading.next(false);
			});
		}
	}

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private service: VATRateService,
		private router: Router,
		private translate: TranslateService,
		private commonService: CommonService,
	) {}

	getButtonLabel = () => {
		return this.mode !== 'edit'
			? this.translate.instant('button.create')
			: this.translate.instant('button.update');
	};
	ngOnInit(): void {
		
		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.service.getVATRate().subscribe((response: any) => {
					this.recordId = response.data.id;
					this.form.setValue(response.data);
					this.commonService.loading.next(false);
				});
			} else {
				this.service.getVATRate().subscribe((response: any) => {
					this.recordId = response.data.id;
					this.form.setValue(response.data);
					this.commonService.loading.next(false);
				});
			}
		});

		 
		this.form = this.fb.group({
			id: [null, [Validators.required]],
			vatPercentage: [0, [Validators.required, Validators.max(100)]],
		});

		this.form.controls['id'].disable();
	}
}
