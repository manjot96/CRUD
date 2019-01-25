import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import { StudentService } from '../../services/student.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


// Decided to use this component for both create and edit dialogs so the naming of the component is incorrect
@Component({
    templateUrl: './create-dialog.component.html'
})
export class CreateDialogComponent implements OnInit {
    public formGroup: FormGroup;

    public firstName: FormControl;
    public lastName: FormControl;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<CreateDialogComponent>,
        private formBuilder: FormBuilder,
        private studentService: StudentService
    ) { }

    public ngOnInit(): void {
        this.firstName = new FormControl(
            this.data.student.firstName,
            [ Validators.required, Validators.maxLength(64) ]
        )

        this.lastName = new FormControl(
            this.data.student.lastName,
            [ Validators.required, Validators.maxLength(64) ]
        )

        this.formGroup = this.formBuilder.group({
            'firstName': this.firstName,
            'lastName': this.lastName
        });
    }

    public onSubmit(): void {
        const student = this.data.student;
        student.firstName = this.firstName.value;
        student.lastName  = this.lastName.value;

        if ( this.data.mode === 1 ) { // create mode
            this.studentService.create(student).pipe( first() ).subscribe(() => {
                this.dialogRef.close(true);
            }, error => {
                console.error(error);
            });
        } else { // edit mode
            this.studentService.update(student).pipe( first() ).subscribe(() => {
                this.dialogRef.close(true);
            }, error => {
                console.error(error);
            });
        }
        
    }


}