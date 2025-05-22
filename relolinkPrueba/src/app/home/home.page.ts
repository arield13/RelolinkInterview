import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
steps = ['A', 'B', 'C', 'D', 'E', 'F'];
  options = ['Option 1', 'Option 2', 'Option 3'];
 
  formValues: { [key: string]: string } = {};

}
