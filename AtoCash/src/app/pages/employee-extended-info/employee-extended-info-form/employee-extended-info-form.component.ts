import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ApprovalGroupsService } from 'src/app/services/approval-groups.service';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import { BusinessUnitService } from 'src/app/services/business-unit.service';
import { EmployeeExtendedInfoService } from 'src/app/services/employee-extended-info.service';
import { CostService } from 'src/app/services/cost.service';
import { RolesService } from 'src/app/services/roles.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
	selector: 'app-employee-extended-info-form',
	templateUrl: './employee-extended-info-form.component.html',
	styleUrls: ['./employee-extended-info-form.component.scss'],
})
export class EmployeeExtendedInfoFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	roles = [];
	levels = [];
	groups = [];
	employees = [];
	businessTypes = [];
	businessUnits = [];
	status = [];
	
	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private employeeExtendedInfoService: EmployeeExtendedInfoService,
		private businessTypeService: BusinessTypeService,
		private businessUnitService: BusinessUnitService,
		private approvalGroupService: ApprovalGroupsService,
		private rolesService: RolesService,
		private router: Router,
		private translate: TranslateService,
		private commonService: CommonService,
		private employeeService:EmployeeService,
		private statusService: StatusService,
	) {}

	
	submitForm(): void {
		this.commonService.loading.next(true);
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}

		if (this.mode === 'edit') {
			this.employeeExtendedInfoService
				.updateEmployeeExtendedInfoById(this.recordId, {
					...this.form.value,
					id: this.recordId,
				})
				.subscribe(() => {
					this.router.navigateByUrl(`/employee-extended-info/list`);
				});
		} else {
			this.employeeExtendedInfoService
				.addEmployeeExtendedInfo(this.form.value)
				.subscribe(() => {
					this.router.navigateByUrl(`/employee-extended-info/list`);
				});
		}
	}

	
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
				this.employeeExtendedInfoService
					.getEmployeeExtendedInfoById(param.id)
					.subscribe((response: any) => {
						this.recordId = param.id;
						delete response.data.businessUnit;
						const formData = {
							employeeId: response.data.employeeId,
							jobRoleId: response.data.jobRoleId,
							approvalGroupId: response.data.approvalGroupId,
							businessTypeId:response.data.businessTypeId,
							businessUnitId:response.data.businessUnitId,
							statusTypeId:response.data.statusTypeId,
						};
						this.selectBusinessType(response.data.businessTypeId);
						this.form.setValue(formData);
            			this.commonService.loading.next(false);
						
					});
				} else {
				this.commonService.loading.next(false);
			}

			
		});

		this.businessTypeService.getBusinessTypesList().subscribe((response: any) => {
			this.businessTypes = response.data;
		});

		 

		this.rolesService.getJobRoleList().subscribe((response: any) => {
			this.roles = response.data;
		});
		 

		this.approvalGroupService
			.getApprovalGroupsList()
			.subscribe((response: any) => {
				this.groups = response.data;
			});
		
		this.employeeService
			.getEmployeeList()
			.subscribe((response: any) => {
				this.employees = response.data;
			});

		this.form = this.fb.group({
			employeeId: [null, [Validators.required]],
			businessTypeId:[null, [Validators.required]],
			businessUnitId:[null, [Validators.required]],
			approvalGroupId: [null, [Validators.required]],
			jobRoleId: [null, [Validators.required]],
			statusTypeId: [null, [Validators.required]],
		});

		
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


}
