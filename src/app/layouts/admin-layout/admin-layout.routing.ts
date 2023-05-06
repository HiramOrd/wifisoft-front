import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { AuthenticationGuard } from "src/app/_guards/auth.guard";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "tables",
    component: TablesComponent,
    canActivate: [AuthenticationGuard],
  },
];
