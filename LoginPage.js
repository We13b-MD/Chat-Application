
// Try to get the user to the login page unless they
// are authenticated.


import React, {useEffect,useState} from "react";
import { useAuth } from "../Utils/AuthContext";
import { useNavigate, Link } from "react-router-dom";
function LoginPage(){
    const {user, handleUserLogin} = useAuth()
    
const navigate = useNavigate()
    const [credentials, setcredentials] = useState({
       email:'',
       password:''
    })
    

    useEffect(()=>{
   if(user){
    navigate('/')
   }

    },[navigate,user])

    function handleInputChange(e){
    let name = e.target.name
    let value = e.target.value
    setcredentials({...credentials, [name]: value})
    
}
return(

    
<div  className="form--wrapper">
<form onSubmit = {(e) => {handleUserLogin(e, credentials)}}>
   <div className="field--wrapper">
    <label>Email:</label>
    <input
    type = "email"
    required
    name = "email"
    placeholder="Enter your email..."
     value = {credentials.email}
     onChange={handleInputChange}
    />
    
    </div>
    <div className="field--wrapper">
    <label>Password:</label>
    <input
    type = "password"
    required
    name = "password"
    placeholder="Enter your password..."
     value = {credentials.password}
     onChange={handleInputChange}
    />
    
    </div> 
    <div className="field--wrapper">
        <input className="btn btn--lg btn--main" type = "submit" value = "Login"/>
    </div>
    <p> Dont have an account? Register <Link to  ="/register">here</Link></p>
</form>
</div>





)



}

export default LoginPage;