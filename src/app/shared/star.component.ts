import { Component, OnChanges, Input, Output , EventEmitter } from '@angular/core';
 

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['star.component.css'],
})
export class StarComponent implements OnChanges {
  ngOnChanges(): void {
    this.starWidth = (this.rating * 75) / 5;
  }

 @Output()
 ratingClicked : EventEmitter<string>  = new EventEmitter<string>();

  starWidth: number = 75;

  @Input()
  rating!: number;

  onClick(): void {
    this.ratingClicked.emit(`the Rating  ${this.rating}  was Clicked ! `);
  }
}
