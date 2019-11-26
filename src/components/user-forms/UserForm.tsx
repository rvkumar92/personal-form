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
        </React.Fragment>
      )}
    ></Form>
  );
};

export default UserForm;
