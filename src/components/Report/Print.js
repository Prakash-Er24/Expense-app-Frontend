import React from "react";
import { useSelector } from "react-redux";
import '../../styling/report.css'
export const ComponentToPrint = React.forwardRef((props, ref) => {
    const {dataArray} = props
    const budget = useSelector((state)=>state.budget.amount)
    const month = useSelector((state)=>state.month)
    const categoryWiseList = useSelector((state)=>state.categoryWiseData)
    const expenses = useSelector((state)=>state.expenses)
    const nonDeletedExpenses = expenses.filter(ele=>!ele.isdeleted)
    const deletedExpenses = expenses.filter(ele=>ele.isdeleted)
    const totalExpense = categoryWiseList.reduce((pv,cv)=>{
        return pv+cv.totalAmount
    },0)
    const totalDeletedExpense = expenses.reduce((pv,cv)=>{
        return !cv.isdeleted?pv:pv+cv.amount
    },0)

    return (
      <div ref={ref} className="print-table">
        {month.length>0 && <p className="print-title">{month[0].month} - {month[0].year}</p>}
        <h1>Total Budget - {budget}</h1>
        { nonDeletedExpenses.length>0 && <h1>Total Expense - {totalExpense} </h1>}
        {  deletedExpenses.length>0 &&<h1>Total Expense(Deleted) - {totalDeletedExpense}</h1>}<hr/>
       {
        dataArray.includes('CategoryWiseList') && 
        <>
        <h3>Category Wise List</h3>
        {
            categoryWiseList.length>0 ?
            <table className="category-wise-list">
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>Category name</th>
                        <th>Total Expenses</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categoryWiseList.map((ele,i)=>{
                            return (<tr key={i}>
                                <td>{i+1}</td>
                                <td>{ele.categoryName}</td>
                                <td>{ele.count}</td>
                                <td>{ele.totalAmount}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table> : <p>No data</p>
        }
        </>
        }
        {
            dataArray.includes('nondeleted') &&  <>
            <h3>Non-Deleted Expenses</h3>
           {
           nonDeletedExpenses.length>0 ? 
            <table className="non-deleted-expense">
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>Category name</th>
                        <th>Item name</th>
                        <th>Amount</th>
                        <th>Expense Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        nonDeletedExpenses.map((ele,i)=>{
                            return (<tr key={i}>
                                <td>{i+1}</td>
                                <td>{ele.category.name}</td>
                                <td>{ele.title}</td>
                                <td>{ele.amount}</td>
                                <td>{ele.expenseDate.slice(0,10).split('-').reverse().join('-')}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table> : <p>No data</p>
        }
        </>
        }
        {
           dataArray.includes('deleted') && 
           <>
            <h3>Deleted Expenses</h3>
            {
            deletedExpenses.length>0 ? 
            <table className="deleted-expense">
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>Category name</th>
                        <th>Item name</th>
                        <th>Amount</th>
                        <th>Expense Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        deletedExpenses.map((ele,i)=>{
                            return (<tr key={i}>
                                <td>{i+1}</td>
                                <td>{ele.category.name}</td>
                                <td>{ele.title}</td>
                                <td>{ele.amount}</td>
                                <td>{ele.expenseDate.slice(0,10).split('-').reverse().join('-')}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table> : <p> No data</p>
        }
        </>}
      </div>
    );
  });