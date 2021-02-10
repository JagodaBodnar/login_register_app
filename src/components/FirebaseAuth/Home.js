import React from "react";
import { auth } from "../../firebase/firebase";
import styled from "styled-components";

const StyledInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 20vh auto;
`;

const StyledButton = styled.button`
  background-color: #7ebf88;
  border: none;
  width: 30%;
  color: #fff;
  text-transform: uppercase;
  padding: 8px;
  margin: 15px 0 15px 0;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
`;
const StyledTitle = styled.h1`
  color: #fff;
  font-size: 30px;
  font-weight: 300;
  margin: 5px 0 20px 0;
`;

const Home = () => {
  const handleSignOut = () => auth.signOut();

  return (
    <StyledInformationContainer>
      <StyledTitle>You have successfully logged in!</StyledTitle>
      <StyledButton onClick={handleSignOut}>logout</StyledButton>
    </StyledInformationContainer>
  );
};

export default Home;
