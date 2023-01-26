import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpenseTypesService } from 'src/app/services/expense-types.service';
import { ExpenseCategoriesService } from 'src/app/services/expense-categories.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  @Input() requestDetails;
  @Input() requestApprovalProcess;
  @Input() requestType = 'cashAdvance';
  @Input() disableStatusFlow = false;
  @Input() disableRequestDetails = false;
  @Input() disableDocumentsView = true;
  @Input() documents = [];
  @Output() onDisburseDetailsUpdate =  new EventEmitter();

  expenses = [];
  expenseCategories = [];

  constructor(private expenseCategoriesService: ExpenseCategoriesService, private expenseTypeService: ExpenseTypesService, private translate:TranslateService, public commonService: CommonService) {}

  ngOnInit(): void {
    if (this.requestType == 'expense') {
      this.expenseTypeService.expenseTypes.subscribe(data=>{
        this.expenses =  data;
      })

      this.expenseCategoriesService.expenseCategories.subscribe(data=>{
        this.expenseCategories =  data;
      })

    }
  }

  getDocumentName(document) {
    return document.split('_')[1]
  } 

  getDocumentUrl(document) {
    return `${this.commonService.getApi()}${document}`
  }

  getExpenseName(id) {
    return this.expenses.filter(expense=>expense.id == id)[0].expenseTypeName
  }

  getExpenseCategoryName(id) {
    return this.expenseCategories.filter(expenseCategories=>expenseCategories.id == id)[0].expenseCategoryName
  }

  getTitle() {
    return this.requestType === 'expense' ? this.translate.instant('heading.expenseDetails')  : this.translate.instant('heading.requestDetails');
  }
  updateRequestDetails(event) {
    this.onDisburseDetailsUpdate.emit(event)
  }
  
}
