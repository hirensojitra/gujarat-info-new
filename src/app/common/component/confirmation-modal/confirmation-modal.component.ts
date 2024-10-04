import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input() title: string = ''; // The custom title for confirmation
  @Input() message: string = ''; // The custom message for confirmation
  @Output() confirm = new EventEmitter<void>(); // Event emitter for confirmation

  // Method to emit the confirmation event
  onConfirm() {
    this.confirm.emit(); // Emit the confirmation event
  }
}
