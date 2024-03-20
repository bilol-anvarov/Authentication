// Enter in account
import React from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../farebase";
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LogIn() {
  
  const authUser = auth.currentUser;
  if(authUser) {
    if(!authUser.emailVerified){
      return <h1 className=" text-3xl">You already registered, please verify your email</h1>
    }
    return <h1 className=" text-3xl">You already registered</h1>
  }
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState(null)


  const login =(e)=>{ 
    // for sign
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(()=>{
        if(auth.currentUser.emailVerified){
          window.location.href = '/'
        } else{
          window.location.href = '/sign-up'
        }
      }) .catch((error)=>{
        console.log(error)
        if(error.code === 'auth/invalid-credential'){
          setTitle('Invalid email address or password')
        } else if(error.code === 'auth/too-many-requests'){
          setTitle('There are too many incorrect requests, please try again later')
        } else{
          setTitle(null)
        }
      })
  }
  return (
    <div className="signup mt-5">
      <div className="card">
        <h2 className=" text-2xl">Log in</h2>
        <form onSubmit={login} className="mt-5 flex flex-col gap-5">
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
          </label>
          <button>Log in</button>
          <div className="title mb-3">
            {title && title}
          </div>
        </form>
      </div>
      <div className="signup">
        If you are first time, please <Link to="/sign-up">create account</Link>
      </div>
    </div>
  )
}
