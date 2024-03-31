import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Profil from "./components/Profil/Profil";
import HomePage from "./components/HomePage/HomePage";
import Page404 from "./components/Page404/Page404";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./farebase";

function App() {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  });
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="log-in" element={<LogIn />} />
          <Route path="profil" element={<Profil authUser={authUser} />} />
          <Route
            path="profil/:popup/:name/:type"
            element={<Profil authUser={authUser}/>}
          />
          <Route
            path="sign-up/:popup/:name/:type"
            element={<SignUp />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
