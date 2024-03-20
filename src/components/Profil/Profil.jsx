// Profil

import React, { useState, useEffect } from "react";
import { auth } from "../../farebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import Popup from "../Popup";

const FlexText = ({ children }) => {
  return <p className="flex justify-between items-center">{children}</p>;
};

export default function Profil({ authUser }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (authUser) {
      setEmail(authUser.email);
      setName(authUser.displayName);
      setPassword(true);
    }
  }, [authUser]);
  if (!authUser) {
    return <h1 className=" text-3xl">Please register</h1>;
  }
  if(!auth.currentUser.emailVerified){
    return <h1 className=" text-3xl">Please register in full</h1>;
  } 
  // console.log(auth.currentUser.emailVerified)
  function signOutOnClick() {
    signOut(auth)
      .then(() => {
        window.location.href = "/log-in";
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <Popup />
      <div className="profil-value flex flex-col gap-4">
        {/* email */}
        <div className="email profil__item">
          {email ? (
            <FlexText>
              Your Email: <br /> {email}
              <Link to="/profil/popup/email/change">Change</Link>
            </FlexText>
          ) : (
            <p>Please sign</p>
          )}
        </div>
        {/* name */}
        <div className="name profil__item">
          {name ? (
            <FlexText>
              your Name: {name}
              <Link to="/profil/popup/name/change">Change</Link>
            </FlexText>
          ) : (
            <FlexText>
              You not have a name
              <Link to="/profil/popup/name/set">Set a name</Link>
            </FlexText>
          )}
        </div>
        {/* password */}
        <div className="password profil__item">
          {password ? (
            <p className="flex justify-center items-center">
              <Link to="/profil/popup/password/change">Change password</Link>
            </p>
          ) : (
            <p>Please sign correctly</p>
          )}
        </div>
      </div>
      Profil
      <button onClick={signOutOnClick}>Exit</button>
    </div>
  );
}
