import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Input } from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Modal from "./Modal/Modal";
import "../App.css";

const CREATE_DOC = gql`
  mutation createDoc(
    $email: String!
    $name: String!
    $phoneNumber: String!
    $address: String!
    $zipCode: String!
    $files: Upload
  ) {
    createDoc(
      email: $email
      name: $name
      phoneNumber: $phoneNumber
      address: $address
      zipCode: $zipCode
      files: $files
    ) {
      name
      email
      phoneNumber
      address
      zipCode
      files
    }
  }
`;

const ValidateAppForm = () => {
  let [createDoc, { data }] = useMutation(CREATE_DOC);

  const [modal, setModal] = useState(true);

  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        address: "",
        phoneNumber: "",
        zipCode: "",
        files: "",
      }}
      onSubmit={(values) => {
         createDoc({ variables: { ...values } });
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        name: Yup.string().required("Name is required"),
        address: Yup.string().required("Address is required"),
        phoneNumber: Yup.string()
          .required("Phone number is required")
          .min(10, "Phone number should has at least 10 numbers")
          .matches(
            /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
            "Phone number has to be in format (213) 456-1545"
          ),
        zipCode: Yup.number()
          .min(6, "Zip code has at least 6 numbers")
          .required("Zip code is required"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <div className="App">
            <Modal show={data && modal} modalClosed={() => setModal(false)}>
              {data && (
                <div className="modal">
                  <h3>Application sent successfuly</h3>
                  <h4>Your application:</h4>
                  <p>Name: {data.createDoc.name}</p>
                  <p>Email: {data.createDoc.email}</p>
                  <p>Phone Number: {data.createDoc.phoneNumber}</p>
                  <p>Address: {data.createDoc.address}</p>
                  <p>Zip code: {data.createDoc.zipCode}</p>
                  <p>File: {data.createDoc.files}</p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </Button>
                </div>
              )}
            </Modal>
            <div className="Form">
              <h2>Send your application</h2>
              <TextField
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                value={values.email}
                label="Email"
                variant="filled"
              />
              {errors.email && touched.email && <div>{errors.email}</div>}
              <TextField
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                value={values.name}
                label="Name"
                variant="filled"
              />
              {errors.name && touched.name && <div>{errors.name}</div>}
              <TextField
                type="text"
                onChange={(e) => {
                  const deleting =
                    values.phoneNumber.length > e.target.value.length;
                  handleChange(e);
                  if (!deleting && e.target.value.length === 3) {
                    handleChange({
                      target: {
                        name: "phoneNumber",
                        value: `(${e.target.value}) `,
                      },
                    });
                  }
                  if (!deleting && e.target.value.length === 9) {
                    handleChange({
                      target: {
                        name: "phoneNumber",
                        value: `${e.target.value}-`,
                      },
                    });
                  }
                }}
                onBlur={handleBlur}
                name="phoneNumber"
                value={values.phoneNumber}
                label="Phone number"
                variant="filled"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div>{errors.phoneNumber}</div>
              )}
              <TextField
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                name="address"
                value={values.address}
                label="Address"
                variant="filled"
              />
              {errors.address && touched.address && <div>{errors.address}</div>}
              <TextField
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                name="zipCode"
                value={values.zipCode}
                label="Zip code"
                variant="filled"
              />
              {errors.zipCode && touched.zipCode && <div>{errors.zipCode}</div>}
              <Button variant="contained" component="label">
                Upload File
                <Input
                  type="file"
                  name="files"
                  onChange={(e) => {
                    handleChange({
                      target: { name: "files", value: e.target.files[0] },
                    });
                  }}
                  style={{ display: "none" }}
                />
              </Button>
              <div className="SubmitButton">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default ValidateAppForm;
