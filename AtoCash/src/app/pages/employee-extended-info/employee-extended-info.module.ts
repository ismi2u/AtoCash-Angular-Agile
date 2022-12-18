import { AntdModule } from './../../components/antd.module';
import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeExtendedInfoRoutingModule } from './employee-extended-info-routing.module';
import { EmployeeExtendedInfoComponent } from './employee-extended-info.component';
import { EmployeeExtendedInfoListComponent } from './employee-extended-info-list/employee-extended-info-list.component';
import { EmployeeExtendedInfoFormComponent } from './employee-extended-info-form/employee-extended-info-form.component';

@NgModule({
  declarations: [EmployeeExtendedInfoComponent, EmployeeExtendedInfoListComponent, EmployeeExtendedInfoFormComponent],
  imports: [
    CommonModule,
    EmployeeExtendedInfoRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class EmployeeExtendedInfoModule { }
