import { getAuth, getIdToken, onAuthStateChanged, sendEmailVerification, updateCurrentUser, updateEmail, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
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
      const fetchUserData = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            // Get the Auth token
            console.log(auth.currentUser)
            // verifyBeforeUpdateEmail(user, valueSetName)
            
            // onAuthStateChanged(auth, (user) => {
            //   if (user) {
            //     // User is signed in, see docs for a list of available properties
            //     // https://firebase.google.com/docs/reference/js/auth.user
            //     const uid = user.uid;
            //     console.log(uid)
            

            //     // ...
            //   } else {
            //     // User is signed out
            //     // ...
            //   }
            // });
            // if(user.emailVerified){
            // updateEmail(user, valueSetName)
            // .then(()=>{
            //   console.log(`new email is ${valueSetName}`)
            // })
            // .catch((error)=>{
            //   // closeSpan.click()
            //   console.log(error)
            // })
            // }


            
            // Make the API request with the Auth token in the headers
            // Your fetch code here
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      // fetchUserData()
      // sendEmailVerification(valuese)
      // .then(() => {
      //   // Verification email sent, instruct user to check their inbox
      //   console.log('Verification email sent to', valueSetName);
      //   // Wait for user to verify email

      //   // Once email is verified, update email address
      //   // Update email address only after verification is complete
      //   updateEmail(auth.currentUser, valueSetName)
      //     .then(() => {
      //       // Email updated successfully
      //       console.log('Email updated successfully to', valueSetName);
      //       // Proceed with other actions if needed
      //     })
      //     .catch((error) => {
      //       // Handle errors
      //       console.error('Error updating email:', error);
      //     });
      // })
      // .catch((error) => {
      //   // Handle errors
      //   console.error('Error sending verification email:', error);
      // });


      UPDA

      // updateEmail(auth.currentUser, valueSetName)
      //   .then(()=>{
      //     console.log(`new email is ${valueSetName}`)
      //     console.log(auth.currentUser)
      //     closeSpan.click()
      //   })
      //   .catch((error)=>{console.log(error)})
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
