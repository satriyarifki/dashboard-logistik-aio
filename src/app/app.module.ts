import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { OccupancyComponent } from './warehouse/occupancy/occupancy.component';
import { InvenAccuracyComponent } from './warehouse/inven-accuracy/inven-accuracy.component';
import { TruckingKejayanComponent } from './trucking/trucking-kejayan/trucking-kejayan.component';
import { DelDesKejayanComponent } from './delivery-destination/del-des-kejayan/del-des-kejayan.component';
import { DelDesSukabumiComponent } from './delivery-destination/del-des-sukabumi/del-des-sukabumi.component';
import { DamagesProductComponent } from './damages-product/damages-product/damages-product.component';
import { PerfectOrderRateComponent } from './perfect-order-rate/perfect-order-rate.component';
import { AvgHandlingLoadComponent } from './kejayan-sukabumi/avg-handling-load/avg-handling-load.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TemperatureComponent } from './temperature/temperature.component';
import { FleetDistributionComponent } from './fleet-distribution/fleet-distribution.component';
import { LoadingInterceptor } from './loading.interceptor';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CheckLn2Component } from './check-ln2/check-ln2.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgIdleModule } from '@ng-idle/core';
import { DocumentationsComponent } from './documentations/documentations.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InputKjyComponent } from './input/input-kjy/input-kjy.component';
import { InputSkbComponent } from './input/input-skb/input-skb.component';
import { InputOccupancyComponent } from './input/input-occupancy/input-occupancy.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExportAsModule } from 'ngx-export-as';
import { CustomFilterPipe } from './pipe/custom-filter.pipe';
import { InputOccupancyEditComponent } from './input/input-occupancy-edit/input-occupancy-edit.component';
import { InputKjyEditComponent } from './input/input-kjy-edit/input-kjy-edit.component';
import { InputSkbEditComponent } from './input/input-skb-edit/input-skb-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    OccupancyComponent,
    InvenAccuracyComponent,
    TruckingKejayanComponent,
    DelDesKejayanComponent,
    DelDesSukabumiComponent,
    DamagesProductComponent,
    PerfectOrderRateComponent,
    AvgHandlingLoadComponent,
    TemperatureComponent,
    FleetDistributionComponent,
    CheckLn2Component,
    DocumentationsComponent,
    NotFoundComponent,
    InputKjyComponent,
    InputSkbComponent,
    InputOccupancyComponent,
    CustomFilterPipe,
    InputOccupancyEditComponent,
    InputKjyEditComponent,
    InputSkbEditComponent
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
    NgxLoadingModule.forRoot({}),
    NgxSpinnerModule,
    NgIdleKeepaliveModule.forRoot(),
    NgIdleModule.forRoot(),
    NgxPaginationModule,
    ExportAsModule,
    ReactiveFormsModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
