import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Student } from './student-interface';

@Component({
  selector: 'student-add',
  templateUrl: './student-add.component.html',
  styles: [`input{width:100%;padding: 10px 15px;margin:5px auto;}`],
})
export class StudentAddComponent implements OnInit {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  student: Student[] = [
    { name: 'phani', id: '10', gender: 'female',country:'India', address: 'gdv' },
  ];

  countryList: any = [
    { id: 1, name: 'India' },
    { id: 1, name: 'US' },
    { id: 1, name: 'UK' },
  ];

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: [''],
      id: [''],
      gender: [''],
      country: ['', [Validators.required]],
      address: this.fb.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
      })
    });
  }
  

  add(studentForm) {
    console.log(studentForm.valid)
    if (this.studentForm.valid) {
      this.student.push(this.studentForm.value);
    }
    this.studentForm.reset();
  }

  edit(f: any, i: any) {
    console.log(f, i);
    this.studentForm.patchValue({
      name: f.name,
      id: f.id,
      address: f.address,
      gender: f.gender,
    });
  }
  delete(i) {
    this.student.splice(i, 1);
  }
  
}
