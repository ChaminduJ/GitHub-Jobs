import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule, AlertModule, CollapseModule } from "ngx-bootstrap";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from "ng2-search-filter"; 
import { Ng2OrderModule } from "ng2-order-pipe";

import { MatSnackBarModule} from '@angular/material';

import { AppComponent } from './app.component';
import { JobService } from './job.service';
import { AdminService } from './admin.service';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "create", component: CreateComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "edit/:id", component: EditComponent, canActivate: [AuthGuard] },
  { path: "list", component: ListComponent },
  { path: "", redirectTo: "list", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  providers: [AuthGuard, AdminService, JobService],
  bootstrap: [AppComponent]
})
export class AppModule {}
