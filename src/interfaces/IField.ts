import { InputType, IValidation } from ".";

export interface IFieldProps {
  id: string;
  type?: string;
  label?: string;
  inputType?: InputType;
  options?: string[] | object[];
  value?: any;
  validation?: IValidation;
}
