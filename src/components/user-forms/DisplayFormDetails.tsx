import * as React from "react";
import { FormContext } from "./Form";
import { IFormContext } from "../../interfaces";

export const DisplayFormDetails: React.SFC<{}> = () => (
  <FormContext.Consumer>
    {(context: IFormContext | undefined) => {
      return <div>Hello</div>;
    }}
  </FormContext.Consumer>
);
