import * as React from "react";
import { FormContext } from "./Form";
import {
  IFieldProps,
  IFormContext,
  IErrors,
  GenderOptions,
  HobbiesOption
} from "../../interfaces";

export const Field: React.FunctionComponent<IFieldProps> = ({
  id,
  type,
  label,
  inputType,
  options,
  value
}) => {
  const getErrors = (errors: IErrors): string => (errors ? errors[id] : "");

  const getEditorStyle = (error: IErrors): any =>
    getErrors(error) ? { borderColor: "red" } : {};

  return (
    <FormContext.Consumer>
      {(context: IFormContext | undefined) => (
        <div className="uk-margin">
          {getErrors(context!.errors) && (
            <div style={{ color: "red", fontSize: "80%", fontWeight: "bold" }}>
              <p>{getErrors(context!.errors)}</p>
            </div>
          )}

          {label && (
            <label htmlFor={id} className="uk-form-label">
              {label}
            </label>
          )}

          {inputType!.toLowerCase() === "textbox" && (
            <div className="uk-form-controls">
              <input
                id={id}
                type={type}
                value={value}
                style={getEditorStyle(context!.errors)}
                className="uk-input"
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  context!.setValues({ [id]: event.currentTarget.value })
                }
                onBlur={(event: React.FormEvent<HTMLInputElement>) =>
                  context!.validate(id)
                }
              />
            </div>
          )}

          {type!.toLowerCase() === "radio" && Array.isArray(options) && (
            <div className="uk-form-controls uk-form-controls-text radio-group">
              {(options as GenderOptions[]).map(opt => (
                <>
                  <label>
                    <input
                      id={id}
                      type="radio"
                      className="uk-radio"
                      value={opt.value}
                      checked={context!.formValues[id] === opt.value}
                      onChange={(event: React.FormEvent<HTMLInputElement>) =>
                        context!.setValues({ [id]: event.currentTarget.value })
                      }
                    />
                    {opt.label}
                  </label>
                  <br />
                </>
              ))}
            </div>
          )}
          {type!.toLowerCase() === "checkbox" && Array.isArray(options) && (
            <div className="uk-form-controls uk-form-controls-text checkbox-group">
              {(options as HobbiesOption[]).map(opt => (
                <>
                  <label>
                    <input
                      id={id}
                      type="checkbox"
                      value={opt.value}
                      className="uk-checkbox"
                      checked={context!.formValues[id].get(opt.value) || false}
                      onChange={(event: React.FormEvent<HTMLInputElement>) =>
                        context!.setValues({
                          [id]: context!.formValues[id].set(
                            opt.value,
                            event.currentTarget.checked
                          )
                        })
                      }
                    />
                    {opt.label}
                  </label>
                  <br />
                  {opt.value.toLowerCase() === "others" &&
                    context!.formValues[id].get(opt.value) === true && (
                      <div className="">
                        <input
                          type="text"
                          id="others"
                          className="uk-input"
                          onBlur={(
                            event: React.FormEvent<HTMLInputElement>
                          ) => {
                            context!.validate(id);
                            context!.setValues({
                              [id]: context!.formValues[id].set(
                                event.currentTarget.value,
                                true
                              )
                            });
                          }}
                        />
                      </div>
                    )}
                </>
              ))}
            </div>
          )}
        </div>
      )}
    </FormContext.Consumer>
  );
};

Field.defaultProps = {
  inputType: "textbox",
  type: "text"
};
