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
import { InputLn2Component } from './input-ln2/input-ln2.component';
import { InputLn2ArrivalCreateComponent } from './input-ln2-arrival-create/input-ln2-arrival-create.component';
import { InputLn2CheckCreateComponent } from './input-ln2-check-create/input-ln2-check-create.component';
import { InputLn2ArrivalEditComponent } from './input-ln2-arrival-edit/input-ln2-arrival-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { OutAuthGuard } from './services/guard/out-auth.guard';
import { OnAuthGuard } from './services/guard/on-auth.guard';
import { InputOccupancyRmpmComponent } from './occupancy-rmpm/input-occupancy-rmpm/input-occupancy-rmpm.component';
import { InputOccupancyRmpmCreateComponent } from './occupancy-rmpm/input-occupancy-rmpm-create/input-occupancy-rmpm-create.component';
import { InputOccupancyRmpmEditComponent } from './occupancy-rmpm/input-occupancy-rmpm-edit/input-occupancy-rmpm-edit.component';
import { OccupancyRmpmComponent } from './occupancy-rmpm/occupancy-rmpm.component';
import { InputLn2CheckEditComponent } from './input-ln2-check-edit/input-ln2-check-edit.component';
import { InputOccupancyRmpmViewComponent } from './occupancy-rmpm/input-occupancy-rmpm-view/input-occupancy-rmpm-view.component';
import { InputLn2ArrivalViewComponent } from './check-ln2/input-ln2-arrival-view/input-ln2-arrival-view.component';
import { InputLn2CheckViewComponent } from './check-ln2/input-ln2-check-view/input-ln2-check-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  {
    path: 'warehouse/occupancy',
    component: OccupancyComponent,
    data: { animation: 'OccuPage' },
  },
  { path: 'login', component: LoginComponent, canActivate: [OutAuthGuard] },
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
  {
    path: 'input-occupancy',
    component: InputOccupancyComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-occupancy/edit',
    component: InputOccupancyEditComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-kjy',
    component: InputKjyComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-kjy/edit',
    component: InputKjyEditComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-skb',
    component: InputSkbComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-skb/edit',
    component: InputSkbEditComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-ln2',
    component: InputLn2Component,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-ln2/arrival-create',
    component: InputLn2ArrivalCreateComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-ln2/arrival-edit',
    component: InputLn2ArrivalEditComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-ln2/arrival-view',
    component: InputLn2ArrivalViewComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-ln2/check-create',
    component: InputLn2CheckCreateComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-ln2/check-edit',
    component: InputLn2CheckEditComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-ln2/check-view',
    component: InputLn2CheckViewComponent,
    canActivate: [OnAuthGuard],
  },
  {
    path: 'input-rmpm-occupancy',
    component: InputOccupancyRmpmComponent,
    canActivate: [OnAuthGuard],
  },
  { path: 'input-rmpm-occupancy/create', component: InputOccupancyRmpmCreateComponent,canActivate: [OnAuthGuard], },
  { path: 'input-rmpm-occupancy/edit', component: InputOccupancyRmpmEditComponent,canActivate: [OnAuthGuard], },
  { path: 'input-rmpm-occupancy/view', component: InputOccupancyRmpmViewComponent,canActivate: [OnAuthGuard], },
  { path: 'temp', component: TemperatureComponent },
  { path: 'check-ln', component: CheckLn2Component },
  { path: 'occu-rmpm', component: OccupancyRmpmComponent },
  { path: 'documentations', component: DocumentationsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
