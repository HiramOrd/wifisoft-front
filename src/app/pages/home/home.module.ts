import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { HeaderComponent } from "./components/header/header.component";
import { HeroComponent } from "./components/hero/hero.component";
import { PacksComponent } from "./components/packs/packs.component";

import { AboutUsComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    HeroComponent,
    PacksComponent,
    AboutUsComponent,
    ContactComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class HomeModule {}
