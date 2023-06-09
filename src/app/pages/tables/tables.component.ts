import { Component, OnInit } from "@angular/core";
import { PackResume, PacksHistory } from "src/app/models/packs";
import { DashboardService } from "src/app/services/dashboard.service";
import { LandingService } from "src/app/services/landing.service";

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"],
})
export class TablesComponent implements OnInit {
  user: string;
  packs: PacksHistory;
  packsToBuy: PackResume[];

  constructor(
    private dashboardService: DashboardService,
    private landingService: LandingService
  ) {}

  async ngOnInit() {
    try {
      this.user = localStorage.getItem("username");

      this.packs = (await this.dashboardService.getPack(this.user)).data;
      this.packsToBuy = (await this.landingService.getPackages()).data;
      
      this.packs.packs = this.packs.packs.map((item) => {
        item.percent = (item?.minutesConsumed * 100) / item?.minutes;
        
        switch (item.minutes) {
          case 60:
            item.type = '1 Hora';
            break;
          case 120:
            item.type = '2 Horas';
            break;
          default:
            item.type = '2 Horas';
            break;
        }

        return item;
      });
      console.log('this.packs', this.packs);
    } catch (error) {
      console.log(error);
    }
  }

  async buy(idPack: number) {
    await this.dashboardService.postPack(this.user, idPack);
    this.packs = (await this.dashboardService.getPack(this.user)).data;
  }
}
