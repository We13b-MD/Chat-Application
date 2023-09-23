import { createContext,useState,useContext, useEffect } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
const AuthContext = createContext()
export const AuthProvider = ({children}) =>{
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    

    useEffect(()=>{
    getUserOnload()
}, [])

const getUserOnload = async ()=>{

    try{
        const accountdetails = await account.get();
        console.log('accountDetails:', accountdetails )
        setUser(accountdetails)
    }catch(error){
        console.info(error)
    }
    setLoading(false)
}

const handleUserLogin = async (e, credentials)=>{
e.preventDefault()
//function that gets the user onload
try{
    let response =  await account.createEmailSession(credentials.email, credentials.password);
    alert('Logged In:', response)
    let accountdetails = account.get();
    setUser(accountdetails)
    navigate('/')// Redirecting the user to the page
}catch(error){
  alert('Incorrect Email or Password')  
}
}
 
const handleUserLogout = async() =>{
const response = await account.deleteSession('current') 
setUser(null)   
}
const handleUserRegister = async (e, credentials)=>{
e.preventDefault();
if(credentials.password1 !== credentials.password2){
alert('Password do not match!')
return
}
try{
let response = await account.create(
    ID.unique(),
    credentials.email,
    credentials.password1,
    credentials.name
    )
    await account.createEmailSession(credentials.email, credentials.password1)
    const accountdetails = await account.get();
        console.log('accountDetails:', accountdetails )
        setUser(accountdetails)
        navigate('/')
    
}catch(error){
    console.error(error)
}

}

const contextData = {
    user,
 handleUserLogin,
 handleUserLogout,
 handleUserRegister
     }
return<AuthContext.Provider value = {contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>

}

export const useAuth=()=>
{
    return useContext(AuthContext)
}
export default AuthContext