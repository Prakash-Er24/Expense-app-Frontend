import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import {startUpdateBudget} from '../../actions/budgetAction'
import '../../styling/settings.css'

function Budget(props) {
    const dispatch = useDispatch()

    const totalBudget = useSelector((state)=>state.budget.amount?state.budget.amount:0)
    const expenses = useSelector((state)=>state.expenses)
    const totalExpense = expenses.reduce((pv,cv)=>{
        return cv.isdeleted ? pv:pv+cv.amount
    },0)
    
    const formik = useFormik({
        initialValues:{
            budget:''
        },
        validationSchema:Yup.object({
            budget:Yup.number().required().typeError('Budget should be a number')
        }),
        onSubmit:function(value, {resetForm}){
            const data = { amount : Number(value.budget) } 
            if(totalExpense<=data.amount)
            {
                dispatch(startUpdateBudget(data,resetForm))
            }
            else
            {
                swal({title:'Your budget is less than the expenses',icon:'warning'})
            }
        }
    })

    return (
    <div className='budget-form'>
        <form onSubmit={formik.handleSubmit}>
            <input  type="text"
                    name="budget"
                    value={formik.values.budget}
                    placeholder={totalBudget}
                    onChange={formik.handleChange}
            /><br/>
            {
                formik.touched.budget && formik.errors.budget && <small style={{color:'red'}}>{formik.errors.budget}</small>
            }
            <input type="submit" value="update" /><br/>
        </form>
    </div>
  )
}

export default Budget