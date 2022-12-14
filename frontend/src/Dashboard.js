import React from 'react'
import {useNavigate} from 'react-router-dom'
import { UserState } from './Context';

const Dashboard = () => {
  const navigate=useNavigate()
  const { user,setUser } = UserState()

  const logoutHandler=()=>{
    localStorage.removeItem('user')
    setUser({})
    navigate('/login')
  }

  return (
    <div>
      <div
        style={
          {
            height: "10rem",
            backgroundColor: "#0284fb",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            color: "white",
            fontSize: "28px"
          }
        }>
        <h1>HOME</h1>
        <div>
          <button className='google-btn' onClick={logoutHandler} style={{ color: "#0284fb", backgroundColor: "white" }}>Logout</button>
        </div>
      </div>
      <div style={
        {
          textAlign: "center",
          fontSize: "28px",
          padding: "5rem"
        }
      }>
        <h1
          style={{ marginBottom: "2rem" }}
        >

          Welcome {user && user.token && user.name}</h1>
        <h2>Email : {user && user.token && user.name}</h2>
      </div>
    </div>
  )
}

export default Dashboard