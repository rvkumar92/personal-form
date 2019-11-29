import * as React from "react";
import { FormContext } from "./Form";
import { IFormContext } from "../../interfaces";

export const DisplayFormDetails: React.SFC<{}> = () => (
  <FormContext.Consumer>
    {(context: IFormContext | undefined) => {
      const formValues = context!.formValues;
      console.log(formValues);
      return (
        <section className="section uk-section uk-section-secondary uk-light">
          <h4>Personal Details</h4>
          <h6>
            <label className="uk-text-bold uk-text-meta">Username - </label>
            <span className="uk-text-lead uk-text-emphasis">
              {formValues.uname}
            </span>
          </h6>
          <h6>
            <label className="uk-text-bold uk-text-meta">Email - </label>
            <span className="uk-text-lead uk-text-emphasis">
              {formValues.email}
            </span>
          </h6>
          <h6>
            <label className="uk-text-bold uk-text-meta">Password - </label>
            <span className="uk-text-lead uk-text-emphasis">
              {formValues.password}
            </span>
          </h6>
          <h6>
            <label className="uk-text-bold uk-text-meta">Gender - </label>
            <span className="uk-text-lead uk-text-emphasis">
              {formValues.gender}
            </span>
          </h6>
          <h6>
            <label className="uk-text-bold uk-text-meta">Hobbies - </label>
            <span>{formValues.hobbies}</span>
          </h6>
        </section>
      );
    }}
  </FormContext.Consumer>
);
