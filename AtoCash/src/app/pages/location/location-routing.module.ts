import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationComponent } from './location.component';
import { LocationListComponent } from './location-list/location-list.component';

import { LocationFormComponent } from './location-form/location-form.component';

const routes: Routes = [{
  path: '', component: LocationComponent,
  children: [
    {
      path: 'list',
      component: LocationListComponent,
    },
    {
      path: 'action/:type',
      component: LocationFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: LocationFormComponent,
    },
  
    { path: '', redirectTo: 'list', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
