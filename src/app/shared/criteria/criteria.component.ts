import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css'],
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  //--- inputs
  @Input()
  displayDetails!: boolean;

  @Input()
  hitCount!: number | undefined;

  hitMessage!: string;

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  private _listFilter!: string;

   
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  @ViewChild('filterElement')
  filterElementref!: ElementRef;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No Match Found !';
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount;
    }
  }

  ngAfterViewInit(): void {
    this.filterElementref.nativeElement.focus();
    console.log(this.filterElementref);
  }

  ngOnInit(): void {}
}
