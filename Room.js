import React from "react";
import {useState, useEffect} from "react"
import {client, databases, Database_ID, Colection_ID_Messages } from "../appwriteConfig";
import { ID,Query, Role, Permission } from "appwrite";
import './index.css';
import {Trash2} from 'react-feather'
import Header from "../Components/Header";
import { useAuth } from "../Utils/AuthContext";
import Picker from "emoji-picker-react"





export default function Room(){
    const {user} = useAuth()

const [messages, setMessages] = useState([]);
const [showPicker, setShowPicker] = useState(false)
const [chosenEmoji, setChosenEmoji] = useState(null)
const [messageBody, setMessageBody] = useState('')
    useEffect(()=>{
      getMessages()
     const unsubscribe =  client.subscribe([`databases.${Database_ID}.collections.${Colection_ID_Messages}.documents`, ], response => {
        // Callback will be executed on changes for documents A and all files.
        
        if(response.events.includes("databases.*.collections.*.documents.*.create")){
            console.log('A MESSAGE WAS CREATED')
            setMessages(prevState => [response.payload, ...prevState])
        }
        if(response.events.includes("databases.*.collections.*.documents.*.delete")){
            console.log('A MESSAGE WAS DELETED!!!')
            setMessages(prevState=> prevState.filter(message =>message.$id !== response.payload.$id))
        }
    })
    return ()=>{
     unsubscribe()
    }
    },[])





    const handleSubmit = async (e)=>{
        e.preventDefault();
        const messageWithEmoji = ` ${messageBody}`
   console.log('MessagewithEmoji', messageWithEmoji)
       let payload = {
        user_id: user.$id,
        username:user.name,
        body:messageWithEmoji
    }

    let permissions = [
Permission.write(Role.user(user.$id))
]
     let response = await databases.createDocument(
        Database_ID,
        Colection_ID_Messages,
        ID.unique(), 
        payload,
        permissions
     )
     console.log('Created', response)
     setMessageBody('')// reset the form 
     //updating the messages array
     //setMessages(prevState => [response, ...messages])
     setChosenEmoji(null)
    }
const getMessages = async () =>{
const response = await databases.listDocuments(Database_ID, Colection_ID_Messages,
    [
        Query.orderDesc('$createdAt'),
        Query.limit(20)
    ]
    )
console.log('Response', response)
setMessages(response.documents)
}

const DeleteMessage = async(message_id) =>{ databases.deleteDocument(Database_ID, Colection_ID_Messages, message_id);
    //remove from message array 
    //setMessages(prevState=> messages.filter(message =>message.$id !== message_id))
}

function handleEmojiClick( emojiObject, event) {
    const selectedEmoji = emojiObject.emoji
    setChosenEmoji(selectedEmoji);
    setShowPicker(false);
     // Call handleSubmit to send the message with the emoji
    console.log('chosen Emoji:', chosenEmoji)
    setMessageBody((prevMessageBody) => prevMessageBody + selectedEmoji)
  }
function toggleEmoji(){ 
    setShowPicker(!showPicker)
}


return(
    <main className = "container">
        <Header/>
<div className ="room--container" >
    
<form onSubmit = {handleSubmit} id = "message--form"> 
<div> 

<textarea
required
maxLength = '1000'
placeholder =  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Message '
onChange={e=>setMessageBody(e.target.value)}
value = {messageBody}
 style = {{paddingRight:'30px'}}
>
   
</textarea>
<div>
<div><span onClick={toggleEmoji} style = {{position:'relative',top:'-67px', cursor:'pointer', marginLeft:'150px'}}>
    🙂</span></div>
    {showPicker && (<div className="emojiPicker">

        <Picker onEmojiClick={handleEmojiClick}/>
    </div>)}
</div>
</div>
<div className = "send-btn--wrapper">
    <input className = "btn btn--secondary" type = "submit" value ="Send"/>
</div>

 </form>
 

<div className  = "messageContent">
{messages.map(message=>(
  <div key = {message.$id} className = "message--wrapper">
    <div className="message-header">

         <p>{message?.username ? (<span>{message.username}</span> ): (
            <span>Anonymous user</span>

         ) }
         <small className="message-timestamp">
       {new Date(message.$createdAt).toLocaleString()}
       </small>
         </p>


         {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                            <Trash2 className="delete--btn" onClick={() => {DeleteMessage(message.$id)}}/>
                  
     )}
       
        

   
    </div>
 <div className = "message--body">
    <span
          dangerouslySetInnerHTML={{ __html: message.body }}
        />
 </div>


  </div>  
))}
    </div>
</div>
</main>


)



}