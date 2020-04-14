import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const ValidateAppForm = () => {
  <Formik
  initialValues={{
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
      zipCode: "",
      file: null
  }} 
  onSubmit={(values, {setSubmitting}) => {
      console.log(values);
  }}

  validationSchema = {Yup.object().shape({
      email: Yup.string().email().required("Required"),
      name: Yup.string().required(),
      address: Yup.string().required(),
      phoneNumber: Yup.string().required().min(10, "Phone number should has at least 10 numbers")
      .matches("((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}")
  })}

  >
      {props => {
          const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit
          } = props;

          return (
              <form autoComplete="off" onSubmit={handleSubmit}>

              </form>
          )
      }}
  </Formik>

};
