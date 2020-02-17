import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  active: boolean;
  constructor() { }

  ngOnInit(): void {
    this.active = true;
  }

  changeActive() {
    if (this.active) {
      this.active = false;
    } else {
      this.active = true;
    }
  }

}
