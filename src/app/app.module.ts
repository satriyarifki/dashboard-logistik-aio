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
import { InputLn2Component } from './check-ln2/input-ln2/input-ln2.component';
import { InputLn2ArrivalCreateComponent } from './check-ln2/input-ln2-arrival-create/input-ln2-arrival-create.component';
import { InputLn2CheckCreateComponent } from './check-ln2/input-ln2-check-create/input-ln2-check-create.component';
import { InputLn2ArrivalEditComponent } from './check-ln2/input-ln2-arrival-edit/input-ln2-arrival-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { AlertComponent } from './layout/alert/alert.component';
import { OccupancyRmpmComponent } from './occupancy-rmpm/occupancy-rmpm.component';
import { InputOccupancyRmpmComponent } from './occupancy-rmpm/input-occupancy-rmpm/input-occupancy-rmpm.component';
import { InputOccupancyRmpmCreateComponent } from './occupancy-rmpm/input-occupancy-rmpm-create/input-occupancy-rmpm-create.component';
import { InputOccupancyRmpmEditComponent } from './occupancy-rmpm/input-occupancy-rmpm-edit/input-occupancy-rmpm-edit.component';
import { InputLn2CheckEditComponent } from './check-ln2/input-ln2-check-edit/input-ln2-check-edit.component';
import { DatePipe } from '@angular/common';
import { InputOccupancyRmpmViewComponent } from './occupancy-rmpm/input-occupancy-rmpm-view/input-occupancy-rmpm-view.component';
import { InputLn2ArrivalViewComponent } from './check-ln2/input-ln2-arrival-view/input-ln2-arrival-view.component';
import { InputLn2CheckViewComponent } from './check-ln2/input-ln2-check-view/input-ln2-check-view.component';
import { DeleteApiComponent } from './layout/delete-api/delete-api.component';
import { TooltipDirective } from './directive/tooltip.directive';
import { RmpmCollectionComponent } from './rmpm-collection/rmpm-collection.component';
import { ParallaxDirective } from './directive/parallax.directive';

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
    InputSkbEditComponent,
    InputLn2Component,
    InputLn2ArrivalCreateComponent,
    InputLn2CheckCreateComponent,
    InputLn2ArrivalEditComponent,
    LoginComponent,
    AlertComponent,
    OccupancyRmpmComponent,
    InputOccupancyRmpmComponent,
    InputOccupancyRmpmCreateComponent,
    InputOccupancyRmpmEditComponent,
    InputLn2CheckEditComponent,
    InputOccupancyRmpmViewComponent,
    InputLn2ArrivalViewComponent,
    InputLn2CheckViewComponent,
    DeleteApiComponent,
    TooltipDirective,
    RmpmCollectionComponent,
    ParallaxDirective
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
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
    // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
