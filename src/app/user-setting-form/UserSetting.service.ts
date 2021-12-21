import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSetting } from './userSeting';

@Injectable({
  providedIn: 'root',
})
export class UserSetingService {
  constructor() {}

  postUserSettingsForm(userSeting: UserSetting): Observable<UserSetting> {
    return of(userSeting);
  }
}
