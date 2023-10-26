import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() buttonColor: 'primary' | 'secondary' | 'success' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled: boolean = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  private colorMap = {
    primary: '#fd0',
    secondary: '#bac1d2',
    success: '#28a745'
  };

  private colorDisabled = {
    primary: '#eee087b5',
    secondary: '#b2b7c17d',
    success: '#28a745'
  }

  getButtonColor(): any {
    if(this.disabled){
      return this.colorDisabled[this.buttonColor] || this.buttonColor;
    } else if(!this.disabled) {
      return this.colorMap[this.buttonColor] || this.buttonColor;
    }
  }

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
