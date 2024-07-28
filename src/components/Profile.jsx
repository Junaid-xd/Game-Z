import React, { useEffect, useState } from 'react'
import './Profile.css'

function Profile({setShowProfile, user, allUsers}) {

  const [rank, setRank] = useState("undefined")

  const closeProfilePopup = ()=>{
    setShowProfile(false)
  }

  useEffect(()=>{
    allUsers.sort((a, b) => b.score - a.score);

    // console.log("Sorted users : ", allUsers);

    const index = allUsers.findIndex(obj => obj._id === user._id) + 1;
    // console.log("Index is: ", index); 

    setRank(index);


  },[allUsers])

  return (
    <>

      



      <div className='profile-main-wrapper'>

        <div className='profile-popup-top'>

          <div className='profile-popup-heading-div'>
            <p><i>Player's Profile</i></p>
          </div>

          <div className='profile-popup-close-btn-div'>
            <button className='close-btn' onClick={closeProfilePopup}>X</button>
          </div>

        </div>

        <div className='profile-detail-div'>

          <div className='profile-detail-upper-div'>

            <div className='profile-detail-upper-right-div'>
              <p>Username : {user.username}</p>
              <p>Correct  : {user.correctAnswers}</p>
            </div>

            <div className='profile-detail-upper-left-div'>
              <p>Aura : {user.score}</p>
              <p>Attempts : {user.attempts}</p>
            </div>

          </div>

          <div className='profile-detail-lower-div'>
            <p>Rank : {rank}</p>
          </div>

        </div>
        
      </div>
    </>
  )
}

export default Profile
