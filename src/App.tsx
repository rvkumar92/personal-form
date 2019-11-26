import "./App.css";

import * as React from "react";

import UserForm from "./components/user-forms/UserForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <UserForm />
    </div>
  );
};

export default App;
