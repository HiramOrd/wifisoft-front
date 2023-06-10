import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";
import {
  DashboardChart,
  Pack,
  PackResume,
  PacksHistory,
} from "src/app/models/packs";
import { LandingService } from "src/app/services/landing.service";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  packsToBuy: PackResume[];
  user: string;
  packs: PacksHistory;

  constructor(
    private dashboardService: DashboardService,
    private landingService: LandingService
  ) {}

  async ngOnInit() {
    await this.getAllPacks();
    await this.setChartByMonths();
    this.packsToBuy = (await this.landingService.getPackages()).data;
  }

  async getAllPacks() {
    try {
      this.packs = (await this.dashboardService.getPack(this.user)).data;
    } catch (error) {
      console.log(error);
    }
  }

  async setChartByMonths() {
    const arrayPacksSeparatedByMonths: Pack[][] = [];
    let minutesPerMonth: number[] = [];

    for (let i = 0; i < 12; i++) {
      arrayPacksSeparatedByMonths[i] = this.packs.packs.filter(
        (pack) => new Date(pack?.dateEnd).getMonth() === i
      );

      minutesPerMonth[i] = arrayPacksSeparatedByMonths[i].reduce(
        (accumulator, element) => accumulator + element.minutesConsumed,
        0
      );
    }

    const monthChart: DashboardChart = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Month",
          data: [...minutesPerMonth],
        },
      ],
    };

    parseOptions(Chart, chartOptions());

    var chartSales = document.getElementById("chart-sales");

    this.salesChart = new Chart(chartSales, {
      type: "line",
      options: chartExample1.options,
      data: monthChart,
    });
    this.salesChart.update();
  }

  setChartByWeek() {
    const currentDate = new Date();

    const arrayPackLastWeek: Pack[] = this.packs.packs.filter(
      (objeto) => {
        const timeElapsed =
          currentDate.getTime() - new Date(objeto.dateEnd).getTime();
        const timeInDays = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
        return timeInDays <= 7 && timeInDays >= 0;
      }
    );

    const arrayPacksSeparatedByWeek: Pack[][] = [];
    let minutesPerDay: number[] = [];
    let auxIterator = 0;
    for (let i = 6; i >= 0; i--) {
      const subArray: Pack[] = arrayPackLastWeek.filter((objeto) => {
        return new Date(objeto.dateEnd).getDay() === i;
    });
      
      arrayPacksSeparatedByWeek.push(subArray);
      
      minutesPerDay[i] = arrayPacksSeparatedByWeek[auxIterator].reduce((accumulator, element) => accumulator + element.minutesConsumed, 0);
      auxIterator++;
    }

    const pastDays: string[] = [];

    const dayWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 7; i >= 1; i--) {
      const pastDay = new Date(currentDate);
      pastDay.setDate(currentDate.getDate()+1 - i);
      const nameDay = dayWeeks[pastDay.getDay()];
      pastDays.push(nameDay);
    }

    const weekChart: DashboardChart = {
      labels: [...pastDays],
      datasets: [
        {
          label: "Week",
          data: [...minutesPerDay],
        },
      ],
    };

    this.salesChart.data = weekChart;

    this.salesChart.update();

  }


  public updateOptions() {
    console.log("update");

    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  async buy(idPack: number) {
    await this.dashboardService.postPack(this.user, idPack);
  }
}
