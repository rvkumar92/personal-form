import * as React from "react";
import { IErrors, IFormContext, FormContext, IValues } from "./Form";
type Editor = "textbox" | "multilinetextbox" | "dropdown";

export interface IValidation {
  rule: (values: IValues, fieldName: string, args: any) => string;
  args?: any;
}

export interface IFieldProps {
  id: string;
  type?: string;
  label?: string;
  editor?: Editor;
  options?: string[];
  value?: any;
  validation?: IValidation;
}

export const Field: React.FunctionComponent<IFieldProps> = ({
  id,
  type,
  label,
  editor,
  options,
  value
}) => {
  const getErrors = (errors: IErrors): string => (errors ? errors[id] : "");

  const getEditorStyle = (error: IErrors): any =>
    getErrors(error) ? { borderColor: "red" } : {};

  return (
    <FormContext.Consumer>
      {(context: IFormContext | undefined) => (
        <div>
          {getErrors(context!.errors) && (
            <div style={{ color: "red", fontSize: "80%" }}>
              <p>{getErrors(context!.errors)}</p>
            </div>
          )}

          {label && <label htmlFor={id}>{label}</label>}

          {editor!.toLowerCase() === "textbox" && (
            <input
              id={id}
              type={type}
              value={value}
              style={getEditorStyle(context!.errors)}
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                context!.setValues({ [id]: event.currentTarget.value })
              }
              onBlur={(event: React.FormEvent<HTMLInputElement>) =>
                context!.validate(id)
              }
            />
          )}
        </div>
      )}
    </FormContext.Consumer>
  );
};

Field.defaultProps = {
  editor: "textbox",
  type: "text"
};
