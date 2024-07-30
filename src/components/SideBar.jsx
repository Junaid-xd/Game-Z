import React, { useState, useEffect } from 'react'
import './SideBar.css'
import Profile from './Profile'
import RankTable from './RankTable';
import CreateNewQuestion from './CreateNewQuestion';



function SideBar({setShowSideBar, user, allUsers, setFailedMessage, setSuccessMessage, setShowEmergencyPopup, setAllusers, setValiduser, setEmergencyPopupNote}) {

  const [showProfile, setShowProfile] = useState(false);

  const [showRankTable, setShowRankTable] = useState(false);

  const [showCreateNewQuestionPopup, setShowCreateNewQuestionPopup] = useState(false);

  const [optionsEnable, setOptionsEnable] = useState(false);

  const enableLimit = 10;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ap-south-1.aws.data.mongodb-api.com/app/playersdata-xrbubxz/endpoint/api/playersData/getUsers");
        const result = await response.json();
        setAllusers(result);

        result.forEach((userrr)=>{
          if(userrr._id==user._id){
            setValiduser(userrr)
          }
        })
       
      } catch (error) {
        console.error("Error fetching data:", error);
        setFailedMessage("Bad Internet Connection");
        setShowEmergencyPopup(true);
      }
    };

    fetchData();   

    setInterval(fetchData, 5000);



    if(user.score>=enableLimit){
      setOptionsEnable(true);
    }
    else{
      setOptionsEnable(false);
    }

  }, []);



  const closeSideBar = ()=>{
    setShowSideBar(false)
  }

  const disabledQuestionMessage = ()=>{
    setFailedMessage("You need atleast 10 Aura points to create your own Question.");
    setShowEmergencyPopup(true);
  }

  return (
   <>
    <div className='sidebar-wrapper'>
      <div className='side-bar-close-btn-div'>
        <button onClick={closeSideBar} className='close-btn'>X</button>
      </div>

      <div className='side-bar-username-div'>
        <p>{user.username}</p>
      </div>


      <div className='side-bar-options-div'>

        <div className='side-bar-option' onClick={()=>setShowProfile(true)}>View Profile</div>
        <div className='side-bar-option' onClick={()=>setShowRankTable(true)}>View Rank Table</div>

        {optionsEnable ? (
          <div className='side-bar-option' onClick={()=> setShowCreateNewQuestionPopup(true)} >Create a Question</div>
        ) : (
          <div className='side-bar-option disabled' onClick={disabledQuestionMessage}>Create a Question</div>
        )}


        {/* <div className='side-bar-option'>Game Info</div> */}
        <div className='side-bar-option' onClick={()=>window.location.reload()}>LogOut</div>


      </div>
    </div>

    <div>
      {showProfile && <Profile setShowProfile={setShowProfile} user={user} allUsers={allUsers}/>}
    </div>

    <div>
      {showRankTable && <RankTable allUsers={allUsers} setShowRankTable={setShowRankTable} activeUser={user}/>}
    </div>

    <div>
      {showCreateNewQuestionPopup && <CreateNewQuestion user={user} setShowCreateNewQuestionPopup={setShowCreateNewQuestionPopup} setFailedMessage={setFailedMessage} setSuccessMessage={setSuccessMessage} setShowEmergencyPopup={setShowEmergencyPopup} setEmergencyPopupNote={setEmergencyPopupNote}/>}
    </div>
   </> 
  )
}

export default SideBar
