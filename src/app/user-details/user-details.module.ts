import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";

import { UserDetailsRoutingModule } from './user-details-routing.module';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    
  ]
})
export class UserDetailsModule { }
