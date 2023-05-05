import { Component, Input, OnInit } from '@angular/core';
import { GenericNumber } from 'src/app/models/generic';
import { LandingService } from 'src/app/services/landing.service';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.scss'],
})
export class PacksComponent implements OnInit {
  @Input() packs: GenericNumber[] | undefined;

  constructor() {}

  ngOnInit() {}
}
