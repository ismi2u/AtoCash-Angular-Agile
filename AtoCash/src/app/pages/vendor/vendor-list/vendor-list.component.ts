import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
	selector: 'app-vendor-list',
	templateUrl: './vendor-list.component.html',
	styleUrls: ['./vendor-list.component.scss'],
})
export class VendorListComponent implements OnInit {
	Vendors: any;
	vendorHeaders: any = [
		'tableHeader.vendor.id',
		'tableHeader.vendor.vendorName',
		'tableHeader.vendor.description',
		'tableHeader.vendor.city',
		'tableHeader.vendor.status',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private service: VendorService,
		private router: Router,
		private commonService:CommonService
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.service.getVendors();
		this.service.vendors.subscribe((data) => {
			this.Vendors = data;
			console.log(data);
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.commonService.loading.next(true);
		this.service.deleteVendor(event.id).subscribe(() => {
			this.service.getVendors();
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/vendor/action/edit/${event.id}`);
	};
}
