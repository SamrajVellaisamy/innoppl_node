import { Component, OnInit, ViewChild, HostListener, OnChanges, Input } from '@angular/core';
import { ServicesService } from '../services.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wsa-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {
  public bsValue: any;
  public from_list: any = [];
  public to_list: any = [];
  public addDept: FormGroup;
  public addproject: FormGroup;
  public addUser: FormGroup;
  public addJob: FormGroup;
  public editVal: any;
  public showtype: string;
  public submitted: boolean = true;
  public inv_check: boolean = true;
  public invigilatorList: any;
  public my_time: Date;
  public minDate = new Date();
  public profile: any;
  
  constructor(private service: ServicesService, private formBuilder: FormBuilder, private route: Router, private activatedRoute: ActivatedRoute) {
    // if (this.editVal.edit) {
    this.addDept = this.formBuilder.group({
      department: [{ value: null, disabled: false }, [Validators.required]],
    });

    this.addproject = this.formBuilder.group({
      project: [{ value: null, disabled: false }, [Validators.required]],
    });

    this.addUser = this.formBuilder.group({
      email: [{ value: null, disabled: false }, [Validators.required]],
      name: [{ value: null, disabled: false }, [Validators.required]]
    });

    this.addJob = this.formBuilder.group({
      department: [{ value: null, disabled: false }, [Validators.required]],
      project: [{ value: null, disabled: false }, [Validators.required]],
      employee: [{ value: null, disabled: false }, [Validators.required]],
    });
  }
 

  ngOnInit(): void {
    this.fromDept();
    // this.categoryList();
  }



  fromDept() {
    this.service.Post('auth/viewdepartment', {}).then((res: any) => {
      if (res.status == 200) {
        console.log(res.result);
        this.from_list = res.result;
        this.to_list = this.from_list;
      } else {
        // this.service.showtoaster('Department has not found...','Department','error');
      }
    })
  }

  // submit() {  
  //   // stop here if form is invalid
  //   if (this.createTest.value) {
  //     return;
  //   }
  // }

  submit() {
    // this.service.loader.start();
    if (this.addDept.invalid) {
      console.log(this.addDept);
    } else {
      let data = {
        department: this.addDept.value.department,
      };
      this.service.Post('auth/Createdepartment', data).then((res: any) => {
        if (res.status == 201) {
          this.addDept.reset();
          this.submitted = true;
          // this.service.showtoaster('Job assign created...','Job assign','success');
        } else {
          // this.service.showtoaster('Job assign create failed...','Job assign','error');
        }
      });
    }
    // this.service.loader.stop();
  }

  get f() {
    return this.addDept.controls;
  }

  get j() {
    return this.addJob.controls;
  }

}
