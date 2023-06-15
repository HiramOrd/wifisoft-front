import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-not-available',
  templateUrl: './content-not-available.component.html',
  styleUrls: ['./content-not-available.component.scss']
})
export class ContentNotAvailableComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {

  }

}
