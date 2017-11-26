import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; // old http
import { HttpClientModule } from '@angular/common/http'; // new http
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdNativeDateModule } from '@angular/material';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdFormFieldModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  MdStepperModule,
} from '@angular/material';


import { AppRoutingModule } from './routing/app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { TrialService } from './services/trial.service';
import { PPService } from './services/pp.service';
import { ConfigService } from './services/config.service';
import { DemoAppComponent } from './components/demo-app/demo-app.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { DisplayGroupStudentsComponent } from './components/display-group-students/display-group-students.component';


// pipes

import { DateTime } from './pipes/date-time';




@NgModule({
  declarations: [

    // common

    AppComponent,
    HeaderComponent,
    DemoAppComponent,
    EditGroupComponent,
    EditStudentComponent,
    DisplayGroupStudentsComponent,

    // pipes

    DateTime,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // material
    MdNativeDateModule,
    // MdAutocompleteModule,
    MdButtonModule,
    // MdButtonToggleModule,
    MdCardModule,
    // MdCheckboxModule,
    // MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    // MdExpansionModule,
    MdFormFieldModule,
    // MdGridListModule,
    MdIconModule,
    MdInputModule,
    // MdListModule,
    // MdMenuModule,
    // MdPaginatorModule,
    // MdProgressBarModule,
    // MdProgressSpinnerModule,
    MdRadioModule,
    MdSelectModule,
    // MdSidenavModule,
    // MdSliderModule,
    // MdSlideToggleModule,
    // MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    // MdToolbarModule,
    MdTooltipModule,
    // MdStepperModule,

    AppRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    EditStudentComponent,
    EditGroupComponent
  ],
  providers: [
    TrialService,
    PPService,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

