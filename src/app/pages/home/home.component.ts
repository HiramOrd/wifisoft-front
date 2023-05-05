import { Component, OnInit } from "@angular/core";
import { GenericText, GenericNumber } from "src/app/models/generic";
import { LandingService } from "src/app/services/landing.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  header: GenericText | undefined;
  packages: GenericNumber[] | undefined;
  about: GenericText | undefined;

  constructor(private landingService: LandingService) {}

  ngOnInit(): void {
    this.getHeader();
    this.getPackages();
    this.getAbout();
  }

  async getHeader() {
    const header = await this.landingService.getHeader();
    this.header = header;
  }

  async getPackages() {
    const packages = await this.landingService.getPackages();
    this.packages = packages;
  }

  async getAbout() {
    const about = await this.landingService.getAbout();
    this.about = about;
  }
}
