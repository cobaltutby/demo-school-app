import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';
import { EditStudentComponent } from '../edit-student/edit-student.component';

import * as Services from '../../services/services';
import * as Classes from '../../classes/classes';

@Component({
  selector: 'app-display-group-students',
  templateUrl: './display-group-students.component.html',
  styleUrls: ['./display-group-students.component.css']
})
export class DisplayGroupStudentsComponent implements OnInit, OnDestroy {

  group_id: number;
  displayedColumns_students = ['student_nr', 'first_name', 'second_name', 'third_name', 'email'];
  studentDatabase: Classes.StudentDatabase;
  studentDataSource: Classes.StudentDataSource | null;

  groupDatabase: Classes.GroupDatabase;

  constructor(

    public route: ActivatedRoute,
    public router: Router,
    public trialService: Services.TrialService,
    public ppService: Services.PPService,
    public dialog: MdDialog

  ) {
    this.group_id = 0;
  }

  ngOnInit() {

    this.getRouteParams();

    this.groupDatabase = new Classes.GroupDatabase(this.trialService.database);
    this.groupDatabase.dataChange.subscribe(res => {
      this.groupDatabaseChanged();
    });
  }

  ngOnDestroy() {

    this.studentDatabase.dataChange.unsubscribe();
  }

  getRouteParams() {

    this.route.params
      .subscribe(params => {
        this.group_id = Number(params['group_id']);
        if (this.group_id <= 0) {
          this.router.navigate(['']);
        } else {
          this.getLocalData();
        }
      });

  }


  getLocalData() {

    this.studentDatabase = new Classes.StudentDatabase(this.trialService.database);
    this.studentDatabase.dataChange.subscribe(res => {
      this.studentDatabaseChanged();
    });
    this.studentDataSource = new Classes.StudentDataSource(this.studentDatabase, this.group_id);

  }

  studentDatabaseChanged() {

    this.trialService.database.student_list = this.studentDatabase.data;
    this.ppService.saveDatabaseToLS(this.trialService.database);

  }


  deleteStudent(row: Classes.Student) {

    this.studentDatabase.deleteRow(row);
    this.groupDatabase.setMembers(this.group_id, this.getMembers(this.group_id));

  }

  getMembers(group_id: number) {

    let members = 0;
    this.studentDatabase.data.forEach(student => {
      if (student.group_id === group_id) {
        members++;
      }
    });
    return members;
  }


  addNewStudent() {

    const student_to_edit = new Classes.Student;
    student_to_edit.group_id = this.group_id;
    const current_group = this.trialService.database.group_list.find(group => { return group.group_id === this.group_id });

    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '700px'
    });

    dialogRef.componentInstance.student_to_edit = student_to_edit;

    dialogRef.afterClosed().subscribe(student => {
      const student_to_add = new Classes.Student(student);
      if (student_to_add.first_name) {
        this.studentDatabase.addRow(student_to_add);
        this.groupDatabase.setMembers(this.group_id, this.getMembers(this.group_id));
      }
    });

  }


  returnToGroupsList() {

    this.router.navigate(['SchoolApp']);

  }



  editStudent(row: Classes.Student) {

    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '700px'
    });

    dialogRef.componentInstance.student_to_edit = row;

    dialogRef.afterClosed().subscribe(student => {
      row.first_name = student.first_name;
      row.second_name = student.second_name;
      row.third_name = student.third_name;
      row.email = student.email;
    });

  }

  groupDatabaseChanged() {

    this.trialService.database.group_list = this.groupDatabase.data;
    this.ppService.saveDatabaseToLS(this.trialService.database);

  }

}

