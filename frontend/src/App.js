import React, { Component } from "react";
import { Button, TextField, Input } from "@material-ui/core";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      applicationData: {
        email: "",
        name: "",
        phoneNumber: "",
        address: "",
        zipCode: "",
        file: null,
      },
    };
  }

  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      applicationData: {
        ...this.state.applicationData,
        [name]: value,
      },
    });
  };

  fileInputChangeHandler = (e) => {
    this.setState({
      ...this.state,
      applicationData: {
        ...this.state.applicationData,
        file: e.target.files[0],
      },
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.applicationData.file);

    fetch("http://localhost:8000/post-image", {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => result.filePath)
      .then((imageUrl) => {
        const { applicationData } = this.state;
        const graphqlQuery = {
          query: `
            mutation {
              createDoc(docInput:
                {
                email: "${applicationData.email}",
                name: "${applicationData.name}",
                phoneNumber: "${applicationData.phoneNumber}",
                address: "${applicationData.address}",
                zipCode: "${applicationData.zipCode}",
                file: "${imageUrl}"
              }
              ){
                name
                email
            }
          `,
        };
        /* And the other fields you want here}*/

        fetch("http://localhost:8000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(graphqlQuery),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
          });
      });
  };

  render() {
    const {
      email,
      name,
      phoneNumber,
      address,
      zipCode,
    } = this.state.applicationData;
    console.log(this.state);

    return (
      <div className="App">
        <div className="Background"></div>
        <div className="Form">
          <h2>Send your application</h2>
          <TextField
            type="email"
            onChange={this.changeHandler}
            name="email"
            value={email}
            label="Email"
            variant="filled"
          />

          <TextField
            type="text"
            onChange={this.changeHandler}
            name="name"
            value={name}
            label="Name"
            variant="filled"
          />

          <TextField
            type="text"
            onChange={this.changeHandler}
            name="phoneNumber"
            value={phoneNumber}
            label="Phone number"
            variant="filled"
          />

          <TextField
            type="text"
            onChange={this.changeHandler}
            name="address"
            value={address}
            label="Address"
            variant="filled"
          />

          <TextField
            type="text"
            onChange={this.changeHandler}
            name="zipCode"
            value={zipCode}
            label="Zip code"
            variant="filled"
          />

          <Button variant="contained" component="label">
            Upload File
            <Input
              type="file"
              name="file"
              onChange={this.fileInputChangeHandler}
              style={{ display: "none" }}
            />
          </Button>
          <div className="SubmitButton">
            <Button
              variant="contained"
              color="primary"
              onClick={this.onFormSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
