import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  Renderer2
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

type OptionValue = {
  title: string;
  value: string;
};

type OptionItem = OptionValue | string;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() options!: OptionItem[];

  @Output() selectChange: EventEmitter<string> = new EventEmitter();

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: any, // set to any to prevent 'Could not resolve type Document' on build
  ) {}

  ngAfterViewInit(): void {
    this.setUpCustomSelect();
  }

  setUpCustomSelect(): void {
    // get the starting point
    const container = this.elementRef.nativeElement.getElementsByClassName('sio-select')[0];
    const originalSelect = this.elementRef.nativeElement.getElementsByTagName('select')[0];
    // get the current selected option
    const selectedElement = this.renderer.createElement('div');
    selectedElement.setAttribute('class', 'sio-select__selected');
    // ToDo: what if we have a selected item by default...
    selectedElement.innerHTML = originalSelect.options[0].innerHTML;
    container.appendChild(selectedElement);

    // create a wrapper to hold all the other items
    const optionsContainer = this.renderer.createElement('div');
    optionsContainer.setAttribute('class', 'sio-select__options sio-select__options--closed');
    container.appendChild(optionsContainer);

    // we need to add click event to open the other options or toggle
    selectedElement.addEventListener('click', () => {
      optionsContainer.classList.toggle('sio-select__options--closed');
      // do we need to sort out the arrow?
      if (optionsContainer.classList.contains('sio-select__options--closed')) {
        selectedElement.classList.remove('sio-select__selected--open');
      } else {
        selectedElement.classList.add('sio-select__selected--open');
      }
    });

    // make a div for all items in the current options
    this.options.forEach((item: OptionItem, index: number) => {
      // we only care about the text not the value
      const optionDivLabel = this.getOptionLabel(item)
      const optionDiv = this.renderer.createElement('div');
      optionDiv.setAttribute('class', 'sio-select__option');
      optionDiv.innerHTML = optionDivLabel;
      // add click event
      optionDiv.addEventListener('click', () => {
        // set the value of the original select
        originalSelect.selectedIndex = index;
        // now up date the content of the selected div
        selectedElement.innerHTML = optionDivLabel;
        // hide the options
        this.renderer.addClass(optionsContainer, 'sio-select__options--closed');
        // don't forget the arrow..
        if (selectedElement.classList.contains('sio-select__selected--open')) {
          selectedElement.classList.remove('sio-select__selected--open');
        }
        // we probably need to emit the value
        this.selectChange.emit(originalSelect.options[originalSelect.selectedIndex].value);
      });
      optionsContainer.appendChild(optionDiv);
    });
  }

  closeTheOptions(): void {
    const optionsContainer = this.elementRef.nativeElement.getElementsByClassName('sio-select__options')[0];
    const selectedOption = this.elementRef.nativeElement.getElementsByClassName('sio-select__selected')[0];

    if (!optionsContainer.classList.contains('sio-select__options--closed')) {
      optionsContainer.classList.add('sio-select__options--closed');
    }

    if (selectedOption.classList.contains('sio-select__selected--open')) {
      selectedOption.classList.remove('sio-select__selected--open');
    }
  }

  getOptionLabel(option: OptionItem): any {
    return typeof option === 'string' ? option : option.title;
  }

  getOptionValue(option: OptionItem): any {
    return typeof option === 'string' ? option : option.value;
  }

  trackByFn = (index: number, option: OptionItem): any => {
    this.getOptionValue(option);
  };
}
