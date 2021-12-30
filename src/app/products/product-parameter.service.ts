import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductParameterService {

  //// property Bag
  showImage!:boolean;
  filterBy!:string;
  
  constructor() { }
}
