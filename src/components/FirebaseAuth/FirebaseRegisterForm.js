import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
import { routes } from "../../routes/unloggedUserRoutes";
import styled from "styled-components";
import { device } from "../../globalStyles/device";

const StyledFormContainer = styled(Form)`
  margin: 20vh auto;
  width: 350px;
  min-height: 500px;
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
const StyledConsentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: 0 auto;
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
const StyledLabel = styled.label`
  color: #fff;
  font-size: 12px;
  margin: 20px 5px;
`;

const StyledRedirectionLink = styled(Link)`
  color: #a7dbaf;
  font-size: 16px;
`;

const FirebaseRegisterForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isUserAccountCreated, setUserAccountCreated] = useState(false);

  const handleSignUp = (values) => {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        setUserAccountCreated(true);
      })
      .catch((error) => alert(` ${error}`));
  };

  const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Your email must be valid and include @")
      .required("Email is required, please enter."),

    password: Yup.string().required("You must enter your password"),
    acceptTerms: Yup.bool().oneOf([true], "You must accept terms."),
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", acceptTerms: false }}
        validationSchema={registerValidationSchema}
        onSubmit={(values) => {
          setUserEmail(values.email);
          setUserPassword(values.password);
          handleSignUp(values);
        }}
      >
        {({ values, handleChange }) => (
          <StyledFormContainer>
            <StyledTitle>Registration</StyledTitle>
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
            <StyledConsentContainer>
              <Field type="checkbox" name="acceptTerms" id="acceptTerms" />
              <StyledLabel htmlFor="acceptTerms">
                I agree to the processing of personal data provided in this
                form.
              </StyledLabel>
            </StyledConsentContainer>
            <ErrorMessage name="acceptTerms">
              {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
            </ErrorMessage>

            <StyledButton type="submit">
              Register
              {isUserAccountCreated ? <Redirect to={routes.login} /> : ""}
            </StyledButton>
            <StyledInformationContainer>
              <StyledHeaderFive>You already have account?</StyledHeaderFive>
              <StyledRedirectionLink to={routes.login}>
                Log in
              </StyledRedirectionLink>
            </StyledInformationContainer>
          </StyledFormContainer>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegisterForm;
