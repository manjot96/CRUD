import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable()
export class StudentService {
    private readonly apiUrl: string;
    private readonly httpHeaders: HttpHeaders;

    constructor(
        private httpClient: HttpClient
    ) {
        this.apiUrl = "http://localhost:50255/api/students";
        this.httpHeaders = new HttpHeaders()
                                .set('Accept',       'application/json')
                                .set('Content-Type', 'application/json');
    }

    public get(studentId: number): Observable<Student> {
        return this.httpClient.get<Student>(`${this.apiUrl}/${studentId}`);
    }

    public getAll(): Observable<Student[]> {
        return this.httpClient.get<Student[]>(this.apiUrl);
    }

    public update(student: Student): Observable<Student> {
        return this.httpClient.put<Student>(`${this.apiUrl}/${student.studentId}`, JSON.stringify(student), { headers: this.httpHeaders });
    }

    public create(student: Student): Observable<Student> {
        console.log(student);
        return this.httpClient.post<Student>(this.apiUrl, JSON.stringify(student), { headers: this.httpHeaders } );
    }

    public delete(studentId: number): Observable<void> {
        return this.httpClient.delete<void>( `${this.apiUrl}/${studentId}` );
    }
}