import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserState } from './Context';

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, setUser } = UserState()

  const logoutHandler = () => {
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
            alignItems: "center",
            color: "white",
            fontSize: "28px"
          }
        }>
        <div style={
          {
            width: "50%",
            display: "flex",
            justifyContent: "flex-end"
          }
        }>
          <h1>HOME</h1>
        </div>
        <div style={{
          width: "50%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems:"center",
          paddingRight:"4rem"
        }}>
          <button className='google-btn' onClick={logoutHandler} style={{ color: "#0284fb", backgroundColor: "white",width:"max-content" }}>Logout</button>
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

          Welcome {user && user.name && user.name}</h1>
        <h2>Email : {user && user.email && user.email}</h2>
      </div>
    </div>
  )
}

export default Dashboard