interface IValidateErrors {
  [key: string]: string;
}

export default interface IValidate {
  isValid: boolean;
  errors: IValidateErrors;
}
