import { Component } from '@angular/core';

@Component({
  selector: 'app-input-ln2-arrival-create',
  templateUrl: './input-ln2-arrival-create.component.html',
  styleUrls: ['./input-ln2-arrival-create.component.css']
})
export class InputLn2ArrivalCreateComponent {
  itemLoop: number = 1;
  arrayItem: any[] = [];
  constructor() {
    this.arrayItem.push('item');
    console.log(this.arrayItem);
  }

  plusItemLoop() {
    // this.itemLoop++;
    this.arrayItem.push('item');
    console.log(this.arrayItem);
  }

  deleteItemLoop(index: number) {
    // this.itemLoop--;
    console.log(index);
    const t = this.arrayItem.splice(index, index);

    console.log(this.arrayItem);
  }
  popItemLoop() {
    // this.itemLoop--;

    const t = this.arrayItem.pop();

    console.log(this.arrayItem);
  }
}
