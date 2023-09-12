import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-input-ln2-check-create',
  templateUrl: './input-ln2-check-create.component.html',
  styleUrls: ['./input-ln2-check-create.component.css'],
  providers: [DatePipe]
})
export class InputLn2CheckCreateComponent {
  itemLoop: number = 1;
  arrayItem: any[] = [];
  dateNow = this.datePipe.transform(new Date(),'yyyy-MM-dd')
  satuan:any = '';

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
    if (this.arrayItem.length < 4) {
      this.arrayItem.push('item');
    }else {
      alert('Maximum Item is 4')
    }
    
    console.log(this.arrayItem);
  }

  deleteItemLoop(index: number) {
    // this.itemLoop--;
    console.log(index);
    const t = this.arrayItem.splice(index, index);

    console.log(this.arrayItem);
  }
  changeSupplier(id:any){
    if (id == 1) {
      this.satuan = 'InchH₂O'
    } else {
      this.satuan = 'mmH₂O'
    }
  }
  popItemLoop() {
    // this.itemLoop--;

    if (this.arrayItem.length != 1) {
      this.arrayItem.pop();
    }else {
      alert('Minimum Item is 1')
    }
    

    console.log(this.arrayItem);
  }
}
