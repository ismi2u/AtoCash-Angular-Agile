import { RoleGuard } from './../../guards/role.guard';
import { LayoutComponent } from "./layout.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "cost-center",
        loadChildren: () =>
          import("../cost-center/cost-center.module").then(
            (m) => m.CostCenterModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
      ,canActivate:[RoleGuard]
      },
      {
        path: "approval-group",
        loadChildren: () =>
          import("../approval-group/approval-group.module").then(
            (m) => m.ApprovalGroupModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "approval-level",
        loadChildren: () =>
          import("../approval-level/approval-level.module").then(
            (m) => m.ApprovalLevelModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "approval-role-map",
        loadChildren: () =>
          import("../approval-role-map/approval-role-map.module").then(
            (m) => m.ApprovalRoleMapModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "approval-status",
        loadChildren: () =>
          import("../approval-status/approval-status.module").then(
            (m) => m.ApprovalStatusModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "department",
        loadChildren: () =>
          import("../department/department.module").then(
            (m) => m.DepartmentModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "business-type",
        loadChildren: () =>
          import("../business-type/business-type.module").then(
            (m) => m.BusinessTypeModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "business-unit",
        loadChildren: () =>
          import("../business-unit/business-unit.module").then(
            (m) => m.BusinessUnitModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "businessarea",
        loadChildren: () =>
          import("../businessArea/businessArea.module").then(
            (m) => m.BusinessAreaModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "general-ledger",
        loadChildren: () =>
          import("../general-ledger/general-ledger.module").then(
            (m) => m.GeneralLedgerModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "employment-type",
        loadChildren: () =>
          import("../employment-type/employment-type.module").then(
            (m) => m.EmploymentTypeModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "role",
        loadChildren: () =>
          import("../role/role.module").then((m) => m.RoleModule),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "expense-category",
        loadChildren: () =>
          import("../expense-category/expense-category.module").then(
            (m) => m.ExpenseCategoryModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "expense-type",
        loadChildren: () =>
          import("../expense-type/expense-type.module").then(
            (m) => m.ExpenseTypeModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "bank",
        loadChildren: () =>
          import("../bank/bank.module").then(
            (m) => m.BankModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "location",
        loadChildren: () =>
          import("../location/location.module").then(
            (m) => m.LocationModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "vat-rate",
        loadChildren: () =>
          import("../vat-rate/vat-rate.module").then(
            (m) => m.VATRateModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "employee",
        loadChildren: () =>
          import("../employee/employee.module").then((m) => m.EmployeeModule),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "employee-extended-info",
        loadChildren: () =>
          import("../employee-extended-info/employee-extended-info.module").then((m) => m.EmployeeExtendedInfoModule),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "project",
        loadChildren: () =>
          import("../project/project.module").then((m) => m.ProjectModule),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "sub-project",
        loadChildren: () =>
          import("../sub-project/sub-project.module").then(
            (m) => m.SubProjectModule
          ),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "task",
        loadChildren: () =>
          import("../task/task.module").then((m) => m.TaskModule),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "cash-advance",
        loadChildren: () =>
          import("../cash-advance/cash-advance.module").then((m) => m.CashAdvanceModule),
          data:{
            allowedRoles:['Admin','Finmgr','User','Manager']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "travel-request",
        loadChildren: () =>
          import("../travel-request/travel-request.module").then((m) => m.TravelRequestModule),
          data:{
            allowedRoles:['Admin','Finmgr','User','Manager']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "inbox",
        loadChildren: () =>
          import("../inbox/inbox.module").then((m) => m.InboxModule),
          data:{
            allowedRoles:['Admin','Finmgr','Manager']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "user",
        loadChildren: () =>
          import("../user/user.module").then((m) => m.UserModule),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]

      },
      {
        path: "user-role",
        loadChildren: () =>
          import("../user-role/user-role.module").then((m) => m.UserRoleModule),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          },canActivate:[RoleGuard]
      },
      {
        path: "assign-role",
        loadChildren: () =>
          import("../assign-role/assign-role.module").then((m) => m.AssignRoleModule),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "assign-project",
        loadChildren: () =>
          import("../assign-project/assign-project.module").then((m) => m.AssignProjectModule),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "expense-reimburse",
        loadChildren: () =>
          import("../expense-reimburse-request/expense-reimburse-request.module").then((m) => m.ExpenseReimburseRequestModule),
          data:{
            allowedRoles:['Admin','Finmgr','User','Manager']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "status",
        loadChildren: () =>
          import("../status/status.module").then((m) => m.StatusModule),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "currency",
        loadChildren: () =>
          import("../currency/currency.module").then((m) => m.CurrencyModule),
          data:{
            allowedRoles:['Admin','AtominosAdmin']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("../dashboard/dashboard.module").then((m) => m.DashboardModule),
          data:{
            allowedRoles:['Admin','Finmgr','User','Manager']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "reports",
        loadChildren: () =>
          import("../reports/reports.module").then((m) => m.ReportsModule),
          data:{
            allowedRoles:['Admin','Finmgr','User','Manager']
          }
          ,canActivate:[RoleGuard]
      },
      {
        path: "disburse",
        loadChildren: () =>
          import("../disburse/disburse.module").then((m) => m.DisburseModule),
          data:{
            allowedRoles:['AccPayable']
          }
          ,canActivate:[RoleGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
