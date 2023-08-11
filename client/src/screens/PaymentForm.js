import React from 'react'
import {useStripe,useElements, CardElement} from '@stripe/react-stripe-js'
import './PaymentForm.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function PaymentForm() {
    const stripe = useStripe();
    const elements= useElements();
    const user=useSelector(selectUser)
  return (
    <div><CardElement/></div>
  )
}

export default PaymentForm