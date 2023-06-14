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
  public isActiveMonthChart: boolean = true;
  public isActiveWeekChart: boolean = false;

  private labelForMonths: string[] = [
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
  "Dec",]
  private labelForWeeks: string[] = []
  private minutesPerMonth: number[] = [];
  private minutesPerDay: number[] = [];
  packsToBuy: PackResume[];
  email: string;
  packs: PacksHistory;

  constructor(
    private dashboardService: DashboardService,
    private landingService: LandingService
  ) {}

  async ngOnInit() {
    this.email = localStorage.getItem("email");
    await this.getAllPacks();
    this.setChart();    
    this.packsToBuy = (await this.landingService.getPackages()).data;
    console.log('this.packsToBuy', this.packsToBuy);
    
  }

  async setChart(){
    this.getChartByMonths();
    this.getChartByWeek();

    const generalChart: DashboardChart = {
      labels: [
        ...this.labelForMonths
      ],
      datasets: [
        {
          label: "Minutes",
          data: [...this.minutesPerMonth],
        }
      ],
    };
    
    parseOptions(Chart, chartOptions());

    var chartSales = document.getElementById("chart-sales");

    this.salesChart = new Chart(chartSales, {
      type: "line",
      options: chartExample1.options,
      data: generalChart,
    });
  }

  public updateOptions() {
    if(this.isActiveMonthChart){ 
      this.isActiveMonthChart = false;
      this.isActiveWeekChart  = true;
      this.salesChart.data.datasets[0].data = this.minutesPerDay;
      this.salesChart.data.labels = this.labelForWeeks;
      this.salesChart.update();
      return
    }
    if(this.isActiveWeekChart){
      this.isActiveMonthChart = true;
      this.isActiveWeekChart  = false;
      this.salesChart.data.datasets[0].data = this.minutesPerMonth;
      this.salesChart.data.labels = this.labelForMonths;
      this.salesChart.update();
      return
    }
  }

  async getAllPacks() {
    try {
      this.packs = (await this.dashboardService.getPack(this.email)).data;
    } catch (error) {
      console.log(error);
    }
  }

  getChartByMonths() {
    const arrayPacksSeparatedByMonths: Pack[][] = [];

    for (let i = 0; i < 12; i++) {
      arrayPacksSeparatedByMonths[i] = this.packs.packs.filter(
        (pack) => new Date(pack?.dateEnd).getMonth() === i
      );

      this.minutesPerMonth[i] = arrayPacksSeparatedByMonths[i].reduce(
        (accumulator, element) => accumulator + element.minutesConsumed,
        0
      );
    }
  }

  getChartByWeek() {
    const currentDate = new Date();

    const arrayPackLastWeek: Pack[] = this.packs.packs.filter(
      (pack) => {
        const timeElapsed =
          currentDate.getTime() - new Date(pack.dateEnd).getTime();
        const timeInDays = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
        return timeInDays <= 7 && timeInDays >= 0;
      }
    );

    const arrayPacksSeparatedByDayWeek: Pack[][] = [];
    let auxIterator = 0;
    for (let i = 6; i >= 0; i--) {
      const subArray: Pack[] = arrayPackLastWeek.filter((pack) => {
        return new Date(pack.dateEnd).getDay() === i;
    });
      
      arrayPacksSeparatedByDayWeek.push(subArray);
      
      this.minutesPerDay[i] = arrayPacksSeparatedByDayWeek[auxIterator].reduce((accumulator, element) => accumulator + element.minutesConsumed, 0);
      auxIterator++;
    }

    const dayWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 7; i >= 1; i--) {
      const pastDay = new Date(currentDate);
      pastDay.setDate(currentDate.getDate()+1 - i);
      const nameDay = dayWeeks[pastDay.getDay()];
      this.labelForWeeks.push(nameDay);
    }
  }

  async buy(idPack: number) {
    console.log(this.email);
    
    this.dashboardService.postPack(this.email, idPack).then(
      (voucher)=>{
        console.log('voucher', voucher);
        
      }
    ).catch(
      ()=>{

      }
    );
  
    
  }
}
