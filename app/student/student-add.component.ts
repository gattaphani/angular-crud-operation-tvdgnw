import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Country, States, Student } from './student-interface';

@Component({
  selector: 'student-add',
  templateUrl: './student-add.component.html',
  styles: [`input{width:100%;padding: 10px 15px;margin:5px auto;}`],
})
export class StudentAddComponent implements OnInit {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  student: Student[] = [
    {
      name: 'phani',
      stu_id: 10,
      gender: 'female',
      country: 'India',
      address: 'gdv',
    },
  ];

  countryList: Country[] = [
    { id: 1, name: 'India' },
    { id: 2, name: 'US' },
    { id: 3, name: 'UK' },
  ];

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: [''],
      stu_id: [''],
      gender: [''],
      country: ['', [Validators.required]],
      address: this.fb.group({
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
      }),
    });
  }

  states: any[];

  dropdownState: any = [];

  onSelectCountry(id: number) {
    console.log(id);
    this.dropdownState = this.getStates().filter((i) => i.country_id == id);
    console.log(this.dropdownState);
  }

  getStates() {
    return [
      { id: 1, country_id: 1, name:[ 'GUJ','MA','RAJ'] },
      { id: 2, country_id: 2, name: 'MA' },
      { id: 3, country_id: 3, name: 'RAJ' },
      { id: 4, country_id: 4, name: 'Atlanta' },
      { id: 5, country_id: 5, name: 'London' },
    ];
  }

  dropdownCity: any = [];
  onSelectState(id: number) {
    debugger
    console.log(id);
    this.dropdownCity = this.getCity().filter((i) => i.state == id);
    console.log(this.dropdownCity);
  }

  getCity() {
    return [
      { id: 1, name: 'Ahmedabad', state: 1 },
      { id: 2, name: 'Rajkot', state: 1 },
      { id: 3, name: 'Gandhinagar', state: 1 },
      { id: 4, name: 'Mumbai', state: 1 },
      { id: 5, name: 'Pune', state: 1 },
      { id: 6, name: 'Udaipur', state: 1 },
      { id: 7, name: 'Jaipur', state: 1 },
      { id: 7, name: 'NYC', state: 4 },
      { id: 7, name: 'Vatican City', state: 4 },
    ];
  }

  // dropdownCity: any = [];
  // onSelectCity(id: number) {
  //   this.dropdownCity = this.getCity().filter((i) => i.state == id);
  // }

  add(studentForm) {
    console.log(studentForm.valid);
    if (this.studentForm.valid) {
      this.student.push(this.studentForm.value);
    }
    this.studentForm.reset();
  }

  edit(f: any, i: any) {
    console.log(f, i);
    this.studentForm.patchValue({
      name: f.name,
      stu_id: f.stu_id,
      address: f.address,
      gender: f.gender,
    });
  }
  delete(i) {
    this.student.splice(i, 1);
  }
}
