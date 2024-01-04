import React, {  useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useEffect } from 'react';


const Signup = () => {


    const [name, setname] = useState();
    const [password, setpassword] = useState();
    const [email, setemail] = useState();
    const Navigate=useNavigate();

    useEffect(()=>{
      const auth=localStorage.getItem('user');
         if(auth){
          Navigate('/')
         }
    })

const submit=async()=>{
console.log(name,password,email);
let result=await fetch('http://localhost:5000/register',{
  method:'Post',
  body:JSON.stringify({name,email,password}),
  headers:{
    'Content-Type':'application/json'
  },
});
result=await result.json()
console.warn(result)

if(result){
  Navigate('/')
}
localStorage.setItem('user',JSON.stringify(result.result))
localStorage.setItem('token',JSON.stringify(result.auth))
}



  return (
    <div className='signup'>
        <h1>Register Form</h1>
        <input type="text" className="input-box" placeholder='Enter name' value={name} onChange={(e)=>setname(e.target.value)}/>
        <input type="email" className="input-box" placeholder='Enter Email' value={email} onChange={(e)=>setemail(e.target.value)}/>
        <input type="password" className="input-box" placeholder='Enter Password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
        
        <button className='btn' onClick={submit}>Sign Up</button>
    </div>
  )
}

export default Signup