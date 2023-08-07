import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() isOpen: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  onClose(): void {
    console.log("tiklandi");
    this.close.emit();
  }
}
