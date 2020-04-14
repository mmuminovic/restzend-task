import React, { Component } from "react";
import Form from "./components/ValidateAppForm";
import ClipLoader from "react-spinners/ClipLoader";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  onFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("image", values.file);

    fetch("http://localhost:8000/post-image", {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => result.filePath)
      .then((imageUrl) => {
        this.setState({ loading: true });
        const graphqlQuery = {
          query: `
            mutation {
              createDoc(docInput:
                {
                email: "${values.email}",
                name: "${values.name}",
                phoneNumber: "${values.phoneNumber}",
                address: "${values.address}",
                zipCode: "${values.zipCode}",
                file: "${imageUrl}"
              }
              ){
                name
                email
            }
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
            this.setState({ loading: false });
          });
      });
  };

  render() {
    return (
      <div>
        <div className="Background"></div>
        {this.state.loading ? (
          <div className="App">
            <ClipLoader
              size={150}
              color={"#3f51b5"}
              loading={this.state.loading}
            />
          </div>
        ) : (
          <Form submit={this.onFormSubmit} />
        )}
      </div>
    );
  }
}

export default App;
