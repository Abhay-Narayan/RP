import React, { useRef } from 'react'
import './SignInScreen.css'
import { auth } from '../firebase';
function SignInScreen() {

    const emailRef=useRef(null);
    const passwordRef=useRef(null);

    const register=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser)=>{
            console.log(authUser)
        }).catch(err=>{
            alert(err.message)
        })    
    }
    const SignIn=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser)=>{
            console.log(authUser)
        }).catch(err=>{
            alert(err.message)
        })
    }

  return (
    <div className='SignInScreen'>
        <form>
            <h1>Sign In</h1>
            <input ref={emailRef} placeholder='Email' type='email'/>
            <input ref={passwordRef} type='password' placeholder='Password'/>
            <button type='submit' onClick={SignIn}>Sign In</button>
            <h4>
                <span className='signUpScreen__gray'>New to Moviez? </span>
                 <span className='signUpScreen__link' onClick={register}>SignUp now</span></h4>
        </form>
    </div>
  )
}

export default SignInScreen