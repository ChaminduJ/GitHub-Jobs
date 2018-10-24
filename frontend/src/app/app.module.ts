import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { ReactiveFormsModule } from "@angular/forms";

import { MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatTableModule, MatDividerModule, MatSnackBarModule} from '@angular/material';

import { AppComponent } from './app.component';
import { JobService } from './job.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent},
  { path: 'login', component: LoginComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'list', component: ListComponent},
  { path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  declarations: [AppComponent, ListComponent, CreateComponent, EditComponent, LoginComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [JobService],
  bootstrap: [AppComponent]
})
export class AppModule {}
