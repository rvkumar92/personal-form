import * as React from "react";
import { IErrors, IFormContext, FormContext, IValues } from "./Form";

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
        <div>
          {getErrors(context!.errors) && (
            <div style={{ color: "red", fontSize: "80%" }}>
              <p>{getErrors(context!.errors)}</p>
            </div>
          )}

          {label && <label htmlFor={id}>{label}</label>}

          {inputType!.toLowerCase() === "textbox" && (
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

          {type!.toLowerCase() === "radio" && Array.isArray(options) && (
            <React.Fragment>
              {(options as GenderOptions[]).map(opt => (
                <label>
                  <input
                    id={id}
                    type="radio"
                    value={opt.value}
                    checked={context!.formValues[id] === opt.value}
                    onChange={(event: React.FormEvent<HTMLInputElement>) =>
                      context!.setValues({ [id]: event.currentTarget.value })
                    }
                  />
                  {opt.label}
                </label>
              ))}
            </React.Fragment>
          )}
          {type!.toLowerCase() === "checkbox" && Array.isArray(options) && (
            <React.Fragment>
              {(options as HobbiesOption[]).map(opt => (
                <label>
                  <input
                    id={id}
                    type="checkbox"
                    value={opt.value}
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
                  {opt.value.toLowerCase() === "others" &&
                    context!.formValues[id].get(opt.value) === true && (
                      <input
                        type="text"
                        id="others"
                        onBlur={(event: React.FormEvent<HTMLInputElement>) => {
                          context!.validate(id);
                          context!.setValues({
                            [id]: context!.formValues[id].set(
                              event.currentTarget.value,
                              true
                            )
                          });
                        }}
                      />
                    )}
                </label>
              ))}
            </React.Fragment>
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
