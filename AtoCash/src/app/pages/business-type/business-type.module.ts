import { AntdModule } from './../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BusinessTypeRoutingModule } from './business-type-routing.module';

import { BusinessTypeComponent } from './business-type.component';
import { BusinessTypeListComponent } from './business-type-list/business-type-list.component';
import { BusinessTypeFormComponent } from './business-type-form/business-type-form.component';


@NgModule({
  declarations: [BusinessTypeComponent, BusinessTypeListComponent, BusinessTypeFormComponent],
  imports: [
    CommonModule,
    BusinessTypeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class BusinessTypeModule { }
