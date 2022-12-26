import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'antd';

import ExpensesForm from './ExpensesForm'
import ExpensesTable from './ExpensesTable'
import BudgetOverview from './BudgetOverview'
import CategoryTable from './CategoryWiseTable'
import CategoryChart from './CategoryWiseChart';
import { startSelectedMonth } from '../../actions/monthAction'
import { startGetBudget } from '../../actions/budgetAction'
import { startGetExpenses } from '../../actions/expensesAction'
import { startGetCategories } from '../../actions/categoryAction'
import { startGetCategoryWise } from '../../actions/categoryWiseListAction';
import '../../styling/dashboard.css'

function Dashboard(props) {
  const dispatch = useDispatch()
  const [type,setType] = useState('chart')  //select chart/table
  const [search,setSearch] = useState('')   // Search expense table
  const [filterType,setFilterType] = useState('non-deleted')  // Select all, deleted, non-deleted
  const [isModalOpen, setIsModalOpen] = useState(false) 
  const [toggle,setToggle] = useState(false) 

  const budget = useSelector((state)=>state.budget.amount?state.budget.amount:0)
  const expenses = useSelector((state)=>state.expenses)
  // const categories = useSelector((state)=>state.categories)
  const categoryWiseData = useSelector((state)=>state.categoryWiseData)

  useEffect(()=>{
    dispatch(startSelectedMonth(localStorage.getItem('month')))
    dispatch(startGetBudget())
    dispatch(startGetCategories())
  },[dispatch])

  useEffect(()=>{
    categoryWiseData.length>5?setType('table'):setType('chart')
  },[categoryWiseData])

  useEffect(()=>{
    dispatch(startGetExpenses(filterType))
  },[toggle,filterType,dispatch])

  useEffect(()=>{
    dispatch(startGetCategoryWise())
  },[expenses,dispatch])

  //total Expense amount
  const totalExpense = categoryWiseData.reduce((pv,cv)=>{
      return  pv+cv.totalAmount
  },0)

  //Search expenses table
  const expensesData = expenses.filter(ele=>{
    return (ele.title.toLowerCase().includes(search.toLowerCase()) || 
    ele.category.name.toLowerCase().includes(search.toLowerCase()) )
  })

  const remainingBudget = budget - totalExpense

  const handleToggle = () =>{
    setToggle(!toggle)
  }
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const switchType = (e) => {
    setType(e.target.value)
  }

  const handleFilter = (e) => {
    setFilterType(e.target.value)
  }

  return (
    <div>
      <h2>Dashboard</h2>

      <div className='dashboard-card'>
        <div className="chartTable-select">
            <select defaultValue = {type} onChange={switchType}>
              <option value="chart" >Chart</option>
              <option value="table" >Table</option>
            </select>
        </div>
        
        <div className='overview'>
          <BudgetOverview budget={budget} totalExpense={totalExpense} />
        </div>
 
        {
          type==='chart' ?
          <div className='chart'>
            <CategoryChart categoryWiseData={categoryWiseData} totalExpense={totalExpense} />
          </div>:
          <div className='table'>
            <CategoryTable categoryWiseData={categoryWiseData} totalExpense={totalExpense} />
          </div>
        }
      </div>
       <br/>
      <div className='expenses'>
        <Button type="primary" onClick={showModal} disabled={remainingBudget<=0}> Add Expense </Button>
        { remainingBudget<=0 && <small> Not enough budget, update an amount to add expenses</small>  } 
        
        <Modal  title="Add Expense" 
                open={isModalOpen} 
                onCancel={handleCancel} 
                okButtonProps={{style:{display:'none'}}}
                cancelButtonProps={{style:{backgroundColor:'#f44336',color:'white'}}} 
        >
          <ExpensesForm remainingBudget={remainingBudget} 
                        action='Add Expense' 
                        handleCancel={handleCancel}
          />
        </Modal> 
      
        <input type="text" value={search} onChange={handleChange} placeholder='Search Item/Category' />
        <div className='expenses-filter'>
          <h2>Expenses - {expensesData.length}</h2>
          <select onChange={handleFilter}>
              <option value="non-deleted">Non-Deleted</option>
              <option value="deleted" >Deleted</option>
              <option value="all">All</option>
          </select><br/>
        </div>

        <ExpensesTable  handleToggle={handleToggle} 
                        expensesData={expensesData} 
                        remainingBudget={remainingBudget}
        /><br/>
      </div>
    </div>
  )
}

export default Dashboard