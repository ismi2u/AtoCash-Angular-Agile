import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExpenseCategoriesService } from 'src/app/services/expense-categories.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
	selector: 'app-expense-category-form',
	templateUrl: './expense-category-form.component.html',
	styleUrls: ['./expense-category-form.component.scss'],
})
export class ExpenseCategoryFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	status = [];
	isBusinessCategory=true;

	submitForm(): void {
		this.commonService.loading.next(true)
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.expenseCategoryService
				.updateExpenseCategoryById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/expense-category/list`);
				});
		} else {
			this.expenseCategoryService
				.addExpenseCategory(this.form.value)
				.subscribe(() => {
					this.router.navigateByUrl(`/expense-category/list`);
				});
		}

	}

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private expenseCategoryService: ExpenseCategoriesService,
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
				this.expenseCategoryService
					.getExpenseCategoryById(param.id)
					.subscribe((response: any) => {
						this.recordId = param.id;
						delete response.data.id;
						delete response.data.statusType;
						this.form.setValue(response.data);
						if (this.mode === 'edit')
							this.form.controls['expenseCategoryName'].disable();
						this.commonService.loading.next(false);
					});
			}else{
				this.commonService.loading.next(false)

			}
		});
		this.form = this.fb.group({
			expenseCategoryName: [null, [Validators.required]],
			expenseCategoryDesc: [null, [Validators.required]],
			isBusinessCategory:[null, [Validators.required]],
			statusTypeId: [null, [Validators.required]],
		});
	}
}
