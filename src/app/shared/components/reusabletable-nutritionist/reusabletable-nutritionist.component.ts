import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from '../../../interfaces/auth';

@Component({
  selector: 'app-reusabletable-nutritionist',
  templateUrl: './reusabletable-nutritionist.component.html',
  styleUrl: './reusabletable-nutritionist.component.css'
})
export class ReusabletableNutritionistComponent {
  @Input() rows: Appointment[] = [];
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 2;

  @Output() edit = new EventEmitter<Appointment>();
  @Output() delete = new EventEmitter<string>();
  
  onEdit(row: Appointment) {
    this.edit.emit(row);  // Emits the Appointment object
  }
  
  onDelete(row: Appointment) {
    this.delete.emit(row._id);  // Emits the Appointment ID (string)
  }

}
