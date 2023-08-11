import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Nav.css'

function Nav() {
    const [show,handleShow]=useState(false);
    const navigate=useNavigate();
    const transitionNavbar=()=>{
        if(window.scrollY>100){
            handleShow(true)
        }else{
            handleShow(false)
        }
    }
    useEffect(()=>{
            window.addEventListener('scroll',transitionNavbar);
            return()=>window.removeEventListener('scroll', transitionNavbar);
    },[])

  return (
    <div className={`nav ${show && `nav__black`}`}>
        <div className='nav__contents'>
            <div onClick={()=>{navigate("/")}} className='nav__logo'>
                MOVIEZ
            </div>
            <img onClick={()=>navigate("/profile")} className='nav__avatar' src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
alt="" />
        </div>
       
    </div>
  )
}

export default Nav