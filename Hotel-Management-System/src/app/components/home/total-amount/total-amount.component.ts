import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { NodeServerApiService } from 'src/app/services/node-server-api/node-server-api.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.scss']
})
export class TotalAmountComponent implements OnInit {
  dateRangePick: any;
  date!: Date;
  getAllData!: any;
  getTotalAmount = 0;
  start_date!: string | null;
  end_date!: string | null;

  constructor(
    public datepipe: DatePipe,
    public nodeserverapi: NodeServerApiService
  ) { }

  ngOnInit(): void {
    // setInterval(() => {
    //   console.log(this.dateRange)
    // },3000)
  }

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  datePick() {
    this.dateRangePick = this.dateRange.value;
    console.log(this.dateRangePick)
    this.start_date = this.datepipe.transform(this.dateRangePick.start, 'yyyy-MM-dd');
    this.end_date = this.datepipe.transform(this.dateRangePick.end, 'yyyy-MM-dd');
    console.log(this.start_date)
    console.log(this.end_date)

    this.nodeserverapi.getTotalAmount(this.start_date, this.end_date).subscribe(
      (res) => {
        this.getAllData = res
        console.log(this.getAllData)
        this.getTotalAmount = 0
        this.getAllData.forEach((item: any) => {
          this.getTotalAmount = this.getTotalAmount + item.Total_Price
        });
      }
    )
  }
}
