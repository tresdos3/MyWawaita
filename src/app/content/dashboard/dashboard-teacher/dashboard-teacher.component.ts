import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from '../../../core/interface/teacher';
import { DataService } from '../../../core/service/data.service';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.css']
})
export class DashboardTeacherComponent implements OnInit {

  private register_form: FormGroup;
  constructor(private go: Router, private formBuild: FormBuilder, private db: DataService) { }

  ngOnInit() {
    this.register_form = this.formBuild.group({
      name: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]],
      lastname: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]],
      ci: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]],
      from: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]],
      phone: ['', [
        Validators.required
      ]],
    });
  }
  register($data: Teacher, $isValid: boolean) {
    if ($isValid) {
      const $d: Teacher = {
        name: $data.name,
        lastname: $data.lastname,
        ci: $data.ci,
        from: $data.from,
        address: $data.from,
        actived: false,
      };
      this.db.set('teachers/+591' + $data.phone, $d)
        .then(res => { console.log('Registrado Correctamente'); })
        .catch(err => { console.log(err); });
    }
  }
}
