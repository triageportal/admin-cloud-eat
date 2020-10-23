import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TriModalComponent } from './modals/tri-modal/tri-modal.component';
import { LogoutModalComponent } from './modals/logout-modal/logout-modal.component';
import { LoaderComponent } from './modals/loader/loader.component';
import { BannerComponent } from './modals/banner/banner.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      PageNotFoundComponent,
      TriModalComponent,
      LogoutModalComponent,
      LoaderComponent,
      BannerComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
