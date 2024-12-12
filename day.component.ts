import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddeventComponent } from '../addevent/addevent.component';
import { EventsComponent } from '../events/events.component';

@Component({
  selector: 'app-day',
  imports: [CommonModule,AddeventComponent,EventsComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent {
  currentDate = new Date();
  currentMonth: number = new Date().getMonth(); // Months are zero-indexed
  currentYear: number =  new Date().getFullYear();
  daysOfWeek: string[] = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] 
  getDaysInMonth(month: number, year: number): number[] {
    const days = [];
    const numDays = new Date(year, month + 1, 0).getDate(); // Get total days in the month
    for (let i = 1; i <= numDays; i++) {
      days.push(i);
    }
    return days;
  }

  //generating calender
  generateCalendar(): any[] {
    const daysInMonth = this.getDaysInMonth(this.currentMonth, this.currentYear);
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay(); // Get the starting day of the week
    const weeks = [];
    let week = new Array(7).fill(null); // Create an empty array representing a week (7 days)

    for (let i = 0; i < firstDay; i++) {
      week[i] = null;
    }

    let dayCounter = 1;

    for (let i = firstDay; i < 7; i++) {
      week[i] = dayCounter++;
    }
    weeks.push(week);
    while (dayCounter <= daysInMonth.length) {
      week = new Array(7).fill(null);
      for (let i = 0; i < 7 && dayCounter <= daysInMonth.length; i++) {
        week[i] = dayCounter++;
      }
      weeks.push(week);
    }

    return weeks;
  }

  // Handle previous month navigation
  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  // Handle next month navigation
  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }
  // Get the name of the current month
  getMonthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
  }
  showAddEvent = false;
  selectedDate = ""
  events: any[] = [];
  toggleAddEvent(day:number) {
    //getting day of th user clicked a tag and passing date to add event component to store date 
    this.selectedDate = `${this.currentYear}-${this.currentMonth+1}-${day}`;
    console.log(this.selectedDate)

    this.showAddEvent = !this.showAddEvent;
    this.fetchEvents(); 

  
  }
  //so when user clicked a button on the add event component should render and when user clicked submit it would add it in local storage since the addevent components gets eventdata yeah 
  closeAddEventForm() {
    this.showAddEvent = false;
    this.selectedDate = '';
  }
  submitEvent(eventData: { title: string, description: string, time: string, priority: string }): void {
    console.log("submit button clicked")
    const event = {
      date: this.selectedDate,  
      ...eventData             
    };
    console.log(this.selectedDate)
  
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
    
    this.showAddEvent = false;
  }

events_title = "Selected Day Events";

fetchEvents() {
  const allEvents = JSON.parse(localStorage.getItem('events') || '[]');
  this.events = allEvents.filter((event: any) => event.date === this.selectedDate);
}

isEditForm = false


editEvent(event: any) {
  // Implement edit logic
}

// Delete event function
  deleteEvent(index: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events.splice(index, 1);
      localStorage.setItem('events', JSON.stringify(this.events)); 
    }
  }
}

