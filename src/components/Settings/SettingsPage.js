import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Budget from './Budget'
import CategoryForm from './CategoryForm'
import CategoryItem from './CategoryItem'
import { startSelectedMonth } from '../../actions/monthAction'
import { startGetBudget } from '../../actions/budgetAction'
import { startGetExpenses } from '../../actions/expensesAction'
import { startGetCategories } from '../../actions/categoryAction'

function SettingsPage(props) {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories)

    useEffect(()=>{
        dispatch(startGetBudget())
        dispatch(startGetCategories())
        dispatch(startGetExpenses())
        dispatch(startSelectedMonth(localStorage.getItem('month')))
    },[dispatch])

  return (
    <div className='settings'>
      <div className='forms'>
          <span>Total Budget</span><br/><br/>
          <Budget /><br/><br/>
          <CategoryForm action='Add' />
      </div>

        <p>Category List - {categories.length}</p>
        <div className='categories'>
          {
            categories.map(category=>{
              return (<div key={category._id} >
                        <CategoryItem {...category} />
                    </div>)
            })
          }
        </div>
    </div>
  )
}

export default SettingsPage