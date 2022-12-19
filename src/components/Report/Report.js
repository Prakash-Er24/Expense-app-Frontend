import React,{ useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useDispatch } from 'react-redux';
import { ComponentToPrint } from './Print';
import { startSelectedMonth } from '../../actions/monthAction';
import { startGetBudget } from '../../actions/budgetAction';
import { startGetExpenses } from '../../actions/expensesAction';
import { startGetCategoryWise } from '../../actions/categoryWiseListAction';
import '../../styling/report.css'

const Report = () => {
    const [dataArray, setdataArray] = useState([]);
    const [check,setCheck]=useState({})

    const dispatch = useDispatch()
    

    useEffect(()=>{
        dispatch(startSelectedMonth(localStorage.getItem('month')))
        dispatch(startGetExpenses('all'))
        dispatch(startGetCategoryWise())
        dispatch(startGetBudget())
      },[dispatch])

    useEffect(()=>{
      const obj = dataArray.map(ele=>{
        return {[ele]:true}
      })
      setCheck(obj)
    },[dataArray])
    
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChange = (e) => {
    if(e.target.checked)
    {
      setdataArray([...dataArray,e.target.value])
    }
    else
    {
      const result = dataArray.filter(ele=>ele!==e.target.value)
      setdataArray([...result])
    }
  }

  return (
    <div className='report'>
      <button onClick={handlePrint} className="printBtn">Print!</button>
      <div className='check-box'>
        <input type="checkbox" value="CategoryWiseList" checked={check.CategoryWiseList} onChange={handleChange}/>
        <span>Category Wise List</span>
        <input type="checkbox" value="nondeleted" checked={check.nondeleted} onChange={handleChange}/>
        <span>Non-Deleted Expenses</span>
        <input type="checkbox" value="deleted" checked={check.deleted} onChange={handleChange} />
        <span>Deleted Expenses</span>
      </div>
      <ComponentToPrint ref={componentRef} dataArray={dataArray} />
    </div>
  );
};

export default Report