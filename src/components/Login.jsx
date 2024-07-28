import React from 'react'
import { useEffect, useState } from 'react'
import './Login.css'

function Login({setLogin, setAuthorize, setSignup, setValiduser, setCurrentusers, currentUsers, setFailedMessage, setShowEmergencyPopup}) {


  const [reloadKey, setReloadKey] = useState(0);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ap-south-1.aws.data.mongodb-api.com/app/playersdata-xrbubxz/endpoint/api/playersData/getUsers");
        const result = await response.json();
        setCurrentusers(result);

       
      } catch (error) {
        console.error("Error fetching data:", error);
        setFailedMessage("Bad internet connection");
        setShowEmergencyPopup(true);
      }
    };

    fetchData();

       
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setReloadKey(prevKey => prevKey + 1);
    }, 15000); // 20000 milliseconds = 20 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  


  const signIn = ()=>{
    const enteredName = document.querySelector('.login-username-input-ele').value;
    const enteredPassword = document.querySelector('.login-password-input-ele').value;

    if(enteredName != "" && enteredPassword != ""){

      document.querySelector('.error-div').innerHTML="";


      
      currentUsers.forEach((user)=>{
        //console.log(typeof(user.username), typeof(user.password));
        if(user.username == enteredName && user.password == enteredPassword){
          setValiduser(user);
          setLogin(false);
          setAuthorize(true);
        }
        else{
          document.querySelector('.error-div').innerHTML="";
          document.querySelector('.error-div').innerHTML="Incorrect credentials*";
          setTimeout(()=>{
            document.querySelector('.error-div').innerHTML="";
          }, 2000)
        }
      })
      
    }
    else{
      document.querySelector('.error-div').innerHTML="";
      document.querySelector('.error-div').innerHTML="Please fill all fields*";

      setTimeout(()=>{
        document.querySelector('.error-div').innerHTML="";
      }, 2000)
    }


    //console.log(user,pass);
  }

  const setupSignup = ()=>{
    setSignup(true);
    setLogin(false);
  }

  return (
    <>

      <div className="login-nav-bar">

        <div className='nav-bar-top'>

          <div className='login-nav-bar-name-div'>
            <h1>Game Z</h1>
          </div>

        </div>

        <div key={reloadKey} className='login-nav-bar-bottom'>
          <marquee behavior="slide" direction="right" scrollamount="5" className='login-slider-tag'>
            <p>JD PRODUCTIONS</p>
          </marquee>  
        </div>

      </div>


      <div className='login-page-bottom'>
        <div className='login-wrapper' >

          <div className='p-and-input upper'>
            <p style={{fontSize: 13}}>Username:</p>
            <input type="text" placeholder='enter your username' className='login-username-input-ele'/>
          </div>


          <div className='p-and-input'>
            <p style={{fontSize: 13}}>Password:</p>
            <input type="password" placeholder='enter your password' className='login-password-input-ele'/>
          </div>

          <div>
            <p className='error-div'></p>
          </div>
          <button className='signin-btn' onClick={signIn}>Sign-In</button>
        </div>

        <div className='sign-up-link-div'>
          <a  onClick={setupSignup}>Click here to SignUp</a>
        </div>
      </div>
    </>
    
  )
}

export default Login
