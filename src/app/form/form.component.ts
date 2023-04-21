import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

type Powers = "Super Flexible" | "Super Hot" | "Weather Changer"
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {
  constructor(
  ) { }
  submitted: boolean = false
  powers: Powers[] = ["Super Flexible", "Super Hot", "Weather Changer"]
  name = new FormControl()
  selectPower = new FormControl()
  onSubmit() {
    this.submitted = true
    console.log("submit:" + this.name + " - " + this.selectPower);
  }
}
