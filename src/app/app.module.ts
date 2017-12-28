import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// only libraries
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// only components
import { AppComponent } from './app.component';
import { CollaboratorSigninComponent } from './content/collaborator/collaborator-signin/collaborator-signin.component';
import { DashboardIndexComponent } from './content/dashboard/dashboard-index/dashboard-index.component';
import { HomeIndexComponent } from './content/home/home-index/home-index.component';

// only services
import { AuthService } from './core/service/auth.service';
import { AuthGuard } from './core/guard/auth.guard';
import { FooterComponent } from './content/components/footer/footer.component';
import { NavbarComponent } from './content/components/navbar/navbar.component';
import { SidebarComponent } from './content/components/sidebar/sidebar.component';
import { DashboardTeacherComponent } from './content/dashboard/dashboard-teacher/dashboard-teacher.component';
import { DataService } from './core/service/data.service';
import { DocPipe } from './core/pipe/doc.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CollaboratorSigninComponent,
    DashboardIndexComponent,
    HomeIndexComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardTeacherComponent,
    DocPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDBmwyCqcSs1WcPZgccYpofj57MZL9eUeo',
      authDomain: 'mywawita.firebaseapp.com',
      databaseURL: 'https://mywawita.firebaseio.com',
      projectId: 'mywawita',
      storageBucket: 'mywawita.appspot.com',
      messagingSenderId: '851093415042'
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: CollaboratorSigninComponent},
      {path: 'home', component: HomeIndexComponent, canActivate: [AuthGuard] , children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardIndexComponent},
        { path: 'teacher', component: DashboardTeacherComponent}
      ]}
    ])
  ],
  providers: [AuthService, AuthGuard, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
