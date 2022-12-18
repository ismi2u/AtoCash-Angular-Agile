import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';

@Component({
	selector: 'app-location-list',
	templateUrl: './location-list.component.html',
	styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent implements OnInit {
	Locations: any;
	locationHeaders: any = [
		'tableHeader.location.id',
		'tableHeader.location.locationName',
		'tableHeader.location.locationDesc',
		'tableHeader.location.status',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private service: LocationService,
		private router: Router,
		private commonService:CommonService
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.service.getLocations();
		this.service.locations.subscribe((data) => {
			this.Locations = data;
			console.log(data);
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.commonService.loading.next(true);
		this.service.deleteLocation(event.id).subscribe(() => {
			this.service.getLocations();
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/location/action/edit/${event.id}`);
	};
}
