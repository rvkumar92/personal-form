import { Component } from "react";
import React from "react";
import { IFieldProps } from "./Field";

export const required = (values: IValues, fieldName: string): string =>
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === ""
    ? "This field must be populated"
    : "";

export const isEmail = (values: IValues, fieldName: string): string =>
  values[fieldName] &&
  values[fieldName].search(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
    ? "Email should be of valid format"
    : "";

export const usernameLength = (values: IValues, fieldName: string): string =>
  values[fieldName] &&
  values[fieldName].length > 8 &&
  values[fieldName].length < 20
    ? "Username should be of length 8 to 20"
    : "";

export const passwordLength = (values: IValues, fieldName: string): string =>
  values[fieldName] && values[fieldName].length > 8
    ? "Password should be of minimum length 8"
    : "";
export interface IFields {
  [key: string]: IFieldProps;
}

interface IFormProps {
  fields: IFields;
  render: () => React.ReactNode;
}

export interface IValues {
  [key: string]: any;
}

export interface IErrors {
  [key: string]: string;
}

export interface IFormState {
  formValues: IValues;

  errors: IErrors;

  submitSuccess?: boolean;
}

export interface IFormContext extends IFormState {
  setValues: (values: IValues) => void;
  validate: (fieldName: string) => void;
}
export const FormContext = React.createContext<IFormContext | undefined>(
  undefined
);

export class Form extends Component<IFormProps, IFormState> {
  constructor(props: any) {
    super(props);

    const errors: IErrors = {};
    const formValues: IValues = { hobbies: new Map() };

    this.state = {
      errors,
      formValues
    };
  }

  private setValues = (values: IValues) => {
    this.setState({ formValues: { ...this.state.formValues, ...values } });
  };

  private hasErrors(errors: IErrors) {
    let hasError: boolean = false;
    Object.keys(errors).map((key: string) => {
      if (errors[key].length > 0) {
        hasError = true;
      }
    });
    return hasError;
  }

  private validate = (fieldName: string): string => {
    let newError: string = "";
    if (
      this.props.fields[fieldName] &&
      this.props.fields[fieldName].validation
    ) {
      newError = this.props.fields[fieldName].validation!.rule(
        this.state.formValues,
        fieldName,
        this.props.fields[fieldName].validation!.args
      );
    }

    this.state.errors[fieldName] = newError;
    this.setState({ errors: { ...this.state.errors, [fieldName]: newError } });

    return newError;
  };

  private validateForm(): boolean {
    const errors: IErrors = {};
    Object.keys(this.props.fields).map((fieldName: string) => {
      errors[fieldName] = this.validate(fieldName);
    });
    this.setState({ errors });
    return !this.hasErrors(errors);
  }

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(this.state.formValues);

    if (this.validateForm()) {
      // const submitSuccess =
    }
  };

  public render() {
    const { submitSuccess, errors } = this.state;
    const context: IFormContext = {
      ...this.state,
      setValues: this.setValues,
      validate: this.validate
    };

    return (
      <FormContext.Provider value={context}>
        <form onSubmit={this.handleSubmit} noValidate={true}>
          <div>
            {this.props.render()}
            <div>
              <button type="submit" disabled={this.hasErrors(errors)}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </FormContext.Provider>
    );
  }
}
