import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class=" mb-5 flex w-full flex-col md:flex-row">
      <label
        [for]="label"
        class=" color-[#293747] mr-2 w-full font-extrabold md:w-1/3"
        >{{ label }}</label
      >
      <input
        type="text"
        class=" mt-2 w-full rounded-md border-[1px] border-solid border-[#CBD2D9] px-4 py-2 font-bold outline-1 outline-slate-600 placeholder:font-extrabold placeholder:text-[#CBD2D9] md:mt-0"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        (input)="handleInput($event)"
      />
    </div>
  `,
  styles: [],
})
export class InputComponent {
  @Input() label: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() value: string | undefined;
  @Output() inputEvent = new EventEmitter();

  handleInput(e: Event) {
    this.inputEvent.emit(e);
  }
}
