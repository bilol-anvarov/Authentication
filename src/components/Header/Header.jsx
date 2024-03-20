// Header
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '/logo.svg'
import { auth } from '../../farebase'

const  IfAutorize = ()=>{  
    const authUser = auth.currentUser;
    if(!authUser || !authUser.emailVerified){
        return(
            <>
            <Link to="sign-up">SignUp</Link>
            <Link to="log-in">LogIn</Link>
            </>
        )
    }
    if(authUser.emailVerified) {
        return <Link to="profil">Profil</Link>
    }
}

export default function Header({authUser}) {
  return (
    <>
        <header className="flex justify-between items-center">
            <div className="logo">
                <Link to="/">
                    <img className=' w-40' src={logo} alt="" />
                </Link>
            </div>
            <nav className='flex items-center gap-5'>
                <IfAutorize {...authUser}/>
            </nav>
        </header>
    </>
  )
}
