import { IFields } from "../interfaces";
import {
  passwordValidation,
  isEmail,
  usernameValidation
} from "../utility/Validation";

export const fields: IFields = {
  uname: {
    id: "uname",
    label: "Username",
    validation: { rule: usernameValidation }
  },
  email: {
    id: "email",
    label: "Email",
    type: "email",
    validation: { rule: isEmail }
  },
  password: {
    id: "password",
    label: "Password",
    type: "password",
    validation: { rule: passwordValidation }
  },
  gender: {
    id: "gender",
    type: "radio",
    inputType: "radio",
    label: "Gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" }
    ]
  },
  hobbies: {
    id: "hobbies",
    type: "checkbox",
    inputType: "checkbox",
    label: "Hobbies",
    options: [
      { label: "Reading", value: "reading" },
      { label: "Writing", value: "writing" },
      { label: "Others", value: "others" }
    ]
  }
};
