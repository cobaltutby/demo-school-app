import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { HttpClient } from '@angular/common/http';

import * as Services from '../../services/services';
import * as Classes from '../../classes/classes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  database: Classes.ApplicationDatabase;
  // database_from_backend: Classes.ApplicationDatabase;
  database_from_LS: Classes.ApplicationDatabase;

  constructor(
    public trialService: Services.TrialService,
    public route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public ppService: Services.PPService,
    public configService: Services.ConfigService,
    public dialog: MdDialog
  ) {
    this.trialService.database = new Classes.ApplicationDatabase;
  }

  ngOnInit() {
    this.loadUserData();

  }

  ngOnDestroy() {

  }


  loadUserData() {

    this.database_from_LS = new Classes.ApplicationDatabase(JSON.parse(localStorage.getItem(this.trialService.database_ls)));

    if (this.database_from_LS.last_modified) {
      this.trialService.database = new Classes.ApplicationDatabase(this.database_from_LS);
    } else {
      this.trialService.database = new Classes.ApplicationDatabase;
    }

    this.router.navigate(['SchoolApp']);

  }

}
