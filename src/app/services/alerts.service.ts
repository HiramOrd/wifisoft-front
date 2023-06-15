import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  swalAlert(){
    Swal.fire('Formulario incompleto!', 'Todos los campos son obligatorios', 'warning');
  }
}
