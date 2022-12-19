import axios from 'axios'
import swal from 'sweetalert'

export const startAddMonth = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3210/api/user/month',data,{
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
                dispatch(addMonth(result))
            }
        })
        .catch((err)=>{
            swal({title:err.message,icon:'error'})
        })
}
}

const addMonth = (data) => {
    return {type:'ADD_MONTH',payload:data}
}

export const startGetMonths = () => {
    return (dispatch) => {
        axios.get('http://localhost:3210/api/user/month',{
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
                dispatch(getMonths(result))
            }
        })
        .catch((err)=>{
            swal({title:err.message,icon:'error'})
        })
}
}

const getMonths = (data) => {
    return {type:'GET_MONTHS',payload:data}
}

export const startSelectedMonth = (id,redirect) => {
    return (dispatch) => {
        axios.get(`http://localhost:3210/api/user/month/${id}`,{
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
                dispatch(getMonth(result))
                if(redirect)
                {
                    redirect(result)
                }
            }
        })
        .catch((err)=>{
            swal({title:err.message,icon:'error'})
        })
}
}

const getMonth = (data) => {
    return {type:'GET_MONTH',payload:data}
}

