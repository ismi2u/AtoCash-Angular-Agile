import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GeneralLedgerService } from 'src/app/services/generalledger.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
	selector: 'app-general-ledger-form',
	templateUrl: './general-ledger-form.component.html',
	styleUrls: ['./general-ledger-form.component.scss'],
})
export class GeneralLedgerFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	status = [];
	submitForm(): void {
		this.commonService.loading.next(true)
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.generalLedgerService
				.updateGeneralLedgeraById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/general-ledger/list`);
				});
		} else {
			this.generalLedgerService
				.addGeneralLedger(this.form.value)
				.subscribe(() => {
					this.router.navigateByUrl(`/general-ledger/list`);
				});
		}

	}

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private generalLedgerService: GeneralLedgerService,
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
				this.generalLedgerService
					.getGeneralLedgerById(param.id)
					.subscribe((response: any) => {
						this.recordId = param.id;
						delete response.data.id;
						delete response.data.statusType;
						this.form.setValue(response.data);
						if (this.mode === 'edit')
							this.form.controls['generalLedgerAccountNo'].disable();
						this.commonService.loading.next(false);
					});
			}else{
				this.commonService.loading.next(false)

			}
		});
		this.form = this.fb.group({
			generalLedgerAccountNo: [null, [Validators.required]],
			generalLedgerAccountName: [null, [Validators.required]],
			statusTypeId: [null, [Validators.required]],
		});
	}
}
