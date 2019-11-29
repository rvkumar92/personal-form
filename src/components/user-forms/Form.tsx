import { Component } from "react";
import React from "react";
import {
  IValues,
  IFormContext,
  IFormProps,
  IFormState,
  IErrors
} from "../../interfaces";
import { DisplayFormDetails } from "./DisplayFormDetails";
import "./Form.css";

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

    if (this.validateForm()) {
      const { formValues } = this.state;
      this.setState({ formSubmitted: !this.state.formSubmitted });
    }
  };

  public render() {
    const { errors } = this.state;
    const context: IFormContext = {
      ...this.state,
      setValues: this.setValues,
      validate: this.validate
    };

    const renderForm = (
      <form
        onSubmit={this.handleSubmit}
        noValidate={true}
        className="personal-form uk-form-horizontal"
      >
        <div className="uk-card uk-card-secondary uk-card-body uk-width-1-1@m card">
          {this.props.render()}
          <div className="uk-margin">
            <button
              type="submit"
              disabled={this.hasErrors(errors)}
              className="uk-button uk-button-secondary uk-button-small"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );

    return (
      <FormContext.Provider value={context}>
        {this.state.formSubmitted ? <DisplayFormDetails /> : renderForm}
      </FormContext.Provider>
    );
  }
}
