import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import swal from 'sweetalert'

import { startAddExpense, startUpdateExpense } from '../../actions/expensesAction'
import '../../styling/expense-form.css'

function ExpensesForm(props) {
    const { id, action, title, amount:Amount, expenseDate, handleCancel } = props
    const dispatch = useDispatch()

    const categories = useSelector((state)=>state.categories)
    const budget = useSelector((state)=>state.budget.amount?state.budget.amount:0)
    const categoryWiseData = useSelector((state)=>state.categoryWiseData)    
    const totalExpense = categoryWiseData.reduce((pv,cv)=>{
        return  pv + cv.totalAmount
    },0)

    const remainingBudget = budget - totalExpense

    const formik = useFormik({
        initialValues:{
            title:title||'', 
            expenseDate:(expenseDate && expenseDate.split('-').reverse().join('-'))||'',
            amount:Amount||'', 
            category:''
        },
        validationSchema:Yup.object({
            title:Yup.string().required(),
            expenseDate:Yup.date().required(),
            amount:Yup.number().required().typeError('Amount should be in number'),
            category:Yup.string().required('Select category')
        }),
        onSubmit:function(values,{resetForm}){
            const {amount} = values
            const data = {...values,amount:Number(amount)}

            const closeModal = () => {
                handleCancel()
                if(action==='Update')
                {
                    swal({title:`Successfully updated`,icon:'success'})
                }
                else{
                    swal({title:`Successfully Added`,icon:'success'})
                }
            }

            if(remainingBudget<Number(amount)- (Amount?Amount:0)){
                swal({title:'Budget is not enough, update budget to add expenses',icon:'warning'})
            }
            else if(action==='Update' && remainingBudget>=Number(amount)-Amount)
            {
                dispatch(startUpdateExpense(id,'update',data,closeModal))
            }
            else if(action==='Add Expense' && remainingBudget>=Number(amount))
            {
                dispatch(startAddExpense(data,closeModal,resetForm))
            }
        }
    })

  return (
    <div className='expenses-form'>
        <form onSubmit={formik.handleSubmit}>
            <input  type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    placeholder="Title"
            />
            {
                formik.touched.title && formik.errors.title && <small> {formik.errors.title}</small>
            }
            <br/>
            <select name="category" onChange={formik.handleChange}>
                <option value=''>Select category</option>
                { 
                    categories.map(category=>{
                        return (!category.isdeleted && 
                        <option key={category._id} value={category._id} >{category.name}</option>)
                    })
                }
            </select>       
            {
               formik.touched.category && formik.errors.category && <small> {formik.errors.category}</small>
            }
            <br/>
            
            <input  type="text"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    placeholder="Amount"
            />
            {
                formik.touched.amount && formik.errors.amount && <small> {formik.errors.amount}</small>
            }
            <br/>
            <input  type="date"
                    name="expenseDate"
                    value={formik.values.expenseDate}
                    onChange={formik.handleChange}
                    placeholder="Expense Date"
            />
            {
                formik.touched.expenseDate && formik.errors.expenseDate && <small> {formik.errors.expenseDate}</small>
            }
            <br/>
            
            <input type="submit" value={action} />

        </form>
    </div>
  )
}

export default ExpensesForm