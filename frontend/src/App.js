import React, { Component } from "react";
import Form from "./components/ValidateAppForm";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "./components/Modal/Modal";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      showModal: false,
      application: {
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        zipCode: "",
        files: "",
      },
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
                files: "${imageUrl}"
              }
              ){
                name
                email
                phoneNumber
                address
                zipCode
                files
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
            this.setState({
              loading: false,
              showModal: true,
              application: {
                ...this.state.application,
                ...result.data.createDoc,
              },
            });
          });
      });
  };

  closeModalHandler = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      name,
      email,
      address,
      phoneNumber,
      zipCode,
    } = this.state.application;

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
        <Modal show={this.state.showModal} modalClosed={this.closeModalHandler}>
          <div className="modal">
            <h3>Application sent successfuly</h3>
            <h4>Your application:</h4>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone Number: {phoneNumber}</p>
            <p>Address: {address}</p>
            <p>Zip code: {zipCode}</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
