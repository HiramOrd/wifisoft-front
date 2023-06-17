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
  private localVouchers: Voucher[];
  public isLoading: boolean = true;
  public voucherHasHourDifference: boolean = false;
  constructor(
    private dashboardService: DashboardService,
    private landingService: LandingService
  ) {}

  async ngOnInit() {
    try {
      this.email = localStorage.getItem("email");

      this.packs = (await this.dashboardService.getPack(this.email)).data;
      console.log('this.packs', this.packs);
      
      this.verifyIfHasActiveVoucher();
     
      this.packsToBuy = (await this.landingService.getPackages()).data;
      
      this.packs.packs = this.packs.packs.map((item) => {
        item.percent = (item?.minutesConsumed * 100) / item?.minutes;
        console.log(item);
        item.type = item.minutes / 60 + ' Horas';
/*         switch (item.minutes) {
          case 60:
            item.type = '1 Hora';
            break;
          case 120:
            item.type = '2 Horas';
            break;
          case 120:
              item.type = '2 Horas';
              break;
          default:
            item.type = '2 Horas';
            break;
        } */

        return item;
      });
     
      console.log('this.packs', this.packs);
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  }

  async buy(idPack: number) {
    this.dashboardService.postPack(this.email, idPack).then(
      (voucher)=>{
        console.log('voucher', voucher);
        Swal.fire('Paquete adquirido!', '', 'success');
        this.ngOnInit();
      }
    ).catch(
      ()=>{
        Swal.fire('Error!', 'Hubo un error al adquirir el paquete', 'error');
      }
    );
  
    
  }

  verifyIfHasActiveVoucher(){
    const currentDate = new Date();

    console.log('vouchers', this.packs.packs); 
    let filteredPack: Pack[] = this.packs.packs.filter(pack=>{

      return pack.dateEnd == null;
    })
    console.log('filteredPack', filteredPack);
    
    if(filteredPack == undefined || filteredPack.length == 0) return;
    console.log('filtered', filteredPack[0].vouchers);
    this.localVouchers = filteredPack[0].vouchers;
    console.log('this.localVouchers', this.localVouchers);

    console.log('this.localVoucher', this.localVouchers);
    

    console.log('localVouchers[localVouchers.length-1]', this.localVouchers[0]);
    let lastVoucher = this.localVouchers[0]
    console.log('lastVoucher', lastVoucher);
    
    console.log('currentDate', currentDate);
    
    this.voucherHasHourDifference = this.hasHourDifference(currentDate, new Date(lastVoucher.dateStart));
    console.log('hasHourDifference', this.voucherHasHourDifference);
  }

  async reactivatePack(){
    const formattedDate = this.formatDateTime(new Date());
    if(this.voucherHasHourDifference){
      //this.localVouchers.push(newVoucher);
      console.log('Disponible');
      await this.dashboardService.getVoucher(this.email, 60);
      Swal.fire('Voucher activado!', '', 'success');
      this.ngOnInit();
      //this.verifyIfHasActiveVoucher();
    }else{
      console.log('No disponible');
      Swal.fire('No disponible', 'Ya cuentas con un voucher activo', 'warning');
    }
    
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
