import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// database tools

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';


export class Student {

  student_id: number;
  student_nr: number;
  first_name: string;
  second_name: string;
  third_name: string;
  group_id: number;
  email: string;

  constructor(obj?: any) {

    this.student_id = Number(_get('student_id', obj));
    this.student_nr = Number(_get('student_nr', obj));
    this.first_name = _get('first_name', obj);
    this.second_name = _get('second_name', obj);
    this.third_name = _get('third_name', obj);
    this.group_id = Number(_get('group_id', obj));
    this.email = _get('email', obj);

  }

}

export class Group {

  group_id: number;
  group_name: string;
  gr_creation_time: Date;
  members_qty: number;

  constructor(obj?: any) {

    this.group_id = Number(_get('group_id', obj));
    this.group_name = _get('group_name', obj);
    this.gr_creation_time = new Date(_get('gr_creation_time', obj) || Date.now());
    this.members_qty = Number(_get('members_qty', obj));

  }

}

export class ApplicationDatabase {

  last_modified: number;
  student_list: Student[];
  group_list: Group[];

  constructor(obj?: any) {

    this.last_modified = Number(_get('last_modified', obj));
    this.student_list = _getArray('student_list', obj).map(element => new Student(element));
    this.group_list = _getArray('group_list', obj).map(element => new Group(element));

  }

}


function _get(name: string, obj: any) {

  return (obj !== undefined && obj !== null && obj[name] !== undefined && (obj[name] !== null)) ? obj[name] : null;

}

function _getArray(name: string, obj: any) {

  return (obj !== undefined && obj !== null && obj[name] !== undefined && (obj[name] !== null)) ? obj[name] : [];

}

export class StudentDatabase {

  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  get data(): Student[] { return this.dataChange.value; }

  constructor(applicationDatabase: ApplicationDatabase) {

    applicationDatabase.student_list.forEach(student => {
      this.addRow(student);
    });
  }

  addRow(student: Student) {
    const copiedData = this.data.slice();
    copiedData.push(student);
    this.updateIDs(copiedData);
    this.updateStudentNr(copiedData, student.group_id);
    this.dataChange.next(copiedData);
  }

  deleteRow(student: Student) {

    const copiedData = this.data.slice();
    let index_to_delete = -1;
    copiedData.forEach((element, index) => {
      if (element === student) {
        index_to_delete = index;
        return;
      }
    });
    if (index_to_delete > -1) {
      copiedData.splice(index_to_delete, 1);
      this.updateIDs(copiedData);
      this.updateStudentNr(copiedData, student.group_id);
      this.dataChange.next(copiedData);
    }

  }

  updateIDs(copiedData: Student[]) {
    copiedData.forEach((element, index) => {
      element.student_id = index + 1;
    });
  }

  updateStudentNr(copiedData: Student[], group_id: number) {
    let student_nr = 0;
    copiedData.forEach((element, index) => {
      if (element.group_id === group_id) {
        student_nr++;
        element.student_nr = student_nr;
      }
    });
  }
}
export class GroupDatabase {

  dataChange: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);
  get data(): Group[] { return this.dataChange.value; }

  constructor(applicationDatabase: ApplicationDatabase) {

    applicationDatabase.group_list.forEach(group => {
      this.addRow(group);
    });
  }

  addRow(group: Group) {
    const copiedData = this.data.slice();
    copiedData.push(group);
    this.updateIDs(copiedData);
    this.dataChange.next(copiedData);
  }

  deleteRow(group: Group) {

    const copiedData = this.data.slice();
    let index_to_delete = -1;
    copiedData.forEach((element, index) => {
      if (element === group) {
        index_to_delete = index;
        return;
      }
    });
    if (index_to_delete > -1) {
      copiedData.splice(index_to_delete, 1);
      this.updateIDs(copiedData);
      this.dataChange.next(copiedData);
    }
  }

  updateIDs(copiedData: Group[]) {
    copiedData.forEach((element, index) => {
      element.group_id = index + 1;
    });

  }


  setMembers(group_id: number, members: number) {
    const copiedData = this.data.slice();

    const group_to_update = copiedData.find(group => { return group.group_id === group_id });
    if (group_to_update.group_id) {
      group_to_update.members_qty = members;
      this.dataChange.next(copiedData);
    }
  }
}
export class StudentDataSource extends DataSource<any> {
  constructor(private _database: StudentDatabase, public _selected_group_id: number) {
    super();
  }

  connect(): Observable<Student[]> {
    const displayDataChanges = [
      this._database.dataChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData(this._selected_group_id);
    });
  }

  disconnect() { }

  getSortedData(selected_group_id: number): Student[] {
    const data = this._database.data.slice();
    return data.filter(element => {
      return element.group_id === this._selected_group_id;
    });
  }
}
export class GroupDataSource extends DataSource<any> {
  constructor(private _database: GroupDatabase) {
    super();
  }

  connect(): Observable<Group[]> {
    const displayDataChanges = [
      this._database.dataChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() { }

  /** Returns a sorted copy of the database data. */
  getSortedData(): Group[] {
    const data = this._database.data.slice();
    return data;
  }
}

