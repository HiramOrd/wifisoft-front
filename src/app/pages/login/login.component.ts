import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/auth.service";
import { DashboardService } from "src/app/services/dashboard.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  constructor(
    private authenticationService: AuthenticationService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.authenticationService.logout();
  }
  ngOnDestroy() {}

  async login() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;
      
      await this.authenticationService.login(email, password);
      await this.authenticationService.getUser(email);
      this.router.navigate(["/dashboard"]);
    } catch (error) {
      Swal.fire('Usuario no encontrado', '', 'error');
      console.log(error);
    }
  }

  async loginGuest() {
    try {
      const user = await this.authenticationService.registerGuest();
      const {email, password} = user.data;
      await this.authenticationService.login(email, password);
      await this.authenticationService.getUser(email);
      
      this.router.navigate(["/dashboard"]);
    } catch (error) {
      console.log(error);
    }
  }

}
