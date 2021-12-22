import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { State } from './State';
import { UserSetting } from './userSeting';

@Injectable({
  providedIn: 'root',
})
export class UserSetingService {
  constructor() {}

  postUserSettingsForm(userSeting: UserSetting): Observable<UserSetting> {
    return of(userSeting);
  }

  getStates(): Observable<State[]> {
    return of(
      [
        {id:"State1" , name:"State 1"},
        {id:"State2" , name:"State 2"},
        {id:"State3" , name:"State 3"},
        {id:"State4" , name:"State 4"},
    
      ]
    
    )
  }
}
