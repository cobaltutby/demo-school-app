import { Component, OnInit, OnDestroy, EventEmitter, QueryList, ViewChildren, AfterViewInit, group } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { EditGroupComponent } from '../edit-group/edit-group.component';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

import * as Services from '../../services/services';
import * as Classes from '../../classes/classes';

@Component({
  selector: 'app-demo-app',
  templateUrl: './demo-app.component.html',
  styleUrls: ['./demo-app.component.css']
})
export class DemoAppComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns_groups = ['group_id', 'group_name', 'gr_creation_time', 'members_qty'];


  groupDatabase: Classes.GroupDatabase;

  groupDataSource: Classes.GroupDataSource | null;

  constructor(

    public route: ActivatedRoute,  // angular routing
    public router: Router,  // angular navigation
    public trialService: Services.TrialService, // application cross component data exchange and common service functions
    public ppService: Services.PPService, // communication with Pipeline Pilot Server
    public configService: Services.ConfigService, // global vars
    public http: HttpClient,
    public dialog: MdDialog
  ) {

  }

  ngOnInit() {

    this.trialService.student_to_edit = null;
    this.trialService.group_to_edit = null;

    this.groupDatabase = new Classes.GroupDatabase(this.trialService.database);
    this.groupDatabase.dataChange.subscribe(res => {
      this.groupDatabaseChanged();
    });

  }

  ngAfterViewInit() {


    setTimeout(() => {
      // this.studentDataSource = new Classes.StudentDataSource(this.studentDatabase);
      this.groupDataSource = new Classes.GroupDataSource(this.groupDatabase);
    }, 0)

  }


  ngOnDestroy() {

    this.groupDatabase.dataChange.unsubscribe();

  }

  groupDatabaseChanged() {

    this.trialService.database.group_list = this.groupDatabase.data;
    this.ppService.saveDatabaseToLS(this.trialService.database);

  }



  editGroup(row: Classes.Group) {

    const unavailable_name: string[] = [];
    this.groupDatabase.data.forEach(group_in_database => {
      if (group_in_database.group_id !== row.group_id) {
        unavailable_name.push(group_in_database.group_name)
      }

    });

    const dialogRef = this.dialog.open(EditGroupComponent, {
      width: '700px'
    });

    dialogRef.componentInstance.group_to_edit = row;
    dialogRef.componentInstance.unavailable_name = unavailable_name;

    dialogRef.afterClosed().subscribe(group => {
      row.group_name = group.group_name;
    });

  }


  deleteGroup(group: Classes.Group) {

    this.groupDatabase.deleteRow(group);

  }

  addNewGroup() {

    const unavailable_name: string[] = [];

    const group_to_add = new Classes.Group;

    this.groupDatabase.data.forEach(group_in_database => {
      unavailable_name.push(group_in_database.group_name)
    });

    const dialogRef = this.dialog.open(EditGroupComponent, {
      width: '700px'
    });

    dialogRef.componentInstance.group_to_edit = group_to_add;
    dialogRef.componentInstance.unavailable_name = unavailable_name;

    dialogRef.afterClosed().subscribe(group => {
      const new_group = new Classes.Group(group);
      if (new_group.group_name) {
        this.groupDatabase.addRow(new_group);
      }

    });

  }

  displayGroupMembers(group_id: number) {
    if (group_id > 0) {
      this.router.navigate(['DisplayGroupStudents', group_id]);
    }
  }

}













