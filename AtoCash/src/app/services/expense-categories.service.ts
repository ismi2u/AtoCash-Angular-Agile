import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ExpenseCategoriesService {
	expenseCategories = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getExpenseCategories = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/ExpenseCategories/GetExpenseCategories`)
			.subscribe((response: any) => {
				this.expenseCategories.next(response.data);
				this.commonService.loading.next(false);
			});
	};

	getExpenseCategoriesList = () => {
		return this.http.get(
			`${this.commonService.getApi()}/api/ExpenseCategories/ExpenseCategoriesForDropdown`,
		);
	};

	getExpenseCategoriesListSelected = (isBussCategory:any) => {
		return this.http.get(
			`${this.commonService.getApi()}/api/ExpenseCategories/GetSelectedExpenseCategoriesForDropdown?isBussCategory=${isBussCategory}`,
		);
	};


	getExpenseCategoryById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/ExpenseCategories/GetExpenseCategory/${id}`);

	updateExpenseCategoryById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/ExpenseCategories/PutExpenseCategory/${id}`,
			data,
		);

	addExpenseCategory = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/ExpenseCategories/PostExpenseCategory`, data);

	deleteExpenseCategory = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/ExpenseCategories/DeleteExpenseCategory/${id}`,
			{},
		);
}
