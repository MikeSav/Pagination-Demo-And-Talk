import {
  Component,
  OnInit
} from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pagination';

  tableData!: any[];

  tableColOrders = ['originalOrder', 'valueAscOrder', 'keyDescOrder'];

  tableColOrder = this.tableColOrders[0];

  dataOptions = [{
    value: '../data/simple-data.json',
    title: 'Simple'
  }, {
    value: '../data/live-monitor-data.json',
    title: 'Live Monitor'
  }, {
    value: '../data/empty-data.json',
    title: 'Empty'
  }];

  currentSource = '../data/simple-data.json';

  sideBarOpen = false;

  selectedRow!: any;

  loading = true;

  constructor(public dataService: AppService) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  setTableColOrder(event: any): void {
    console.log('app 47', event);
    this.tableColOrder = event;
  }

  setDataSource(url: string): void {
    this.getDataSource(url);
  }

  getDataSource(url?: string): void {
    this.loading = true;
    this.currentSource = url || this.currentSource;
    this.dataService.getData(url).subscribe((resp: any) => {
      this.tableData = resp;
      this.loading = false;
    });
  }

  showSideBar(event:any): void {
    this.sideBarOpen = true;
    this.selectedRow = event;
  }

  hideSideBar(): void {
    this.sideBarOpen = false;
  }

  headerSelected(event: any) {
    // this is shit...
    console.log(event.target?.attributes['data-test'].value);
  }
}
