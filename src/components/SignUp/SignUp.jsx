// Register
import React, { useEffect, useState } from "react";
import { EmailAuthProvider, createUserWithEmailAndPassword, deleteUser, getAuth, reauthenticateWithCredential, sendEmailVerification, signOut, updateEmail, updateProfile } from 'firebase/auth'
import { Link } from "react-router-dom";
import Popup from "../Popup";


const auth = getAuth()
export default function SignUp() {
  const authUser = auth.currentUser;
  function signOutOnClick() {
    if(authUser && authUser.reloadUserInfo && authUser.reloadUserInfo.initialEmail){
      console.log('you had a initial email', authUser)
      // updEmailToOld(auth , authUser.reloadUserInfo.initialEmail)
      window.location.href = 'sign-up/popup/password/confirm'
    } else{
      console.log('you hadn\'t a initial email')
      // delete user
      if(auth){
        deleteUser(authUser)
        window.location.reload()
      } 
    }
  }


  const fetchSendLink = async ()=>{
    try{
      if(authUser){
        sendEmailVerification(authUser)
        .then(()=>{
          localStorage.setItem('timeSent', new Date().toString())
        })
      }
    } catch(error) {console.log(error)}
  }
  if (authUser) {
    if(!authUser.emailVerified){
      // fetchSendLink()
      const lastSentTime = localStorage.getItem('timeSent')
      if(!lastSentTime || (Date.now() - new Date(lastSentTime)) > 2 * 60 * 1000) {
        fetchSendLink()
      }
      if (!lastSentTime || (Date.now() - new Date(lastSentTime)) > 2 * 60 * 1000){
        return (
        <>
        <Popup />
        <h1 className=" text-3xl">Please check your email. We have sent you a link for verify email </h1>
        <p className="my-3">The link was sent to {authUser.email}, reload the page after confirmation</p>
        <Link to={'https://mail.google.com/mail/'} target="_blank" className="w-full"><button className="w-full uppercase">Open mail</button></Link>
        
          <h2 className="my-3 text-3xl">Or you can log in to your old mail</h2>
          {/* function for popup */}
          <button onClick={signOutOnClick} className="w-full uppercase">log in to old mail</button>
          <h3 className=" my-3 text-3xl">And you can delete account and start all again</h3>
          <button onClick={()=> {deleteUser(authUser)}} className="w-full uppercase">start over</button> 
        </>
      )
      } else{
        return (
          <>
          <Popup />
          <h1 className=" text-3xl">Please check your email. We have sent you a link for verify email </h1>
          <p className="my-3">The link was sent to {authUser.email}, reload the page after confirmation</p>
          <p className="my-3">We can only send you 1 message within 5 minutes. If you have not received the message, please check the email for correctness or you can send the link again later</p>
          <Link to={'https://mail.google.com/mail/'} target="_blank" className="w-full"><button className="w-full uppercase">Open mail</button></Link>
          
          <h2 className="my-3 text-3xl">Or you can log in to your old mail</h2>
          {/* function for popup */}
          <button onClick={signOutOnClick} className="w-full uppercase">log in to old mail</button>
          <h3 className=" my-3 text-3xl">And you can delete account and start all again</h3>
          <button onClick={()=> {deleteUser(authUser)}} className="w-full uppercase">start over</button> 

          </>
        )
      }
    }
    return <h1 className=" text-3xl">You already registered</h1>;
  } 
  const [name, setName] = useState('') 
  const [nameTitle, setNameTitle] = useState(null) 
  const [email, setEmail] = useState('') 
  const [emailTitle, setEmailTitle] = useState(null) 
  const [password, setPassword] = useState('') 
  const [passwordTitle, setPasswordTitle] = useState(null) 
  const [passwordRepeat, setPasswordRepeat] = useState('') 
  const [passwordRepeatTitle, setPasswordRepeatTitle] = useState(null) 
  const signUp = (e) => {
    e.preventDefault();
    // условия 
    // Confirm name
    if(name.length < 5){
      setNameTitle('The minimum character length for a name is 5')
      return null
    } else{
      setNameTitle(null)
    }




    // Confirm Password
    if(password.length < 6){
      setPasswordTitle('The minimum character length for a password is 6')
      return null
    } else {
      setPasswordTitle(null)
    }

    if(passwordRepeat.length < 1){
      setPasswordRepeatTitle('Please repeat the password to confirm')
      return null
    } else if(password !== passwordRepeat){
      setPasswordRepeatTitle('Please repeat the password correctly')
      return null
    } else{
      setPasswordRepeatTitle(null)
    }



    // ---- \\
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name
        }).catch((error) => {
          console.log(error)
        });
      })
      .catch((error) => {
        console.log(error);
        // Confirm Email
        console.log('Произошла ошибка:', error.message);
        if (error.code === 'auth/email-already-in-use') {
          setEmailTitle('This email is already in use')
          console.log(email)
        } else if(error.code === 'auth/invalid-email'){
          setEmailTitle('Email is invalid')
        } else {
          console.log('Произошла ошибка:', error.message);
        }
      });
    };

  
    if(!authUser){
      return (
    <div className="signup mt-5">
      <div className="card">
        <h2 className=" text-2xl">Create Account</h2>
        <form onSubmit={signUp} className="mt-5 flex flex-col gap-5">
          <label htmlFor={'name'}>
            Your name
            <br/>
            <input
              className={`mt-2 w-full rounded-l px-1 py-2 input input_name`}
              type='text'
              id={'name'}
              placeholder='Alex'
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <p className="title">
              {nameTitle && nameTitle}
            </p>
          </label>
          <label htmlFor={'email'}>
            Your email
            <br/>
            <input
              className={`mt-2 w-full rounded-l px-1 py-2 input input_email`}
              type='email'
              id={'email'}
              placeholder='exemple@gmail.com'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <p className="title">
              {emailTitle && emailTitle}
            </p>
          </label>
          <label htmlFor={'password'}>
            Your password
            <br/>
            <input
              className={`mt-2 w-full rounded-l px-1 py-2 input input_password`}
              type='password'
              id={'password'}
              placeholder='qwerty123'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <p className="title">
              {passwordTitle && passwordTitle}
            </p>
          </label>
          <label htmlFor={'password-confirm'}>
            Repeat password
            <br/>
            <input
              className={`mt-2 w-full rounded-l px-1 py-2 input input_password`}
              type='password'
              id={'password-confirm'}
              placeholder='qwerty123'
              value={passwordRepeat}
              onChange={(e)=>setPasswordRepeat(e.target.value)}
            />
            <p className="title">
              {passwordRepeatTitle && passwordRepeatTitle}
            </p>
          </label>
          <button>Sign up</button>
        </form>
      </div>
      <div className="login">
        Already have account? Please <Link to="/log-in">LogIn</Link>
      </div>
    </div>
    )
    } else {
      return <h1>If you want fix this, you can contact <Link to={'https://t.me/Bilol_8080'}>technical support</Link></h1>
    }
}
