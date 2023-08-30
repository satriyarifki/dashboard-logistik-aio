import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-input-occupancy-edit',
  templateUrl: './input-occupancy-edit.component.html',
  styleUrls: ['./input-occupancy-edit.component.css'],
})
export class InputOccupancyEditComponent {
  dateParams = this.actRoute.snapshot.queryParams['date'];
  //TOOLS
  damagesBool = false;
  truckingBool = false;
  deliveryBool = false;
  onTimeBool = false;

  constructor(private actRoute: ActivatedRoute) {
    this.truckingBool = true;
  }

  changeTabs(index: number) {
    if (index == 1) {
      'truck'
      this.truckingBool = true;
      this.deliveryBool = false;
      this.onTimeBool = false;
      this.damagesBool = false;
    } else if(index == 2) {
      'del des'
      this.truckingBool = false;
      this.deliveryBool = true;
      this.onTimeBool = false;
      this.damagesBool = false;
    } else if(index == 3) {
      'on time'
      this.truckingBool = false;
      this.deliveryBool = false;
      this.onTimeBool = true;
      this.damagesBool = false;
    } else if(index == 4) {
      this.truckingBool = false;
      this.deliveryBool = false;
      this.onTimeBool = false;
      this.damagesBool = true;
    }
  }
}
