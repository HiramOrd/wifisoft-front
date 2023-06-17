import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/auth.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form = this.formBuilder.group({
    email: ["", Validators.required],
    name: ["", Validators.required],
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  constructor(
    private authenticationService: AuthenticationService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  async register() {
    if (this.form.invalid) return;

    try {
      const { username, password, email, name } = this.form.value;
      await this.authenticationService.register(
        email,
        name,
        username,
        password
      );
      Swal.fire('Registro correcto', '', 'success');
      this.router.navigate(["/login"]);

    } catch (error) {
      console.log(error);
    }
  }
}
