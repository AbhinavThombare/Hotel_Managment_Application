import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NodeServerApiService } from 'src/app/services/node-server-api/node-server-api.service';

@Component({
  selector: 'app-payment-component',
  templateUrl: './payment-component.component.html',
  styleUrls: ['./payment-component.component.scss']
})
export class PaymentComponentComponent implements OnInit {
  tableDetail: any;
  displaycoloumn = ['Dish', 'Quantity', 'Price']
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private nodeserverapi : NodeServerApiService
  ) { }

  ngOnInit(): void {
    this.tableDetail=this.data
    // setInterval(() => {
    //   this.tableDetail=this.data
    // },3000)
  }


  printData() {
    this.nodeserverapi.allDataTable(this.tableDetail).subscribe(
      (res) => {
        console.log(res)
      }
    )
    let DATA: any = document.getElementById('printData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    })
  
  }
}
