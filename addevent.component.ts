import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addevent',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent {
  @Input() selectedDate: string = '';  
  @Input() buttonText: string = 'Add Event';  
  @Input() submitFunc!: (eventData: { title: string, time: string, priority: string, description: string }) => void;

  eventData = {
    title: '',   
    time: '',
    priority: 'low',
    description: ''
  };
  
  @Output() eventAdded = new EventEmitter<any>();  

  submitEvent() {
    const { title, time, priority, description } = this.eventData;

    if (title && description) {
      this.submitFunc({ title, time, priority, description });
      this.eventAdded.emit(this.eventData);
      this.eventData = {
        title: '',
        time: '',
        priority: 'low',
        description: ''
      };
    }
  }
}
