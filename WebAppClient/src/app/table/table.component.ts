import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { TableDataSource } from './table-datasource';
import { StudentService } from '../services/student.service';
import { ConfirmDeleteDialogComponent } from '../dialogs/confirm-delete/confirm-delete-dialog.component';
import { first } from 'rxjs/operators';
import { CreateDialogComponent } from '../dialogs/create/create-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableDataSource;

  public data: any[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['firstName', 'lastName', 'createdAt', 'actions'];

  constructor(
    private studentService: StudentService,
    public dialog: MatDialog
  ) {
    this.data = [];
  }

  public ngOnInit(): void {
    this.dataSource = new TableDataSource(this.paginator, this.sort);
    
    this.refreshData();
  }

  public delete(rowId: number): void {
    const dialogRef = this.dialog.open(
      ConfirmDeleteDialogComponent,
      {
        data: {
          studentId: this.data[rowId].studentId
        }
      }
    );

    dialogRef.afterClosed().pipe(first()).subscribe( result => {
      if (!result) {
        return;
      }

      this.refreshData();
    });
  }

  public update(rowId: number): void {
    const dialogRef = this.dialog.open(
      CreateDialogComponent,
      {
        data: {
          student: this.data[rowId],
          mode: 2 // Acts like an Enum value which represents Update Mode
        }
      }
    );

    dialogRef.afterClosed().pipe( first() ).subscribe(result => {
      if (!result) {
        return;
      }

      this.refreshData();
    })
  }

  public create(): void {
    const dialogRef = this.dialog.open(
      CreateDialogComponent,
      {
        data: {
          student: {},
          mode: 1 // Acts like an Enum value which represents Create Mode
        }
      }
    );

    dialogRef.afterClosed().pipe( first() ).subscribe(result => {
      if (!result) {
        return;
      }

      this.refreshData();
    });
  }

  private refreshData(): void {
    this.studentService.getAll().subscribe(value => {
      this.data = value; 
      this.dataSource.data = value;
      this.paginator._changePageSize(this.paginator.pageSize); //used to refresh the table;
    } );
  }
}
