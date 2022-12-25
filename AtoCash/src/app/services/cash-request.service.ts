import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class CashRequestService {
  cashRequests = new BehaviorSubject([]);
  pendingCashRequest = new BehaviorSubject([]);

  constructor(private http: HttpClient, private commonService:CommonService) {}

  getCashRequests = (id:any) => {
    this.http
      .get(`${this.commonService.getApi()}/api/CashAdvanceRequests/GetCashAdvanceRequestRaisedForEmployee/${id}`)
      .subscribe((response: any) => {
        this.cashRequests.next(response.data);
      });
  };


  geCashRequestById = (id: any) =>
    this.http.get(
      `${this.commonService.getApi()}/api/CashAdvanceRequests/GetCashAdvanceRequest/${id}`
    );

  updateCashRequestById = (id: any, data: any) =>
    this.http.put(
      `${this.commonService.getApi()}/api/CashAdvanceRequests/PutCashAdvanceRequest/${id}`,
      data
    );

  addCashRequest = (data: any) =>
    this.http.post(
      `${this.commonService.getApi()}/api/CashAdvanceRequests/PostCashAdvanceRequest`,
      data
    );

  deleteCashRequest = (id: any) =>
    this.http.delete(
      `${this.commonService.getApi()}/api/CashAdvanceRequests/DeleteCashAdvanceRequest/${id}`,
      {}
    );

  getPendingCashRequests = (id: any) =>
    this.http
      .get(
        `${this.commonService.getApi()}/api/CashAdvanceRequests/ApprovalsPendingRaisedByEmployee/${id}`
      )
      .subscribe((response: any) => {
        this.pendingCashRequest.next(response.data);
      });

  geCashRequestCount = (id: any) =>
    this.http.get(
      `${this.commonService.getApi()}/api/CashAdvanceRequests/CountAllCashAdvanceRequestRaisedByEmployee/${id}`
    );



}
