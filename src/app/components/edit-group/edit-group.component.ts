import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import * as Services from '../../services/services';
import * as Classes from '../../classes/classes';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  group_to_edit: Classes.Group;
  unavailable_name: string[];
  tmp_group: Classes.Group;
  edit: boolean;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);



  constructor(
    public dialogRef: MatDialogRef<EditGroupComponent>,
    public trialService: Services.TrialService,
  ) {
  }

  ngOnInit() {
    this.tmp_group = new Classes.Group(this.group_to_edit);
    this.tmp_group.group_name ? this.edit = true : this.edit = false;
  }

  save() {
    this.dialogRef.close(this.group_to_edit);
  }

  cancel() {
    this.dialogRef.close(this.tmp_group);
  }

  validateName(name: string) {

    let validated = false;
    if (name && this.unavailable_name && this.unavailable_name.length > 0) {
      validated = this.unavailable_name.some(element => { return element === name });
    }
    return !validated;
  }

}