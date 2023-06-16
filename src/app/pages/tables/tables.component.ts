import { Component, OnInit } from "@angular/core";
import { Pack, PackResume, PacksHistory, Voucher } from "src/app/models/packs";
import { DashboardService } from "src/app/services/dashboard.service";
import { LandingService } from "src/app/services/landing.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"],
})
export class TablesComponent implements OnInit {
  email: string;
  packs: PacksHistory;
  packsToBuy: PackResume[];
  public voucherHasHourDifference: boolean = false;
  constructor(
    private dashboardService: DashboardService,
    private landingService: LandingService
  ) {}

  async ngOnInit() {
    try {
      this.email = localStorage.getItem("email");
      
      this.packs = (await this.dashboardService.getPack(this.email)).data;
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
    await this.dashboardService.postPack(this.email, idPack);
    this.packs = (await this.dashboardService.getPack(this.email)).data;
  }

  reactivatePack(vouchers:Voucher[]){
    const currentDate = new Date();
    let localVouchers: Voucher[] = JSON.parse(localStorage.getItem('currentEmailVouchers')) ?? [];

    console.log('ocalVouchers', localVouchers);
    
    if(localVouchers.length == 0){
      console.log('vouchers', vouchers);
      
      localVouchers = vouchers
    }

    console.log('localVouchers', localVouchers);
    

    const formattedDate = this.formatDateTime(new Date());
    console.log('localVouchers[localVouchers.length-1]', localVouchers[localVouchers.length-1]);
    let lastVoucher = localVouchers[localVouchers.length-1]

    console.log('currentDate', currentDate);
    
    this.voucherHasHourDifference = this.hasHourDifference(currentDate, new Date(lastVoucher.dateStart));
    console.log('hasHourDifference', this.voucherHasHourDifference);
    
    if(this.voucherHasHourDifference){
      let newVoucher: Voucher = {
        code: '2323s',
        minutes: 60,
        dateStart: formattedDate
      }
      console.log('newVoucher', newVoucher);
      vouchers.push(newVoucher);
      localStorage.setItem("currentEmailVouchers", JSON.stringify(vouchers));
      console.log('Disponible');
      Swal.fire('Voucher activado!', '', 'success');
    }else{
      console.log('No disponible');
      Swal.fire('No disponible', 'Ya cuentas con un voucher activo', 'warning');
    }
    console.log('currentEmailVouchers', localVouchers);
    
  }

  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    const formattedMonth = month < 10 ? `0${month}` : month.toString();
    const formattedDay = day < 10 ? `0${day}` : day.toString();
    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
  
    return `${year}-${formattedMonth}-${formattedDay}T${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  
  hasHourDifference(date1: Date, date2: Date): boolean {
    console.log('date1', date1);
    console.log('date2', date2);

    const differenceInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
    const differenceInHours = differenceInMilliseconds / 3600000;
    console.log('differenceInHours', differenceInHours);
    
    return differenceInHours >= 1;
  }

}
