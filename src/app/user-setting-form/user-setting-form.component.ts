import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
  
import { UserSetting } from './userSeting';
import { UserSetingService } from './UserSetting.service';

@Component({
  templateUrl: './user-setting-form.component.html',
  styleUrls: ['./user-setting-form.component.css'],
})
export class UserSettingFormComponent implements OnInit {
  constructor(private userSetingServices: UserSetingService) {}

  ngOnInit(): void {}

  originalUserSeting: UserSetting = {
    Name: 'Abdallah Saeed',
    Email: 'abdallah@gmail.com',
    Password: '123456789',
    Address: 'address 1',
    Address2: 'address 2',
    City: 'Egypt',
    State: 'State2',
    Zip: 'z123456',
    Check: true,
    UserInterfaceStyle: 'Dark',
    Notes: 'test note test note',
  };

  UserSeting: UserSetting = { ...this.originalUserSeting };

  onSubmit(form: NgForm) {
    console.log('form is submited ,', form.valid);
    console.log(form);
    this.userSetingServices.postUserSettingsForm(this.UserSeting).subscribe(
      result=> {
        console.log('success :', result)
      },
      error=> {
        console.error(error);
      }
    )
  }
  onblur(model: NgModel) {
    console.log(model.name + ' ', model.valid);
  }
}
