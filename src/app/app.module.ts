import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NearbyComponent } from './nearby/nearby.component';
import { GroupsComponent } from './groups/groups.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'nearby', component: NearbyComponent },
  { path: '', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NearbyComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
