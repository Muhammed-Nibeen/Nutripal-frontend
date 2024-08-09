import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrl: './reusable-table.component.css'
})
export class ReusableTableComponent {

  @Input() tableData: any[] = [];
  @Input() tableColumns: { field: string, header: string }[] = [];
  @Input() actions: { label: string, action: (row: any) => void, class: string }[] = [];

  resolveField(obj: any, path: string) {
    return path.split('.').reduce((o, p) => o && o[p], obj);
  }
}
