import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import { ConfigService } from './config.service';
import { TrialService } from './trial.service';

import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

import * as Classes from '../classes/classes';



import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class PPService {

  backEndServer: string;
  port = ':3000/';
  protocol = 'http://';

  fileUploadPath: string;

  // save WF data variables

  database: Classes.ApplicationDatabase;
  req_save_WFData: boolean;
  experiment_data_writing: boolean;
  saving_to_backEnd: boolean;

  constructor(
    public http: HttpClient,
    public http_old: Http,
    public configService: ConfigService,
    public trialService: TrialService,
  ) {

    if (environment.production) {

      this.backEndServer = location.host;

    } else {

      this.backEndServer = '146.185.150.183';
    }

  }


  saveDatabaseToLS(database: Classes.ApplicationDatabase) {

    const database_to_save = new Classes.ApplicationDatabase(database);
    database_to_save.last_modified = Date.now();

    try {

      localStorage.setItem(this.trialService.database_ls, JSON.stringify(database_to_save));

    } catch (err) {

    }

  }

}




