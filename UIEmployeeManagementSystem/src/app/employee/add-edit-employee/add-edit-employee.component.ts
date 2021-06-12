import { Component, Input, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  constructor(private service:SharedService,private fb: FormBuilder) { }

  @Input() emp:any;
  EmployeeId:string;
  EmployeeName:string;
  DepartmentId:string;
  Email:string;
  Age:string;
  Address:string;
  JoinedDate:string;
  AvatarName:string;
  PhotoFilePath:string;

  DepartmentsList:any=[];

  ngOnInit(): void {
    this.loadDepartmentList();
    this.initForm();
  }

  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentsList=data;

      this.EmployeeId=this.emp.EmployeeId;
      this.EmployeeName=this.emp.EmployeeName;
      this.DepartmentId= this.emp.DepartmentId;
      this.Address = this.emp.Address;
      this.Email = this.emp.Email;
      this.Age = this.emp.Age;
      this.JoinedDate=this.emp.DateOfJoining;
      this.AvatarName=this.emp.AvatarName;
      this.PhotoFilePath=this.service.AvatarUrl+this.AvatarName;
    });
  }

  addEmployee(){
    var val = {EmployeeId:this.EmployeeId,
                EmployeeName:this.EmployeeName,
                DepartmentId:this.DepartmentId,
                JoinedDate:this.JoinedDate,
                Email : this.Email,
                Address : this.Address,
                Age : this.Age,
                AvatarName:this.AvatarName};

    this.service.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateEmployee(){
    var val = {EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      DepartmentId:this.DepartmentId,
      JoinedDate:this.JoinedDate,
      Email : this.Email,
      Address : this.Address,
      Age : this.Age,
      AvatarName:this.AvatarName};

    this.service.updateEmployee(val).subscribe(res=>{
    alert(res.toString());
    });
  }


  uploadPhoto(event){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.AvatarName=data.toString();
      this.PhotoFilePath=this.service.AvatarUrl+this.AvatarName;
    })
  }
  initForm(): void {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
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





  