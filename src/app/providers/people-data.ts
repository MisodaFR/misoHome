import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class PeopleData {
  data: any;

  constructor(public http: HttpClient, public user: UserData) {}

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get('assets/data/people.json')
        .pipe(map(this.processData, this));
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data;
    return this.data;

  }

  getPeople() {
    return this.load().pipe(
      map((data: any) => {
        return data.people.sort((a: any, b: any) => {
          const aName = a.name.split(' ').pop();
          const bName = b.name.split(' ').pop();
          return aName.localeCompare(bName);
        });
      })
    );

  }
}
