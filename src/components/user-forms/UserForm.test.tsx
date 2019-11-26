import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";

import React from "react";
import UserForm from "./UserForm";

afterEach(cleanup);

const setup = () => {
  const userForm = render(<UserForm />);
  return { ...userForm };
};
describe("UserForm test suite", () => {
  it("renders without crashing", () => {
    const { container } = setup();
    expect(container.isConnected).toBe(true);
  });

  it("should display UserForm heading", async () => {
    const { container, getByText } = setup();
    await waitForElement(() => getByText(/User Form/));
  });

  it("should render username input text box", () => {
    const { getByLabelText } = setup();
    const input: any = getByLabelText("uname");
    expect(input).toBeDefined();
    fireEvent.change(input, { target: { value: "rvkumar" } });
    expect(input.value).toBe("rvkumar");
  });

  it("should render email input text box", () => {
    const { getByLabelText } = setup();
    const input: any = getByLabelText("email");
    expect(input).toBeDefined();
    fireEvent.change(input, { target: { value: "rvk@gmail.com" } });
    expect(input.value).toBe("rvk@gmail.com");
  });

  it("should render password input text box", () => {
    const { getByLabelText } = setup();
    const input: any = getByLabelText("password");
    expect(input).toBeDefined();
    fireEvent.change(input, { target: { value: "born2win" } });
    expect(input.value).toBe("born2win");
  });
});

describe("Validating all the input elements", () => {
  it("should validate username text box", () => {
    const { getByLabelText } = setup();
    const input: any = getByLabelText("uname");
    fireEvent.change(input, { target: { value: "rvkumar" } });
    expect(input.value).not.toBe("");
    fireEvent.change(input, { target: { value: "!@#$" } });
    const expected: RegExp = /^[a-zA-Z0-9]*/gi;
    const validate = !!input.value.match(expected).filter(Boolean).length;
    expect(validate).toBeFalsy();

    const minLength = 8;
    const maxLength = 20;

    fireEvent.change(input, { target: { value: "rvkumar92" } });
    expect(input.value.length).not.toBeLessThan(minLength);
    expect(input.value.length).not.toBeGreaterThan(maxLength);
  });
});
