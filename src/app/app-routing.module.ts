import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DamagesProductComponent } from './damages-product/damages-product/damages-product.component';
import { DelDesKejayanComponent } from './delivery-destination/del-des-kejayan/del-des-kejayan.component';
import { DelDesSukabumiComponent } from './delivery-destination/del-des-sukabumi/del-des-sukabumi.component';
import { FleetDistributionComponent } from './fleet-distribution/fleet-distribution.component';
import { HomeComponent } from './home/home.component';
import { AvgHandlingLoadComponent } from './kejayan-sukabumi/avg-handling-load/avg-handling-load.component';
import { PerfectOrderRateComponent } from './perfect-order-rate/perfect-order-rate.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TruckingKejayanComponent } from './trucking/trucking-kejayan/trucking-kejayan.component';
import { TruckingSukabumiComponent } from './trucking/trucking-sukabumi/trucking-sukabumi.component';
import { InvenAccuracyComponent } from './warehouse/inven-accuracy/inven-accuracy.component';
import { OccupancyComponent } from './warehouse/occupancy/occupancy.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  {
    path: 'warehouse/occupancy',
    component: OccupancyComponent,
    data: { animation: 'OccuPage' },
  },
  { path: 'inven-accuracy', component: InvenAccuracyComponent },
  { path: 'trucking/kejayan', component: TruckingKejayanComponent },
  { path: 'trucking/sukabumi', component: TruckingSukabumiComponent },
  { path: 'delivery-destination/kejayan', component: DelDesKejayanComponent },
  { path: 'delivery-destination/sukabumi', component: DelDesSukabumiComponent },
  { path: 'damages-product', component: DamagesProductComponent },
  { path: 'perfect-order-rate', component: PerfectOrderRateComponent },
  { path: 'fleet-distribution', component: FleetDistributionComponent },
  {
    path: 'kejayan-Sukabumo-avg-handling-load',
    component: AvgHandlingLoadComponent,
  },
  { path: 'temp', component: TemperatureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
