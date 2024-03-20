// content
import React from "react";
import Card from "./Card";
import { auth } from "../../farebase";
import { Link } from "react-router-dom";

export default function Content() {
  const authUser = auth.currentUser;
  // const user = auth.currentUser
  // console.log(user)
    if(!authUser || !auth.currentUser.emailVerified){
        return (
          <div className='flex flex-col gap-3 h-96 justify-center items-center'>
            <h1 className=" mb-8 text-center text-3xl">Please register {authUser && 'in full'}</h1>
            <div className=' text-2xl'>Sign Up</div>
            <Link className='w-full' to="/sign-up"><button className='w-full'>Sign Up</button></Link>
            <div className=' text-2xl'>Log In</div>
            <Link className='w-full' to="/log-in"><button className='w-full'>Log In</button></Link>
          </div>
        )          
    }


  return (
    <>
      <div className="container">
        <h1></h1>
        <Card
          src="https://www.youtube.com/embed/PirsknaTofU?si=nvFJYvZJH2TedAKt"
          link="https://www.youtube.com/watch?v=PirsknaTofU&list=RDPirsknaTofU&start_radio=1&ab_channel=MUSIC4U"
        > 
            Lady Gaga - Bloody mary instrumental (slowed) | Best part ever | Tiktok music
        </Card>
        <Card
          src="https://www.youtube.com/embed/_xrIpjyVd2Q?si=HbFXNxwJn-vArBOn"
          link="https://youtu.be/_xrIpjyVd2Q?si=HbFXNxwJn-vArBOn"
        > 
            VØJ, Narvent - Memory Reboot (Slowed+Reverb)
        </Card>
      </div>
    </>
  );
}
