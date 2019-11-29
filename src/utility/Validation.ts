import { IValues } from "../interfaces";
import { passwordRegex, emailRegex } from "./Constants";

const required = (values: IValues, fieldName: string): string =>
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === ""
    ? "This field must be populated"
    : "";

export const isEmail = (values: IValues, fieldName: string): string =>
  values[fieldName] && values[fieldName].search(emailRegex)
    ? "Email should be of valid format"
    : "";

const usernameLength = (values: IValues, fieldName: string): string =>
  values[fieldName].length < 8 || values[fieldName].length > 20
    ? "Username should be of length 8 to 20"
    : "";

const passwordLength = (values: IValues, fieldName: string): string =>
  values[fieldName].length < 8 ? "Password should be of minimum length 8" : "";

const passContainNumber = (values: IValues, fieldName: string): string =>
  values[fieldName].search(passwordRegex)
    ? "Password must contain one Uppercase and one numeric character"
    : "";

export const usernameValidation = (
  values: IValues,
  fieldName: string
): string => {
  let error = "";
  if (error.length > 0) {
    return error;
  }
  error = usernameLength(values, fieldName);
  if (error.length > 0) {
    return error;
  }
  return error;
};

export const passwordValidation = (
  values: IValues,
  fieldName: string
): string => {
  console.log(values[fieldName]);
  let error = "";
  error = required(values, fieldName);
  if (error.length > 0) {
    return error;
  }
  error = passwordLength(values, fieldName);
  if (error.length > 0) {
    return error;
  }

  error = passContainNumber(values, fieldName);
  if (error.length > 0) {
    return error;
  }
  return error;
};
