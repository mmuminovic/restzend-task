import React, { Component } from "react";

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
        }).then(res => res.json())
        .then(result => {
          console.log(result);
        });
      });
  };

  render() {
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
        <input type="file" name="file" onChange={this.fileInputChangeHandler} />
        <button onClick={this.onFormSubmit}>Submit</button>
      </div>
    );
  }
}

export default App;
