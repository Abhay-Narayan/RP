import React, { useState } from 'react'
import './LoginScreen.css'
import SignInScreen from './SignInScreen';
function LoginScreen() {
    const [signIn,setSignIn]=useState(false);

  return (
    <div className='loginScreen'>
        <div className='loginScreen__background'>
            <div className='nav__logo'>
                MOVIEZ
            </div>
           
            <button onClick={()=>setSignIn(true)} className='Sign_in'>Sign In</button>
            <div className='loginScreen__gradient'/>
        </div>
        <div className='loginScreen__body'>
            {signIn?(<SignInScreen/>):(
                <>
                <h1>Watch from Anywhere, Anytime</h1>
                <h2>Cancel anytime...</h2>
                <h3>Hurry Up!! Enter your email to get started</h3>
                <div className='loginScreen__input'>
                    <form>
                        <input type='email' placeholder='Enter your Email...'/>
                        <button onClick={()=>setSignIn(true)} className='getStarted'>GET STARTED</button>
                    </form>
                </div>
                </>
            )}
            
        </div>
    </div>
  )
}

export default LoginScreen