import React from "react";
import "../../App.css";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";

const Modal = (props) => {
//   const GET_DOCS = gql`
//     {
//       getDocs {
//         id
//         name
//         email
//         phoneNumber
//         address
//         zipCode
//         files
//       }
//     }
//   `;
  // const { loading, error, data } = useQuery(GET_DOCS, {
  //   // pollInterval: 5000, //Call Function eache 5 seconds
  // });
  return (
    <div>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
        {/* {data.getDocs && (
          <div className="modal">
            <h3>Application sent successfuly</h3>
            <h4>Your application:</h4>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone Number: {phoneNumber}</p>
            <p>Address: {address}</p>
            <p>Zip code: {zipCode}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Modal;
