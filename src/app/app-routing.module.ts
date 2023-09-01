import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLn2Component } from './check-ln2/check-ln2.component';
import { DamagesProductComponent } from './damages-product/damages-product/damages-product.component';
import { DelDesKejayanComponent } from './delivery-destination/del-des-kejayan/del-des-kejayan.component';
import { DelDesSukabumiComponent } from './delivery-destination/del-des-sukabumi/del-des-sukabumi.component';
import { FleetDistributionComponent } from './fleet-distribution/fleet-distribution.component';
import { HomeComponent } from './home/home.component';
import { AvgHandlingLoadComponent } from './kejayan-sukabumi/avg-handling-load/avg-handling-load.component';
import { PerfectOrderRateComponent } from './perfect-order-rate/perfect-order-rate.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TruckingKejayanComponent } from './trucking/trucking-kejayan/trucking-kejayan.component';
import { InvenAccuracyComponent } from './warehouse/inven-accuracy/inven-accuracy.component';
import { OccupancyComponent } from './warehouse/occupancy/occupancy.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DocumentationsComponent } from './documentations/documentations.component';
import { InputKjyComponent } from './input/input-kjy/input-kjy.component';
import { InputSkbComponent } from './input/input-skb/input-skb.component';
import { InputOccupancyComponent } from './input/input-occupancy/input-occupancy.component';
import { InputOccupancyEditComponent } from './input/input-occupancy-edit/input-occupancy-edit.component';
import { InputKjyEditComponent } from './input/input-kjy-edit/input-kjy-edit.component';
import { InputSkbEditComponent } from './input/input-skb-edit/input-skb-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  {
    path: 'warehouse/occupancy',
    component: OccupancyComponent,
    data: { animation: 'OccuPage' },
  },
  { path: 'inven-accuracy', component: InvenAccuracyComponent },
  // { path: 'trucking/kejayan', component: TruckingKejayanComponent },
  { path: 'delivery-destination/kejayan', component: DelDesKejayanComponent },
  { path: 'delivery-destination/sukabumi', component: DelDesSukabumiComponent },
  { path: 'damages-product', component: DamagesProductComponent },
  { path: 'perfect-order-rate', component: PerfectOrderRateComponent },
  { path: 'fleet-distribution', component: FleetDistributionComponent },
  {
    path: 'kejayan-Sukabumi-avg-handling-load',
    component: AvgHandlingLoadComponent,
  },
  // { path: 'input-occupancy', component: InputOccupancyComponent },
  // { path: 'input-occupancy/edit', component: InputOccupancyEditComponent },
  // { path: 'input-kjy', component: InputKjyComponent },
  // { path: 'input-kjy/edit', component: InputKjyEditComponent },
  // { path: 'input-skb', component: InputSkbComponent },
  // { path: 'input-skb/edit', component: InputSkbEditComponent },
  { path: 'temp', component: TemperatureComponent },
  { path: 'check-ln', component: CheckLn2Component },
  { path: 'documentations', component: DocumentationsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
