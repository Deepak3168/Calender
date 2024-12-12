import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CalenderComponent } from "./components/calender/calender.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CalenderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calender';
}
