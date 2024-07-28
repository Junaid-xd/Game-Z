import React, {useEffect, useState} from 'react'
import './RankTable.css'

function RankTable({allUsers, setShowRankTable, activeUser}) {

  const auraLimit = 10;

  useEffect(()=>{
    allUsers.sort((a, b) => b.score - a.score);

    console.log("Sorted users : ", allUsers);



    const tableBody = document.querySelector('.rank-table-body');
    tableBody.innerHTML = "";
    
    allUsers.forEach((user, index)=>{

      if (user.score >= auraLimit) {
        const rowClass = user._id === activeUser._id ? 'you-row' : '';
        tableBody.innerHTML += 
          `<tr class='rank-table-row ${rowClass}'>
            <td>${user.username}</td>
            <td>${user.score}</td>
            <td>${index + 1}</td>
          </tr>`;
      }
    })


    if(activeUser.score<auraLimit){
      document.querySelector('.msg-div').innerHTML = "You should have atleast 10 aura points to be in Rank table"
    }

    



  },[allUsers])




  return (
    <>
      <div className='rank-table-popup-wrapper'>

        <div className='rank-popup-top'>

          <div className='rank-table-heading-div'>
            <p>Rank Table</p>
          </div>

          <div className='profile-popup-close-btn-div'>
            <button className='close-btn' onClick={()=> setShowRankTable(false)}>X</button>
          </div>

        </div>


        <div className='rank-table-div'>

          <table className='rank-table'>
            <thead className='rank-table-head'>
              <tr className='rank-table-head'>
                <th>Username</th>
                <th>Aura</th>
                <th>Rank</th>
              </tr>
            </thead>


            <tbody className='rank-table-body'>
              
           

            </tbody>

          </table> 


        </div>

        <div className="msg-div">

        </div>
      </div>
    </>
  )
}

export default RankTable
