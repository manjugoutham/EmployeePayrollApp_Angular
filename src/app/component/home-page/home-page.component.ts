import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data-service';
// import { DataService } from 'src/app/service/data.service';
import { HttpService } from '../../service/http.service';
import { AddUserComponent } from '../add-user/add-user.component';

/* A decorator. It is used to define a component. */
@Component({
  selector: 'app-home-page',
  template: '<app-add-user [employeeData]="employee"></app-add-user>',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public employeeCount: number = 0; 
  public employeeDetails: Employee[] = [];

  constructor(private httpService: HttpService,
              private router: Router,
              private dataService: DataService,
              public dialog: MatDialog,
              ) { }
              

  /**
   * It gets the employee data from the server and displays it in the employee list.
   */
  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(data => {
      this.employeeDetails = data.data;
      this.employeeCount = this.employeeDetails.length;
      console.log(this.employeeDetails);
    });
  }

  /**
   * It opens a dialog box.
   */
  openAddPerson() {
    this.dialog.open(AddUserComponent, {
      width: '70%',
      height:'100%'
    });
  }
  /**
   * Remove an employee from the employee list
   * @param {number} empId - number
   */
  remove(empId: number): void {
    console.log(empId)
    this.httpService.deleteEmployeeData(empId).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }

  /**
   * Update an employee's data in the database
   * @param {Employee} employee - Employee
   */
  update(employee: Employee): void {
    this.dataService.changeEmployee(employee);
    this.router.navigateByUrl('/add-user/' + employee.employeeId);
    this.httpService.updateEmployeData(employee.employeeId, employee).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }

}
