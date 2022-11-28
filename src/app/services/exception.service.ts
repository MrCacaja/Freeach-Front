import { Injectable } from '@angular/core';
import {ValidationErrors} from "@angular/forms";
import {FormErrors} from "../consts/form-errors.dict";
import {ExceptionErrors} from "../consts/exception-errors.dict";

@Injectable({
  providedIn: 'root'
})
export class ExceptionService {

  constructor() { }

  treatFormError(errors: ValidationErrors | null): string {
    if (!errors) {
      return '';
    }
    const errorMessages: string[] = [];
    Object.entries(errors).forEach(([key, value]) => {
      let errorMessage = FormErrors[key];
      if (key === 'minlength') {
        errorMessage = errorMessage.replace('[x]', value.requiredLength);
      }
      errorMessages.push(errorMessage);
    });
    return errorMessages.join('\n');
  }

  exceptionErrorMessage(error: any): string {
    if (!error) {
      return ExceptionErrors['default'];
    }
    const possibleKeys = ['code', 'message', 'name'];
    for (const key of possibleKeys) {
      if (ExceptionErrors[error[key]]) {
        return ExceptionErrors[error[key]]
      }
    }
    return typeof error === 'string' ? error : ExceptionErrors['default'];
  }
}
