import { EmailAuthProvider, getAuth, getIdToken, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, signInWithEmailAndPassword, updateCurrentUser, updateEmail, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../farebase";



// close popup function

function closePopup (){
  window.history.back()
}



const PopupLayout = ({ name, type }) => {
  // const auth = getAuth()
  const closeSpan = document.querySelector('.span-close')
  // functions for user value
  const [valueSetName, setName] = useState('') 
  const [secondName, setSecondName] = useState('') 
  const [title, setTitle] = useState(null)
  console.log(auth)
  function  send(e){
    e.preventDefault()



   
   
   
   
   
   
   
   
   
   
   
   
   
    // set a name
    if(name=='name' && type=='set'){
      if(valueSetName.length < 5){
        setTitle('The minimum character length for a name is 5')
        return null
      } else{
        setTitle(null)
        updateProfile(auth.currentUser,{
          displayName: valueSetName
        }).then(()=>{window.location.href = '/profil'}).catch((error)=>console.log(error))
      }
    } 
    if(name == 'name' && type=='change'){
      if(valueSetName.length < 5){
        setTitle('The minimum character length for a name is 5')
        return null
      } else{
        setTitle(null)
        updateProfile(auth.currentUser,{
          displayName: valueSetName
        }).then(()=>{window.location.href = '/profil'}).catch((error)=>console.log(error))
      }
    }
    if(name == 'email'){
    



     
      
      // Example usage:
      const currentUser = auth.currentUser;


      const reauthenticate = async () => {
        try {
          // Provide the user's current email and password
          const email = currentUser.email;
          const password = secondName; // Replace with the user's password
      
          // Create a credential with the user's email and password
          const credential = EmailAuthProvider.credential(email, password);
      
          // Re-authenticate the user with the credential
          await reauthenticateWithCredential(currentUser, credential);
      
          // Once re-authenticated, update the email address
          await updateEmail(currentUser, valueSetName);
          window.location.href = '/sign-up'
          window.location.reload
          console.log('Email updated successfully to', valueSetName);
        } catch (error) {
          // Handle errors
          console.error('Error updating email:', error);
          if (error.code === 'auth/email-already-in-use') {
            setTitle('This email is already in use')
          } else if(error.code === 'auth/invalid-email'){
            setTitle('Email is invalid')
          } else {
            console.log('Произошла ошибка:', error.message);
          }
        }
      };
      
      // Call the reauthenticate function
      reauthenticate();

    }
  }
  // change a name
  


  return (
    <>
      <div
        className={`popup-bg z-40 flex px-8 items-center justify-center fixed w-full h-full right-0 top-0 left-0 bottom-0`}
      >
        <div className="close absolute w-full max-w-md top-40 px-4 flex justify-end">
          <span onClick={closePopup} className="span-close px-5 py-3  text-white z-50 rounded-full">X</span>
        </div>
        <form onSubmit={send} className="popup w-full z-50 p-4 max-w-sm rounded-xl border  border-white border-solid">
          {/*  if password */}
          {name == "password" && (
            <>
              <h2>Please enter a old {name}</h2>
              <input
                type={name == "password" ? "password" : "text"}
                className=" mb-5 py-1 px-2 w-full mt-3 rounded-lg"
                placeholder={name}
              />
            </>
          )}
          <h2>
            Please enter a {type == "change" && "new"}
            {type == "set" && null} {name}
          </h2>
          <input
            value={valueSetName}
            onChange={(e)=>{setName(e.target.value)}}
            type={name == "password" ? "password" : "text"}
            className="py-1 px-2 w-full mt-3 rounded-lg"
            placeholder={name}
          />
          {/*  if email */}
          {name == "email" && (
            <>
              <h2 className="mt-4">Please enter a password</h2>
              <input
                value={secondName}
                onChange={(e)=>{setSecondName(e.target.value)}}
                type='password'
                className=" py-1 px-2 w-full mt-3 rounded-lg"
                placeholder={'password'}
              />
            </>
          )}
          <div className="title mt-5">
            {title && title}
          </div>
          <button  className="send w-full mt-5">
            {type == 'change' ? `change ${name}` : 'set name'} 
          </button>
        </form>
      </div>
    </>
  );
};

export default function Popup() {
  const path = useParams();
  
  

  
  
  if (path.name == "name" && path.type == "change") {
    return <PopupLayout name={"name"} type={"change"} />;
  }
  if (path.name == "name" && path.type == "set") {
    return <PopupLayout name={"name"} type={"set"} />;
  }
  if (path.name == "email" && path.type == "change") {
    return <PopupLayout name={"email"} type={"change"} />;
  }
  if (path.name == "password" && path.type == "change") {
    return <PopupLayout name={"password"} type={"change"} />;
  }
  return null;
}
