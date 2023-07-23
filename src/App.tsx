import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PasswordEnter from "./Views/PasswordEnter";

function App() {
  const [dialedNums, setDialedNums] = useState("");
  return (
    <>
      <PasswordEnter onNumberDial={(num) => setDialedNums((c) => c + num.toString())} />
      <h1>{dialedNums}</h1>
    </>
  );
}

export default App;
