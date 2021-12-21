import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserSettingFormComponent } from './user-setting-form.component';
import { RouterModule } from '@angular/router';
const routers = [
  { path: "UserSetting" , component: UserSettingFormComponent },
];

@NgModule({
  declarations: [UserSettingFormComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routers)],
})
export class UserSettingFormModule {

  
}
