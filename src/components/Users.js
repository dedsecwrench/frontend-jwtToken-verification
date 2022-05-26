import React,{ useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Users = () => {

  const [arr,setArr] = useState([]);
  const navigate = useNavigate();

  // making an api call to get items from backend on click of get Object values BUTTON.
  const getDataFromBackend =()=>{

      // when user logs in,
      // this he/she will be redirected to Users.js component
      // here we are getting jwt token which we stored in local storage.
      const token = localStorage.getItem("token");

      // now we will pass this token to /users (BACKEND PART) => 
      // first we'll get the authorization from (FRONTEND PART) => 
      // NETWORK => RESPONSE HEADERS => AUTHORIZATION
      // we'll pass it as abject
      // one property headers
      // it's value will be json object =>
      // key "authorization"
      // value "Bearer TOKEN"
      // if you wanna pass the token to backend for verification, always use this format only!
      axios.get("https://jwt-token-verification.herokuapp.com/users",{headers:{"authorization": `Bearer ${token}`}})
      .then((response)=>{
        console.log("in user THEN");

        // we'll get response from backend through verifyToken middleware.
        // we'll get an array of objects in response.data.
        // if time gets expired we'll get msg object in response.data.

        // if response.data value is msg object
        // we are checking if msg.success === false 
        // then get msg object's message.
        // and then line no.41 will execute!
        if(response.data.success === false){
          console.log(response.data.message);
          navigate("/login")
        }
        // if response.data value is array of objects.
        // we are checking if whatever inside in response.data's value is Array or not.
        // if it's an array, then get array of objects.
        else if(Array.isArray(response.data)){
          console.log(response.data);
          let item = response.data.map((current)=>{
              return current;
              // console.log(current);
          })
          setArr([...arr,...item]);
        }

      })
      .catch((error)=>{
        console.log("in user CATCH");
        console.log(error);
      })
  }

  return (<>
    <h2 style={{"textAlign":"center"}}>USERS</h2>
    <div className='userDiv'>

      <button onClick={getDataFromBackend} className="btn btn2 btn-success">Get Object values</button>
    
      {arr.map((current,index)=>{
          return(
            <h2 key={index}>{current.id}</h2>
           )
      }) } 
    
    </div>
    </>
  )
}

export default Users
