import "./App.css";

import * as React from "react";

import UserForm from "./components/user-forms/UserForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <h3 className="App-header">Personal Form</h3>
      <UserForm />
    </div>
  );
};

export default App;
