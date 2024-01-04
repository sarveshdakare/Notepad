import React, {  useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('')
const navigate= useNavigate()

useEffect(()=>{
    const auth=localStorage.getItem('user');
       if(auth){
        navigate('/')
       }
  })

const submit=async()=>{
    console.log(password,email)
    let result=await fetch('http://localhost:5000/login',{
        method:'Post',
        body:JSON.stringify({email,password}),
        headers:{
          'Content-Type':'application/json'
        },
    }); 
    result=await result.json();
    console.log(result)
    if(result.auth){
localStorage.setItem("user",JSON.stringify(result.user));
localStorage.setItem("token",JSON.stringify(result.auth));
navigate('/')
    }else{
        alert("Not Found");
    }
}

  return (
    <div className='signup'>
    <h1>Login Form</h1>

    <input type="email" className="input-box" placeholder='Enter Email' value={email} onChange={(e)=>setemail(e.target.value)}/>
    <input type="password" className="input-box" placeholder='Enter Password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
    
    <button className='btn' onClick={submit} >Log In</button>
</div>
  )
}

export default Login