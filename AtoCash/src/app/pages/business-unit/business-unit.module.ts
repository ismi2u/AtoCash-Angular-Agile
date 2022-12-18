import { AntdModule } from './../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BusinessUnitRoutingModule } from './business-unit-routing.module';

import { BusinessUnitComponent } from './business-unit.component';
import { BusinessUnitListComponent } from './business-unit-list/business-unit-list.component';
import { BusinessUnitFormComponent } from './business-unit-form/business-unit-form.component';


@NgModule({
  declarations: [BusinessUnitComponent, BusinessUnitListComponent, BusinessUnitFormComponent],
  imports: [
    CommonModule,
    BusinessUnitRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class BusinessUnitModule { }
