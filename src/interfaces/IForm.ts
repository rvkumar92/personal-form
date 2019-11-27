import { IValues, IErrors, IFieldProps } from ".";

export interface IFormState {
  formValues: IValues;

  errors: IErrors;

  submitSuccess?: boolean;
  formSubmitted?: boolean;
}

export interface IFormProps {
  fields: IFields;
  render: () => React.ReactNode;
}

export interface IFields {
  [key: string]: IFieldProps;
}

export interface IFormContext extends IFormState {
  setValues: (values: IValues) => void;
  validate: (fieldName: string) => void;
}
