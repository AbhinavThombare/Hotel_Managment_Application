import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { NodeServerApiService } from 'src/app/services/node-server-api/node-server-api.service';
import { PaymentComponentComponent } from '../payment-component/payment-component.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  allTableData: any | null= [];
  // displaycoloumn=['Dish','Quantity','Price']

  constructor(
    private nodeserverapi : NodeServerApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllTables()
    setInterval(() => {
      this.getAllTables()
    },3000)
  }

  getAllTables() {
    this.nodeserverapi.getTables().subscribe(
      (res) => {
        this.allTableData = res.body;
      }
    )
  }

  openDetails(tableDetails:any) {
    this.dialog.open(PaymentComponentComponent,{
      width: 'auto',
      height: 'fit-content',
      data:tableDetails
    })
  }

}
