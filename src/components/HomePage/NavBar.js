import React, { useEffect, useState } from "react";
import {Link,Route, withRouter} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { logoutAction } from "../../actions/userAction";
import SettingsPage from "../Settings/SettingsPage";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRoute from './PrivateRoute'
import Register from "../User/Register";
import Profile from "../User/Profile";
import Login from "../User/Login";
import Report from "../Report/Report";
import Home from "./Home";
import '../../styling/navBar.css'
 
function NavBar(props) {
  const [loggedIn,setLoggedIn] = useState(Boolean(localStorage.getItem('token')))
  const dispatch = useDispatch()
  const selectedMonth = useSelector((state)=>state.month.find(ele=>ele._id===localStorage.getItem('month')))

 useEffect(()=>{ //display login page 
    if(!loggedIn)
    {
      props.history.push('/login')
    }
 },[loggedIn,props.history])

  const toggle = () => {
    setLoggedIn(!loggedIn)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logoutAction())
    toggle(false)
  }

  return (
    <div className='start-page'>
      <h1 className="title">Expenses App {selectedMonth && <small className="month">{selectedMonth.month}, {selectedMonth.year}</small>}</h1>
       {
          (loggedIn ) ?

          <div className="navBar">
            <Link to = '/' className="navBar-link">Home</Link>
            {selectedMonth && <Link to = {`/dashboard/${selectedMonth.month}${selectedMonth.year}`} className="navBar-link">Dashboard</Link>}
            {selectedMonth && <Link to = {`/settings/${selectedMonth.month}${selectedMonth.year}`} className="navBar-link">Settings</Link>}
            {selectedMonth && <Link to = {`/report/${selectedMonth.month}${selectedMonth.year}`} className="navBar-link">Report</Link>}
            <Link to = '/profile' className="navBar-link">Profile</Link>
            <Link to = '/login' className="navBar-right" onClick={handleLogout}>logout</Link>
            
          </div>  
          :
          <div className="homePage">
            <Link to = '/register' className="navLink">Register</Link>
            <Link to = '/login' className="navLink">Login</Link> 
          </div> 
        }
        <Route path = '/register' component={Register} />
        <Route path = '/login' render={(props)=>{
          return <Login {...props} toggle={toggle} />
        }}
        />
        <PrivateRoute path="/" component={Home} exact/>
        <PrivateRoute path='/dashboard/:month' component={Dashboard} exact/>
        <PrivateRoute path='/settings/:month' component={SettingsPage} exact/>
        <PrivateRoute path='/report/:month' component={Report} exact />
        <PrivateRoute path='/profile' component={Profile} />
    </div>
  )
}

export default withRouter(NavBar)