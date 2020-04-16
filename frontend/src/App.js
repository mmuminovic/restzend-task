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
