import { CommonService } from './../../services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { AccountPayableMappingServices } from './../../services/account-payable-mapping.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRolesService } from 'src/app/services/user-roles.service';
import { UserService } from 'src/app/services/users.service';
import { CostService } from 'src/app/services/cost.service';

@Component({
	selector: 'app-task',
	templateUrl: './account-payable-mapping.component.html',
	styleUrls: ['./account-payable-mapping.component.scss'],
})
export class AccountPayableMappingComponent implements OnInit {
	form!: FormGroup;
	projects = [];
	employees: any = [];
	selectedCostCenter = null;
	costCenters = [];

	constructor(
		private accPayableMappingService: AccountPayableMappingServices,
		private employeeService: EmployeeService,
		private costService: CostService,
    	private commonService: CommonService
	) {}

	submitForm(): void {}

	ngOnInit(): void {
    	this.commonService.loading.next(true);
		
		this.costService
		.getCostCenterList()
		.subscribe((response: any) => {
			this.costCenters = response.data;
			this.selectedCostCenter = this.costCenters[0].id;
			this.loadEmployees(this.costCenters[0].id);
			this.commonService.loading.next(false)
		}, function (err) {
            this.commonService.loading.next(false);
        });

		

	}

	onAGChange(event) {
		this.loadEmployees(event);
	}

	loadEmployees(id) {
    this.commonService.loading.next(true)
		this.accPayableMappingService
			.getEmployeesByCostCenterId(id)
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
			costCenterId: this.selectedCostCenter,
			employeeIds: this.employees
				.filter((employee) => employee.direction === 'right')
				.map((employee) => employee.employeeId),
		};
		this.accPayableMappingService.assignEmployeesToCostCenter(requestData).subscribe(response=>{
		this.loadEmployees(this.selectedCostCenter)
		})
	}
}
