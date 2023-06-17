import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { AuthenticationService } from "src/app/services/auth.service";
import { DashboardService } from "src/app/services/dashboard.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  public isGuest : boolean = false;
  form = this.formBuilder.group({
    email: ["", Validators.required],
    username: ["", Validators.required],
    name: ["", Validators.required],
    password: [null, Validators.minLength(6)],
  });
  
  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    await this.getUser();
  }

  async getUser(){
    try {
      const localEmail = localStorage.getItem("email");

      const { email, name, username } = (
        await this.dashboardService.getUser(localEmail)
      ).data;

      if(name == 'Guest'){
        
      }else{
        this.form.get('email').disable();
      }

      this.form.patchValue({
        email,
        name,
        username
      });
    } catch (error) {
      console.log(error);
    }
  }

  validateForm(){
    console.log('this.form.value.password', this.form.value.password);
    if (this.form.invalid) {
      console.log('Invalido');
      this.form.markAllAsTouched();
      Swal.fire('Formulario incompleto!', 'Todos los campos son obligatorios', 'warning');
      return
    }
    this.submit();
  }

  async submit() {
    try {
      const email = localStorage.getItem("email");
      const { name, username, password } = this.form.value;
      console.log(this.form.value);
      console.log(email);
      
      await this.dashboardService.postUser(email, name, username, password);

      Swal.fire('Información actualizada', '', 'success');
    } catch (error) {}
  }
}
