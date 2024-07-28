import { useState } from 'react'
// import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import EmergencyPopup from './components/EmergencyPopup'


function App() {

  const [authorize, setAuthorize] = useState(false)
  
  const [login, setLogin] = useState(true)

  const [signUp, setSignup] = useState(false);

  const [validUser, setValiduser] = useState({});

  const [currentUsers, setCurrentusers] = useState([]);

  const [successMessage, setSuccessMessage] = useState(undefined);

  const [failedMessage, setFailedMessage] = useState(undefined);

  const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);

  const [emergencyPopupNote, setEmergencyPopupNote] = useState(null);

  return (
    <>
      <div>
        {login && <Login setLogin={setLogin} setAuthorize={setAuthorize} setSignup={setSignup} setValiduser={setValiduser} setCurrentusers={setCurrentusers} currentUsers={currentUsers} setFailedMessage={setFailedMessage} setShowEmergencyPopup={setShowEmergencyPopup}/>}
      </div>
      

      <div>
        {signUp && <Signup setLogin={setLogin}  setSignup={setSignup} currentUsers={currentUsers} setFailedMessage={setFailedMessage}  setSuccessMessage={setSuccessMessage} setShowEmergencyPopup={setShowEmergencyPopup}/>}
      </div>


      <div>
        {authorize && <Home validUser={validUser} setValiduser={setValiduser} setFailedMessage={setFailedMessage}  setSuccessMessage={setSuccessMessage} setShowEmergencyPopup={setShowEmergencyPopup} setEmergencyPopupNote={setEmergencyPopupNote}/>}
      </div>

      <div>
        {showEmergencyPopup && <EmergencyPopup successMessage={successMessage} failedMessage={failedMessage} setSuccessMessage={setSuccessMessage} setFailedMessage={setFailedMessage} setShowEmergencyPopup={setShowEmergencyPopup} emergencyPopupNote={emergencyPopupNote} setEmergencyPopupNote={setEmergencyPopupNote}/>}
      </div>


    </>
  )
}

export default App
