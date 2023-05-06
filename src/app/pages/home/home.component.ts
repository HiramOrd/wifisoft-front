import { Component, OnInit } from "@angular/core";
import { GenericText } from "src/app/models/generic";
import { PackResume } from "src/app/models/packs";
import { LandingService } from "src/app/services/landing.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  header: GenericText | undefined;
  packages: PackResume[] | undefined;
  about: GenericText | undefined;

  constructor(private landingService: LandingService) {}

  ngOnInit(): void {
    this.getHeader();
    this.getPackages();
    this.getAbout();
  }

  async getHeader() {
    const header = await this.landingService.getHeader();
    this.header = header.data;
  }

  async getPackages() {
    const packages = await this.landingService.getPackages();
    this.packages = packages.data;
  }

  async getAbout() {
    const about = await this.landingService.getAbout();
    this.about = about.data;
  }
}
