import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATION_MESSAGE:any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength: 'Field is too short',
  notMatch: 'Password and confirm password does not match'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges{
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorWhen:boolean = true;
  errorMessage:string[]=[];

  constructor() {   }

  ngOnChanges(changes: SimpleChanges):void{
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    })
    this.control.valueChanges.subscribe(()=> {
      this.checkValidation();
    })
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessage = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessage = errorKeys.map(key => VALIDATION_MESSAGE[key])
  }
}
