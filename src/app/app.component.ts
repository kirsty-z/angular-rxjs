import { Component } from '@angular/core';

export interface Hero {
  id: number
  name: string
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Tour of Heroes ---"
  color: string = ""
}
