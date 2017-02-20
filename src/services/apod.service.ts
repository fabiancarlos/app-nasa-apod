import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import * as moment from 'moment';

@Injectable()
export class ApodService {
  private apiUrl = 'https://api.nasa.gov/planetary/apod';
  private apiKey = 'TdMjbXv6dJVYNJ1c51TV7zjHd9RzVN1ZHkFqm0bK';
  public today: string = moment().format('YYYY[-]MM[-]DD');

	constructor(private http: Http){
		this.http = http;
	}

	findByDate(date: string = ''){
    const urlWithParam = `${this.apiUrl}?api_key=${this.apiKey}&date=${date ? date : this.today}`;

    return this.http.get(urlWithParam)
            .map(res => res.json())
            .catch(this.handleError);
	}

	private handleError(error: any): any{
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
	}
}
