import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addproduct = () => {
    const [name, setname] = useState('');
    const [content, setcontent] = useState('');
    
    const [error, setError] = useState(false)
    const navigate=useNavigate();

const submit=async()=>{
    console.log(name,content);

if(!name && !content){
setError(true)
return false;
}

const userId=JSON.parse(localStorage.getItem('user'))._id;
console.log(userId);
let result=await fetch('http://localhost:5000/add-product',{
    method:'Post',
    body:JSON.stringify({name,content,userId}),
    headers:{
        "Content-Type":"application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    },
   
});
result=await result.json()
console.log(result)
 navigate('/')   
}

  return (
    <div className='signup'>
        <h1>Add Notes</h1>
        <input type="text" className="input-box" placeholder='Enter Topic Name'  value={name} onChange={(e)=>setname(e.target.value)} />
        {error && !name && <span className='invalid'>Enter Valid Name</span>}
         <input type="text" className="input-box" placeholder='Enter Content' value={content} onChange={(e)=>setcontent(e.target.value)} required/>
        {error && !content && <span className='invalid'>Enter Valid Content</span>}
        
        <button className='btn' onClick={submit}>Add Notes</button>
    </div>
  )
}

export default Addproduct