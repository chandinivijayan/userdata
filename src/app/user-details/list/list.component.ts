import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  lstTableData=[];
  dataSource= new MatTableDataSource(this.lstTableData);
  displayedColumns =['FirstName','SecondName','userEmail','gender'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public router: Router,

  ) { }

  ngOnInit(): void {
    this.getUserdata();
  }

  getUserdata(){

    const dctGlobalUser=  JSON.parse(localStorage.getItem("dctGlobalUser"));

    let lstKey=Object.keys(dctGlobalUser);
    lstKey.map(key => {
      this.lstTableData.push(dctGlobalUser[key]);
      
    })
    
    
    this.dataSource=new MatTableDataSource(this.lstTableData);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  
  }

  createNewUser(){
    this.router.navigate(['/user-registration/register'])
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
