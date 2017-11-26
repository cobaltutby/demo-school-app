import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


import * as Services from '../../services/services';
import * as Classes from '../../classes/classes';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  student_to_edit: Classes.Student;
  tmp_student: Classes.Student;
  edit: boolean;


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);



  constructor(
    public dialogRef: MatDialogRef<EditStudentComponent>,
    public trialService: Services.TrialService,
  ) {
  }
  ngOnInit() {
    this.tmp_student = new Classes.Student(this.student_to_edit);
    this.tmp_student.first_name ? this.edit = true : this.edit = false;
  }

  save() {
    this.dialogRef.close(this.student_to_edit);
  }
  cancel() {
    this.dialogRef.close(this.tmp_student);
  }

}
