import { CommonService } from './../../services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { AccountPayableMappingServices } from './../../services/account-payable-mapping.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRolesService } from 'src/app/services/user-roles.service';
import { UserService } from 'src/app/services/users.service';
import { BusinessUnitService } from 'src/app/services/business-unit.service';

@Component({
	selector: 'app-task',
	templateUrl: './account-payable-mapping.component.html',
	styleUrls: ['./account-payable-mapping.component.scss'],
})
export class AccountPayableMappingComponent implements OnInit {
	form!: FormGroup;
	projects = [];
	employees: any = [];
	selectedAG = null;
	businessUnits = [];

	constructor(
		private accPayableMappingService: AccountPayableMappingServices,
		private employeeService: EmployeeService,
		private businessUnitService: BusinessUnitService,
    	private commonService: CommonService
	) {}

	submitForm(): void {}

	ngOnInit(): void {
    this.commonService.loading.next(true)
		
		this.businessUnitService
			.getBusinessUnitsList()
			.subscribe((response: any) => {
				this.businessUnits = response.data;
				this.selectedAG = this.businessUnits[0].id;
				this.loadEmployees(this.businessUnits[0].id);
				this.commonService.loading.next(false)
			});
	
			
	}

	onAGChange(event) {
		this.loadEmployees(event);
	}

	loadEmployees(id) {
    this.commonService.loading.next(true)
		this.accPayableMappingService
			.getEmployeesByApprovalGroupId(id)
			.subscribe((employees: any) => {
				this.employees = employees.data.map((employee) => {
					return {
						...employee,
						key: employee.employeeId,
						title: String(employee.employeeName).toLowerCase(),
						direction: employee.isAssigned ? 'right' : undefined,
					};
				});
        		this.commonService.loading.next(false)
			});
	}

	onSelectChange(event) {
	}
	onTransfer(event) {
    this.commonService.loading.next(true)
		const requestData = {
			businessUnitId: this.selectedAG,
			employeeIds: this.employees
				.filter((employee) => employee.direction === 'right')
				.map((employee) => employee.employeeId),
		};
		this.accPayableMappingService.assignEmployeesToApprovalGroup(requestData).subscribe(response=>{
		this.loadEmployees(this.selectedAG)
		})
	}
}
