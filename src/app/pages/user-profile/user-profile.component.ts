import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { AuthenticationService } from "src/app/services/auth.service";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  form = this.formBuilder.group({
    email: ["", Validators.required],
    username: ["", Validators.required],
    name: ["", Validators.required],
  });

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    try {
      const user = localStorage.getItem("username");

      const { email, name, username } = (
        await this.dashboardService.getUser(user)
      ).data;

      this.form.patchValue({
        email,
        name,
        username,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async submit() {
    try {
      const { email, name, username } = this.form.value;
      await this.dashboardService.postUser(email, name, username);
    } catch (error) {}
  }
}
