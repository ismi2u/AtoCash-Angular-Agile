import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationRoutingModule } from './location-routing.module';

import { LocationComponent } from './location.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationFormComponent } from './location-form/location-form.component';


@NgModule({
  declarations: [LocationComponent, LocationListComponent, LocationFormComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class LocationModule { }
