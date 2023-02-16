import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { OccupancyComponent } from './warehouse/occupancy/occupancy.component';
import { InvenAccuracyComponent } from './warehouse/inven-accuracy/inven-accuracy.component';
import { TruckingKejayanComponent } from './trucking/trucking-kejayan/trucking-kejayan.component';
import { TruckingSukabumiComponent } from './trucking/trucking-sukabumi/trucking-sukabumi.component';
import { DelDesKejayanComponent } from './delivery-destination/del-des-kejayan/del-des-kejayan.component';
import { DelDesSukabumiComponent } from './delivery-destination/del-des-sukabumi/del-des-sukabumi.component';
import { DamagesProductComponent } from './damages-product/damages-product/damages-product.component';
import { PerfectOrderRateComponent } from './perfect-order-rate/perfect-order-rate.component';
import { AvgHandlingLoadComponent } from './kejayan-sukabumi/avg-handling-load/avg-handling-load.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TemperatureComponent } from './temperature/temperature.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    OccupancyComponent,
    InvenAccuracyComponent,
    TruckingKejayanComponent,
    TruckingSukabumiComponent,
    DelDesKejayanComponent,
    DelDesSukabumiComponent,
    DamagesProductComponent,
    PerfectOrderRateComponent,
    AvgHandlingLoadComponent,
    TemperatureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
    MatTooltipModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
