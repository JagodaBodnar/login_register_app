import React from "react";
import { auth } from "../../firebase/firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { routes } from "../../routes/unloggedUserRoutes";
import styled from "styled-components";
import { FaUserTie } from "react-icons/fa";
import { device } from "../../globalStyles/device";

const StyledFormContainer = styled(Form)`
  margin: 20vh auto;
  width: 350px;
  min-height: 450px;
  background-color: rgba(25, 33, 33, 0.3);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${device.mobileS} {
    width: 300px;
  }
`;

const StyledTitle = styled.h1`
  color: #fff;
  font-size: 30px;
  font-weight: 300;
  margin: 5px 0 20px 0;
`;

const StyledLogInAvatar = styled(FaUserTie)`
  color: white;
  font-size: 55px;
`;

const StyledInput = styled(Field)`
  font-family: "Open Sans", sans-serif;
  margin: 5px 0;
  width: 70%;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 5px;
`;
const StyledErrorMessage = styled.p`
  color: #a7dbaf;
  font-size: 12px;
`;

const StyledInformationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  background-color: #7ebf88;
  border: none;
  width: 50%;
  color: #fff;
  text-transform: uppercase;
  padding: 8px;
  margin: 15px 0 15px 0;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
`;

const StyledHeaderFive = styled.h5`
  color: #fff;
  margin-right: 10px;
`;

const StyledRedirectionLink = styled(Link)`
  color: #a7dbaf;
  font-size: 16px;
`;

const FirebaseLoginForm = () => {
  const handleSignIn = (values) => {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {})
      .catch((error) => alert(` ${error}`));
  };

  const loginSchemaValidation = Yup.object().shape({
    email: Yup.string()
      .email("Your email must be valid and include @")
      .required("Email is required, please enter."),

    password: Yup.string().required("You must enter your password"),
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchemaValidation}
        onSubmit={(values) => {
          handleSignIn(values);
        }}
      >
        {({ values, handleChange }) => (
          <StyledFormContainer>
            <StyledLogInAvatar />
            <StyledTitle>Sign in</StyledTitle>
            <StyledInput
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
            />
            <ErrorMessage name="email">
              {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
            </ErrorMessage>
            <StyledInput
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password">
              {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
            </ErrorMessage>

            <StyledButton type="submit">Login</StyledButton>
            <StyledInformationContainer>
              <StyledHeaderFive>You don't have account?</StyledHeaderFive>
              <StyledRedirectionLink to={routes.register}>
                Create one!
              </StyledRedirectionLink>
            </StyledInformationContainer>
          </StyledFormContainer>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLoginForm;
