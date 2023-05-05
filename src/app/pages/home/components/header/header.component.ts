import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }
  
  scrollToSection(sectionId: string) {
    const section = document.querySelector(`#${sectionId}`);
    section?.scrollIntoView({ behavior: 'smooth' });
  }
}
