import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ExpenseCategoriesService } from 'src/app/services/expense-categories.service';

@Component({
	selector: 'app-expense-category-list',
	templateUrl: './expense-category-list.component.html',
	styleUrls: ['./expense-category-list.component.scss'],
})
export class ExpenseCategoryListComponent implements OnInit {
	ExpenseCategory: any;
	ExpenseCategoriesHeaders: any = [
		'tableHeader.expenseCategory.expenseCategoryName',
		'tableHeader.expenseCategory.expenseCategoryDesc',
		'tableHeader.expenseCategory.status',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private expenseCategoriesService: ExpenseCategoriesService,
		private router: Router,
		private commonService: CommonService,
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.expenseCategoriesService.getExpenseCategories();
		this.expenseCategoriesService.expenseCategories.subscribe((data) => {
			this.ExpenseCategory = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.commonService.loading.next(true);
		this.expenseCategoriesService.deleteExpenseCategory(event.id).subscribe(() => {
			this.expenseCategoriesService.getExpenseCategories();
			this.commonService.loading.next(false);
		});
	};
	

	editRecord = (event) => {
		this.router.navigateByUrl(`/expense-category/action/edit/${event.id}`);
	};
}
