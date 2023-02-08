import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OccupancyComponent } from './warehouse/occupancy/occupancy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'warehouse/occupancy', component: OccupancyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
