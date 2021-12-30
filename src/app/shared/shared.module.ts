import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertToSpacesPipe } from './convert-to-space.pipe';
import { StarComponent } from './star.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CriteriaComponent } from './criteria/criteria.component';

 
 
@NgModule({
  declarations: [
    ConvertToSpacesPipe,
    StarComponent,
    CriteriaComponent,
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConvertToSpacesPipe,
    StarComponent,

    CriteriaComponent,
    
  ]
})
export class SharedModule { }
