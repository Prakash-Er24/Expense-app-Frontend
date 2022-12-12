import React from 'react'
import { Progress } from 'antd'
import '../../styling/dashboard.css'

function BudgetOverview(props) {
    const {budget,totalExpense} = props
    const value = totalExpense/budget
    const percent = isNaN(value)?(0):(value*100)
    return (
        <div className='budget-overview'>
            <b>Budget Overview</b><br/>
            <Progress strokeLinecap="butt" 
                    type="circle"
                    strokeWidth={12}
                    width={250}
                    status={percent===100 && "exception"}
                    percent={percent}
                    format={(percent)=>`${Math.trunc(percent)} % Spent`}  
                    className="progress"
            />
            <div className='overview-data'>
                <span className='heading'>Total Budget </span><br/>
                <span> Rs. {budget}</span><br/><br/>
                <span className='heading'>Total Expenses </span><br/> 
                <span> Rs. {totalExpense} </span><br/><br/>
                <span className='heading'>Remaining Amount </span><br/> 
                <span> Rs. {budget - totalExpense} </span>
            </div>
        </div>
    )
}

export default BudgetOverview