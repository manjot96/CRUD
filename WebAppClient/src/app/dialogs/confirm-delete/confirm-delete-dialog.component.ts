import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { StudentService } from '../../services/student.service';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: './confirm-delete-dialog.component.html'
})
export class ConfirmDeleteDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
        private studentService: StudentService
    ) { }

    public close(): void {
        this.studentService.delete(this.data.studentId).pipe( first() ).subscribe( () => {
            this.dialogRef.close(true);
        }, error => {
            console.error(error);
        })
    }

}