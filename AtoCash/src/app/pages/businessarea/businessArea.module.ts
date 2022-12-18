import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BusinessAreaRoutingModule } from './businessarea-routing.module';

import { BusinessAreaComponent } from './businessarea.component';
import { BusinessAreaListComponent } from './businessarea-list/businessarea-list.component';
import { BusinessAreaFormComponent } from './businessarea-form/businessarea-form.component';


@NgModule({
  declarations: [BusinessAreaComponent, BusinessAreaListComponent, BusinessAreaFormComponent],
  imports: [
    CommonModule,
    BusinessAreaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class BusinessAreaModule { }
