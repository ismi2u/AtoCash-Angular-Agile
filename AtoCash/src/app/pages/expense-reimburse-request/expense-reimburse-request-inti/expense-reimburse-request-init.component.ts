import { ExpenseTypesService } from 'src/app/services/expense-types.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { CommonService } from 'src/app/services/common.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { SubProjectsService } from 'src/app/services/sub-projects.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ExpenseReimburseRequestService } from 'src/app/services/expense-reimburse-request.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { constant } from 'src/app/constant/constant';
import { CurrencyService } from 'src/app/services/currency.service';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import { BusinessUnitService } from 'src/app/services/business-unit.service';

@Component({
	selector: 'app-expense-reimburse-form',
	templateUrl: './expense-reimburse-request-init.component.html',
	styleUrls: ['./expense-reimburse-request-init.component.scss'],
})
export class ExpenseReimburseRequestInitComponent implements OnInit {
	form!: FormGroup;
	fileList: any = [];
	projects = [];
	subProjects = [];
	expenseType = [];
	tasks = [];
	enableProject = false;
	empId = this.commonService.getUser().empId;
	taxes = [...Array(31).keys()];
	currencies = [];
	businessTypes = [];
	businessUnits=[];
	enableBusinessType = false;
	currencyCode = this.commonService.getUser().currencyId;
	businessUnitLocation:any;
	MaxId:any;

	@Input() data;

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private expenseReimburseService: ExpenseReimburseRequestService,
		private expenseTypeService: ExpenseTypesService,
		private projectService: ProjectsService,
		private subProjectService: SubProjectsService,
		private taskService: TasksService,
		private router: Router,
		private commonService: CommonService,
		private translate: TranslateService,
		private modal: NzModalRef,
		private currencyService: CurrencyService,
		private businessTypeService: BusinessTypeService,
		private businessUnitService:BusinessUnitService,
	) {}

	submitForm(): void {
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		this.modal.close({
			data: {
				...this.form.value,
				employeeId: this.commonService.getUser().empId,
				currencyTypeId: this.form.controls['currencyTypeId'].value,
			},
		});
	}

	ngOnInit(): void {
		this.commonService.loading.next(true);

		this.expenseReimburseService.getExpenseRequests(
			this.commonService.getUser().empId,
		)
		this.expenseReimburseService.expenseReimburseRequest.subscribe((data) => {
			this.MaxId = parseInt(Math.max.apply(Math, data.map(function(o) { return o.id; })))+1
		});

		this.currencyService.getCurrencyList().subscribe((response: any) => {
			this.currencies = response.data;
		});
		this.taskService.getTasksList().subscribe((response: any) => {
			this.tasks = response.data;
			this.commonService.loading.next(false);
		});

		this.businessTypeService.getBusinessTypesList().subscribe((response: any) => {
			this.businessTypes = response.data;
		});
		

		this.form = this.fb.group({
			currencyTypeId: [this.currencyCode],
			expenseReportTitle: [null, [Validators.required]],
			projectId: [null, [Validators.nullValidator]],
			subProjectId: [null, [Validators.nullValidator]],
			workTaskId: [null, [Validators.nullValidator]],			
			businessTypeId:[null, [Validators.nullValidator]],
			businessUnitId:[null, [Validators.nullValidator]],
		});

		
		this.form.controls['currencyTypeId'].setValue(this.commonService.getUser().currencyId)
		this.form.controls['currencyTypeId'].disable();
		
		if (this.data) {
			delete this.data.employeeId;
			this.form.setValue(this.data);
			if (this.data.projectId) {
				this.enableProject = true;
				this.projectService
					.getProjectListByEmpId()
					.subscribe((response: any) => {
						this.projects = response.data;
					});

				this.selectProject(this.data.projectId);
			}

			if (this.data.subProjectId) {
				this.selectSubProject(this.data.subProjectId);
			}

			if (this.data.businessTypeId) {
				this.enableBusinessType = true;
				this.businessUnitService
					.getBusinessUnitsList()
					.subscribe((businessUnits: any) => {
						this.businessUnits = businessUnits.data;
						this.selectBusinessType(this.data.businessTypeId);
					});
			}
		}


	}

	selectProject = (event) => {
		if (event) {
			this.subProjectService
				.getSubProjectListByProject(event)
				.subscribe((response: any) => {
					this.subProjects = response.data;
				});
		}
	};

	selectSubProject = (event) => {
		if(event)
		this.taskService
			.getSTaskListBySubProject(event)
			.subscribe((response: any) => {
				this.tasks = response.data;
			});
	};

	refreshForm = (event) => {
		 
        if(event)
		{
			this.projectService.getProjectListByEmpId().subscribe((response: any) => {
				this.projects = response.data;
			});
		}

		if(!event){
			this.form.controls['projectId'].reset();
			this.form.controls['subProjectId'].reset();
			this.form.controls['workTaskId'].reset();
		}else{
			this.form.controls['businessTypeId'].reset();
			this.form.controls['businessUnitId'].reset();
		}
		

	};

	selectBusinessType = (event) => {
		this.form.controls['businessUnitId'].reset();
		if (event) {
			this.businessUnitService
				.getBusinessUnitByBusinessTypeId(event)
				.subscribe((response: any) => {
					this.businessUnits = response.data;
				});
		}
	};

	selectBusinessUnit = (event) => {
		this.businessUnitLocation='';
		this.form.controls['expenseReportTitle'].reset();
		if (event) {
			this.businessUnitService
				.getBusinessUnitById(event)
				.subscribe((response: any) => {
					this.businessUnitLocation = response.data.location;
					this.form.controls['expenseReportTitle'].setValue(this.businessUnitLocation+"-"+this.MaxId);
				});
		}
		
	};

	getModalButton(data) {
		return this.translate.instant(data ? 'button.update' : 'button.next')	
	}
}

