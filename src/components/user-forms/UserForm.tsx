import "./UserForm.css";
import { Form } from "./Form";
import { Field } from "./Field";
import React from "react";
import { fields } from "../../utility/FormConfig";

export const UserForm: React.SFC = () => {
  return (
    <Form
      fields={fields}
      render={() => (
        <div className="uk-container">
          <Field {...fields.uname} />
          <Field {...fields.email} />
          <Field {...fields.password} />
          <Field {...fields.gender} />
          <Field {...fields.hobbies} />
        </div>
      )}
    ></Form>
  );
};

export default UserForm;
