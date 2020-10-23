import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard, AdminGuard]
  },
  {
    path: 'clinic',
    loadChildren: () => import('./clinic/clinic.module').then(m => m.ClinicModule),
    canLoad: [AuthGuard]
  },
	{ path: '**',  component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
