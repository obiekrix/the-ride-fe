import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-choice',
  standalone: true,
  imports: [],
  templateUrl: './registration-choice.component.html',
  styleUrl: './registration-choice.component.scss'
})
export class RegistrationChoiceComponent {
  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
