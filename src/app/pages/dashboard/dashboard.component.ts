import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { PackResume, PacksHistory } from 'src/app/models/packs';
import { LandingService } from 'src/app/services/landing.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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
    this.packs = (await this.dashboardService.getPack(this.user)).data;
    const minutes = this.packs.packs.map(pack => pack.minutes);

    this.packsToBuy = (await this.landingService.getPackages()).data;

    this.datasets = [
      [...minutes],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    
    this.data = this.datasets[0];

    parseOptions(Chart, chartOptions());
    console.log('chartExample1.data', chartExample1.data.datasets);
    
    //chartExample1.data = this.datasets
    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  async buy(idPack: number) {
    await this.dashboardService.postPack(this.user, idPack);
  }

}
