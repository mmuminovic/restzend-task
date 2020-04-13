import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      name: "",
      phoneNumber: "",
      address: "",
      zipCode: "",
      file: "",
    };
  }

  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  render() {
    console.log(this.state);
    const { email, name, phoneNumber, address, zipCode, file } = this.state;

    return (
      <div className="App">
        <input
          type="email"
          onChange={this.changeHandler}
          name="email"
          placeholder="Email"
          value={email}
        />
        <input
          type="text"
          onChange={this.changeHandler}
          name="name"
          placeholder="Name"
          value={name}
        />
        <input
          type="text"
          onChange={this.changeHandler}
          name="phoneNumber"
          placeholder="Phone number"
          value={phoneNumber}
        />
        <input
          type="text"
          onChange={this.changeHandler}
          name="address"
          placeholder="Address"
          value={address}
        />
        <input
          type="text"
          onChange={this.changeHandler}
          name="zipCode"
          placeholder="Zip code"
          value={zipCode}
        />
        <button onClick={this.submitHandler}>Submit</button>
      </div>
    );
  }
}

export default App;
