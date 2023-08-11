import React, { useState } from 'react'
import './ProfileScreen.css'
import axios from 'axios'
import Nav from '../Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase';
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import {useStripe,useElements, CardElement} from '@stripe/react-stripe-js'
const PUBLIC_KEY='pk_test_51NdnygSDaJoak2LybCGGfoKzOMRe9j3ZNG2scdIGYPBkKABzQgQyzjFm8bfMeq14pwMiNKEODGamspVk2EoxIDnP007vcoCkd8'
const stripePromise=loadStripe(PUBLIC_KEY);
const Wrapper=()=>(
    <Elements stripe={stripePromise}>
        <ProfileScreen/>
    </Elements>
);
const ProfileScreen=()=> {
    const elements=useElements();
    const stripe=useStripe();
    const [success,setSuccess]=useState(false)
    const user= useSelector(selectUser);
    const handle1=async(e)=>{
        e.preventDefault();
        console.log("clciked")
        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement)
        })

        if(!error){
            try {
                const email=user.email
                const response=await axios.post("http://localhost:4000/payment",{
                    amount:20000,
                    paymentMethod:paymentMethod.paymentMethod.id,
                    email
                })
                if(response.data.success){
                    console.log("successfull Payment");
                    setSuccess(true);
                }
            } catch (error) {
                console.log("error", error)
            }
        }else{
            console.log(error.message);
            alert(error.message)
        }
    }
    const handle2=async(e)=>{
        e.preventDefault();
        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement)
        })

        if(!error){
            try {
                const email=user.email
                const {id}=paymentMethod
                const response=await axios.post("http://localhost:4000/payment",{
                    amount:70000,
                    id,
                    email
                })
                if(response.data.success){
                    console.log("successfull Payment");
                    setSuccess(true);
                }
            } catch (error) {
                console.log("error", error)
            }
        }else{
            console.log(error.message);
        }
    }
    const handle3=async(e)=>{
        e.preventDefault();
        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement)
        })

        if(!error){
            try {const email=user.email
                const {id}=paymentMethod
                const response=await axios.post("http://localhost:4000/payment",{
                    amount:150000,
                    id,
                    email
                })
                if(response.data.success){
                    console.log("successfull Payment");
                    setSuccess(true);
                }
            } catch (error) {
                console.log("error", error)
            }
        }else{
            console.log(error.message);
        }
    }

   
  return (
    <div className='profileScreen'>
        <Nav/>
        <div className='profileScreen__body'>
            <h1>Edit Profile</h1>
            <div className='profileScreen__info'>
                <img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" alt="hii"/>
                <div className='profileScreen__details'>
                    <h2>{user.email}</h2>
                    <h4>Please enter your details here before subscribing</h4>
                    
                        <CardElement className='CardElement'/>
                    
                    <div className='profileScreen__plans'>
                        <h3>Plans</h3>
                        <table>
                        <tr>
                                <th>Time Period</th>
                                <th>Quality</th>
                                <th>Payment</th>
                                
                            </tr>
                            <tr>
                                <td>Monthly</td>
                                <td>720p</td>
                                <td>200 INR</td>
                                <td><button onClick={handle1} className='Subscribe__button'>Subscribe</button></td>
                            </tr>
                            <tr>
                                <td>Half-Yearly</td>
                                <td>1080p</td>
                                <td>700 INR</td>
                                <td><button onClick={handle2} className='Subscribe__button'>Subscribe</button></td>
                            </tr>
                            <tr>
                                <td>Yearly</td>
                                <td>4K UHD</td>
                                <td>1500 INR</td>
                                <td><button type='button' onClick={handle3} className='Subscribe__button'>Subscribe</button></td>
                            </tr>
                        </table>
                        <button onClick={()=>auth.signOut()} className='Signout'>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Wrapper