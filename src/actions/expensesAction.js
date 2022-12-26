import axios from 'axios'
import swal from 'sweetalert'

export const startAddExpense = (data,closeModal,resetForm) => {
    return (dispatch) => {
        axios.post('http://localhost:3210/api/user/expense',data,{
            params:{month:localStorage.getItem('month')},
            headers:{'authorization':localStorage.getItem('token') }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('notice'))
                {
                    swal({title:result.notice,icon:'warning'})
                }
                else if(result.hasOwnProperty('errors'))
                {
                    swal({title:result.errors.message,icon:'error'})
                }
                else
                {
                    dispatch(addExpense(result))
                    closeModal()
                    resetForm()
                }
            })
            .catch((err)=>{
                console.log(err)
                swal({title:err.message,icon:'error'})
            })
    }
}

const addExpense = (data) => {
    return { type:'ADD_EXPENSES', payload:data}
}

export const startGetExpenses = (action) => {
    return (dispatch) => {
        axios.get(`http://localhost:3210/api/user/expenses?action=${action}`,{
            params:{month:localStorage.getItem('month')},
            headers:{'authorization':localStorage.getItem('token') }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('notice'))
                {
                    swal({title:result.notice,icon:'warning'})
                }
                else if(result.hasOwnProperty('errors'))
                {
                    swal({title:result.errors.message,icon:'error'})
                }
                else
                {
                    dispatch(getExpenses(result))
                }
            })
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
               
            })
}
}

const getExpenses = (data) => {
    return { type:"GET_EXPENSES", payload:data }
}

export const startUpdateExpense = (id,action,data=null,closeModal) => {
    return (dispatch) => {
        axios.put(`http://localhost:3210/api/user/expenses/${id}?action=${action}`,data,{
            params:{month:localStorage.getItem('month')},    
            headers:{ 'authorization':localStorage.getItem('token') }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('notice'))
            {
                swal({title:result.notice,icon:'warning'})
            }
            else if(result.hasOwnProperty('errors'))
            {
                swal({title:result.errors.message,icon:'error'})
            }
            else
            {
                dispatch(updateExpense(result))
                if(closeModal)
                {
                    closeModal()
                }
            }
        })
        .catch((err)=>{
            swal({title:err.message,icon:'error'})
        })
    }
}

const updateExpense = (data) => {
    return {type:'UPDATE_EXPENSE',payload:data}
}