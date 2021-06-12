import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UIEmployeeManagementSystem';
  employeeForm: FormGroup;
  constructor(private fb: FormBuilder){
    
  }


  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      EmployeeName: ['', Validators.required],
      Age: ['', Validators.required],
      Address: ['', Validators.required],
      JoinedDate: ['', Validators.required],
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]]
    });
  }

  isValidInput(fieldName): boolean {
    return this.employeeForm.controls[fieldName].invalid &&
      (this.employeeForm.controls[fieldName].dirty || this.employeeForm.controls[fieldName].touched);
  }
}







  



 
