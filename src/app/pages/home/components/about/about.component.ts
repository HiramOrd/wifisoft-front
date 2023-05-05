import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutUsComponent implements OnInit {
  @Input() title: String = '';
  @Input() content: String = '';

  constructor() { }

  ngOnInit(): void {
  }

}
