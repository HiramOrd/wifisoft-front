import { Component, Input, OnInit } from "@angular/core";
import { PackResume } from "src/app/models/packs";

@Component({
  selector: "app-packs",
  templateUrl: "./packs.component.html",
  styleUrls: ["./packs.component.scss"],
})
export class PacksComponent implements OnInit {
  @Input() packs: PackResume[] | undefined;

  constructor() {}

  ngOnInit() {}
}
