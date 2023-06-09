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
  public isGuest : boolean = false;
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
    await this.getUser();
  }

  async getUser(){
    try {
      const user = localStorage.getItem("username");
      console.log('user', user);

      
      const { email, name, username } = (
        await this.dashboardService.getUser(user)
      ).data;

      if(name == 'Guest'){
        console.log('Es invitado');
        
      }else{
        console.log('No es invitado');
        this.form.get('email').disable();
      }

      this.form.patchValue({
        email,
        name,
        username,
      });
    } catch (error) {
      console.log(error);
    }
  }

  validateForm(){
    if (this.form.invalid) {
      // Acciones cuando el formulario es válido
      console.log('invalido');
      
      return
    }
    this.submit();
  }

  async submit() {
    try {
      const { email, name, username } = this.form.value;
      console.log('enviando...');
      
      await this.dashboardService.postUser(email, name, username);
    } catch (error) {}
  }
}
