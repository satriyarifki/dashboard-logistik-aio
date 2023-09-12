import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-input-ln2-arrival-create',
  templateUrl: './input-ln2-arrival-create.component.html',
  styleUrls: ['./input-ln2-arrival-create.component.css'],
  providers: [DatePipe]
})
export class InputLn2ArrivalCreateComponent {
  itemLoop: number = 1;
  arrayItem: any[] = [];
  dateNow = this.datePipe.transform(new Date(),'yyyy-MM-dd')

  //Boolean
    supplierValue = 1

   //API
   supplierApi: any[]=[]
   tankiApi: any[]=[]
   karyawanApi: any[]=[]
   
  constructor(private datePipe: DatePipe, private apiService: ApiService) {
    this.arrayItem.push('item');
    forkJoin(apiService.getSupplier(), apiService.getTanki(), apiService.getKaryawan()).subscribe(([supplier,tanki,karyawan])=>{
      this.supplierApi = supplier
      this.tankiApi = tanki
      this.karyawanApi = karyawan
      console.log(this.supplierApi);
      console.log(this.tankiApi);
      console.log(this.karyawanApi);
      
    })
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
