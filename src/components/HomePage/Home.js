import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startAddMonth, startGetMonths, startSelectedMonth } from '../../actions/monthAction'
import { startGetUser } from '../../actions/userAction'
import '../../styling/home.css'

function Home(props) {
    // const { monthToggle, handleLogout } = props
    const [month,setMonth] = useState('')
    const [error,setError]=useState({})
    const err={}
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July','August','September', 'October', 'November', 'December']

    const dispatch = useDispatch()
    const monthsData = useSelector((state)=>state.month)

    useEffect(()=>{
        localStorage.removeItem('month')
        dispatch(startGetUser())
        dispatch(startGetMonths())
    },[dispatch])

    const handleChange = (e) => {
        const result = e.target.value
        setMonth(result)
        setError({})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(month==='')
        {
            err.month='Select month'
        }
        setError(err)
        if(Object.keys(err).length===0)
        {
            const data = {month, year:(new Date()).getFullYear()}
            dispatch(startAddMonth(data))
            setError({})
            setMonth('')
        }
    }

    const handleClick = (data) => {
        const redirect = (month) => {
            localStorage.setItem('month',data._id)
            const url = `${month.month}${month.year}`
            props.history.push(`/dashboard/${url}`)
        }
        dispatch(startSelectedMonth(data._id,redirect))
    }
    
  return (
    <div className='home'>
        <div className='month-form'>
            <form onSubmit={handleSubmit}>
                <select onChange={handleChange}>
                    <option value="">Select Month</option>
                    {
                        months.map(ele=><option key={ele} value={ele}>{ele}</option>)
                    }
                </select>
                <input type="submit" value="Add" /><br/>
                {
                    error.month && <small>{error.month}</small>
                }
            </form>
        </div>
        <div className='month-data'>
            {
                monthsData.map(ele=>{
                    return (<div className="month-list" key={ele._id} onClick={()=>handleClick(ele)}>{ele.month} - {ele.year}</div>)
                })
            }
        </div>


    </div>
  )
}

export default Home