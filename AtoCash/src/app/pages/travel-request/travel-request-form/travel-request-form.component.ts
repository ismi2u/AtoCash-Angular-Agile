import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { CommonService } from 'src/app/services/common.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { SubProjectsService } from 'src/app/services/sub-projects.service';
import { TasksService } from 'src/app/services/tasks.service';
import { TravelRequestService } from 'src/app/services/travel-request.service';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import { BusinessUnitService } from 'src/app/services/business-unit.service';

@Component({
	selector: 'app-approval-level-form',
	templateUrl: './travel-request-form.component.html',
	styleUrls: ['./travel-request-form.component.scss'],
})
export class TravelRequestFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';

 
	projects = [];
	subProjects = [];
	tasks = [];
	enableProject = false;
	empId = this.commonService.getUser().empId;
	currencies = [];
	businessTypes = [];
	businessUnits=[];
	enableBusinessType = false;
	businessUnitLocation: any;
	
	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private travelRequestService: TravelRequestService,
		private projectService: ProjectsService,
		private subProjectService: SubProjectsService,
		private taskService: TasksService,
		private router: Router,
		private commonService: CommonService,
		private translate: TranslateService,
		private currencyService: CurrencyService,
		private _cdr: ChangeDetectorRef,
		private businessTypeService: BusinessTypeService,
		private businessUnitService:BusinessUnitService,
	) {}

	getButtonLabel = () => {
		return this.mode !== 'edit'
			? this.translate.instant('button.create')
			: this.translate.instant('button.update');
	};
	submitForm(): void {
		this.commonService.loading.next(true);

		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.travelRequestService
				.updateTravelRequestById(this.recordId, {
					...this.form.value,
					id: this.recordId,
					travelEndDate:new Date(this.form.controls['travelEndDate'].value),
				})
				.subscribe(()=>{
					this.router.navigateByUrl(`/travel-request/list`);
				});
		} else {
			this.travelRequestService
				.addTravelRequest({
					...this.form.value,
					travelEndDate:new Date(this.form.controls['travelEndDate'].value),
					
				})
				.subscribe(()=>{
					this.router.navigateByUrl(`/travel-request/list`);

				});
		}

	}

	ngOnInit(): void {
		this.currencyService.getCurrencyList().subscribe((response: any) => {
			this.currencies = response.data;
		});
		 
		this.taskService.getTasksList().subscribe((response: any) => {
			this.tasks = response.data;
		});

		this.businessTypeService.getBusinessTypesList().subscribe((response: any) => {
			this.businessTypes = response.data;
		});

		this.snapshot.params.subscribe((param) => {
			if (param.type === 'edit') {
				this.mode = param.type;
				this.recordId = param.id;
				this.travelRequestService
					.getTravelRequestById(param.id)
					.subscribe((response: any) => {
						const formData = {
							employeeId: response.data.employeeId,
							travelStartDate: response.data.travelStartDate,
							travelEndDate: response.data.travelEndDate,
							travelPurpose: response.data.travelPurpose,
							projectId: response.data.projectId,
							subProjectId: response.data.subProjectId,
							workTaskId: response.data.workTaskId,
							businessTypeId:response.data.businessTypeId,
							businessUnitId:response.data.businessUnitId,
						};

						if (response.data.projectId) {
							this.enableProject = true;
							this.projectService
								.getProjectListByEmpId()
								.subscribe((response: any) => {
									this.projects = response.data;
								});
						}

						if (response.data.businessTypeId) {
							this.enableBusinessType = true;
							this.businessUnitService
								.getBusinessUnitsList()
								.subscribe((businessUnits: any) => {
									this.businessUnits = businessUnits.data;
									this.selectBusinessType(response.data.businessTypeId);
								});
						}

						this.form.setValue(formData);
						this.commonService.loading.next(false);
					});
					
			}else{
				this.commonService.loading.next(false);
			}
		});

		this.form = this.fb.group({
			employeeId: [this.commonService.getUser().empId, [Validators.required]],
			travelStartDate: [null, [Validators.required]],
			travelEndDate: [null, [Validators.required]],
			travelPurpose: [null, [Validators.required]],
			projectId: [null, [Validators.nullValidator]],
			subProjectId: [null, [Validators.nullValidator]],
			workTaskId: [null, [Validators.nullValidator]],
			businessTypeId:[null, [Validators.nullValidator]],
			businessUnitId:[null, [Validators.nullValidator]],
		});

		this.form.controls['travelEndDate'].disable();

		this.form.controls['travelStartDate'].valueChanges.subscribe((value) => {
			if (!this.form.controls['travelEndDate'].value) {
				this.form.controls['travelEndDate'].enable();
				const newDate = new Date(value).getTime() + 24 * 60 * 60 * 1000;
				this.form.controls['travelEndDate'].setValue(new Date(newDate));
			}
		});

		this.form.controls['travelEndDate'].valueChanges.subscribe();
	}

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
		if (event) {
			this.businessUnitService
				.getBusinessUnitById(event)
				.subscribe((response: any) => {
					this.businessUnitLocation = response.data.location;
				});
		}
	};

	selectProject = (event) => {
		if(event)
		this.subProjectService
			.getSubProjectListByProject(event)
			.subscribe((response: any) => {
				this.subProjects = response.data;
			});
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
		this.projectService.getProjectListByEmpId().subscribe((response: any) => {
			this.projects = response.data;
		});
		
		if (!event) {
			this.form.controls['projectId'].reset();
			this.form.controls['subProjectId'].reset();
			this.form.controls['workTaskId'].reset();
		}else{
			this.form.controls['businessTypeId'].reset();
			this.form.controls['businessUnitId'].reset();
		}
	};

	disabledEndDate = (endValue: Date): boolean => {
		const date = new Date();

		if (this.form.controls['travelStartDate'].value) {
			const startDate = new Date(
				this.form.controls['travelStartDate'].value,
			).getTime();
			return (
				new Date(date).getTime() - 24 * 60 * 60 * 1000 >=
					new Date(endValue).getTime() ||
				startDate > new Date(endValue).getTime()
			);
		} else {
			return (
				new Date(date).getTime() - 24 * 60 * 60 * 1000 >=
				new Date(endValue).getTime()
			);
		}
	};

	disabledStartDate = (startValue: Date): boolean => {
		const date = new Date();
		return (
			new Date(date).getTime() - 24 * 60 * 60 * 1000 >=
			new Date(startValue).getTime()
		);
	};
}
