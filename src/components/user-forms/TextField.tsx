import React, { Component } from "react";

interface TextFieldProps {
  type: string;
  label: string;
}

interface TextFieldState {}

export class TextField extends Component<TextFieldProps, TextFieldState> {
  state: TextFieldState = {};
  render() {
    const { type, label } = this.props;
    return <div></div>;
  }
}
