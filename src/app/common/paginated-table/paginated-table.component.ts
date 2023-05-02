import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css']
})
export class PaginatedTableComponent {
  @Input() tableData!: any[];
  @Input() tableColOrder = 'originalOrder';

  @Input() loading = true;

  @Output() rowSelected: EventEmitter<any> = new EventEmitter();

  @Output() headerSelected: EventEmitter<any> = new EventEmitter();

  @ContentChild('headers') headers: TemplateRef<any> | undefined;
  @ContentChild('rows') rows: TemplateRef<any> | undefined;

  @ContentChild('empty') empty: TemplateRef<any> | undefined;

  @ContentChild('load') load: TemplateRef<any> | undefined;

// Preserve original property order
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>, c: any): any => {
   // just reload the thing for now!
    return 0;
  }

// Order by ascending property value
  valueAscOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.value.localeCompare(b.value);
  }

// Order by descending property key
  keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  get colOrder(): any {
    if (this.tableColOrder === 'valueAscOrder') {
      return this.valueAscOrder;
    } else if (this.tableColOrder === 'keyDescOrder') {
      return this.keyDescOrder;
    } else if (this.tableColOrder === 'originalOrder') {
      return this.originalOrder;
    }
    return this.originalOrder;
  }

  /**
   * Hey, a row has been clicked
   * @param row
   */
  rowClick(row: any): void {
    this.rowSelected.emit(row);
  }

  headerSelect($event: MouseEvent) {
    this.headerSelected.emit($event);
  }
}
