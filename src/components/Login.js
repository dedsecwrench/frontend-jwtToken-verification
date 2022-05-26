import axios from 'axios';
import React,{useRef} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
    const navigate = useNavigate();
    const input1 = useRef();
    const input2 = useRef();

    const submit = () =>{
        // received value from useRef hook!
        let email = input1.current.value;
        let password = input2.current.value;
        let Obj = {
           email,
           password
        }

      // passing the data to backend through axios post method.
      // one parameter is url
      // another is data we want to send.
      axios.post("https://jwt-token-verification.herokuapp.com/login",{Obj})
        .then((response)=>{
          console.log("in then");
          // console.log(response.data);
          localStorage.setItem("token",response.data);
          // in this block we got jwt-token as response.data which is generated in backend /login route.
          // sended jwt-token to local storage
        })
        .catch((error)=>{
          console.log("in CATCH");
          console.log(error);
        })

        navigate("/users");
    }

  return (
    <div>

        <div className='container'>
            <h1>LOGIN</h1>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className='txt-fld' ref={input1} spellCheck="off"/><br/><br/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className='txt-fld' ref={input2} spellCheck="off"/><br/><br/>
            <input type="submit" name="submit" value="Submit" className='btn btn1 btn-success' onClick={submit}/>
        </div>
    </div>
  )
}

export default Login