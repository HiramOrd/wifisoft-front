import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/auth.service";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    username: ["", Validators.required],
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
      const { username, password } = this.form.value;
      await this.authenticationService.login(username, password);
      await this.authenticationService.getUser(username);
      this.router.navigate(["/dashboard"]);
    } catch (error) {
      console.log(error);
    }
  }
}
