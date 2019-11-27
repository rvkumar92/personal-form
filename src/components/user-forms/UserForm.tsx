import "./UserForm.css";
import { Form, IFields, required, isEmail } from "./Form";
import { Field } from "./Field";
import React from "react";

export const UserForm: React.SFC = () => {
  const fields: IFields = {
    uname: {
      id: "uname",
      label: "Username",
      validation: { rule: required }
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
      validation: { rule: required }
    },
    gender: {
      id: "gender",
      type: "radio",
      inputType: "radio",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
      ]
    },
    hobbies: {
      id: "hobbies",
      type: "checkbox",
      inputType: "checkbox",
      options: [
        { label: "Reading", value: "reading" },
        { label: "Writing", value: "writing" },
        { label: "Others", value: "others" }
      ]
    }
  };
  return (
    <Form
      fields={fields}
      render={() => (
        <React.Fragment>
          <Field {...fields.uname} />
          <Field {...fields.email} />
          <Field {...fields.password} />
          <Field {...fields.gender} />
          <Field {...fields.hobbies} />
        </React.Fragment>
      )}
    ></Form>
  );
};

export default UserForm;
