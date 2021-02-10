import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase/firebase";
import { setCurrentUser as setCurrentUserAction } from "./actions";
import MainTemplate from "./templates/MainTemplate";
import UnloggedUserTemplate from "./templates/UnloggedUserTemplate";

const App = () => {
  const selectedCurrentUser = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setCurrentUserAction(user));
        localStorage.setItem("currentUser", user.uid);
      } else {
        dispatch(setCurrentUserAction(null));
        localStorage.removeItem("currentUser");
      }
    });
  }, [selectedCurrentUser]);

  return (
    <BrowserRouter>
      {selectedCurrentUser ? <MainTemplate /> : <UnloggedUserTemplate />}
    </BrowserRouter>
  );
};

export default App;
