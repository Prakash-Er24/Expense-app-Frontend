import axios from 'axios'
import swal from 'sweetalert'

export const startAddCategory = (data,resetForm) => {
    return (dispatch) => {
        axios.post('http://localhost:3210/api/user/category',data,{
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
                    dispatch(addCategory(result))
                    resetForm()
                }
            })
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
            })
    }
}

const addCategory = (data) => {
    return { type:'ADD_CATEGORY', payload:data}
}

export const startGetCategories = () => {
    return (dispatch) => {
        axios.get('http://localhost:3210/api/user/category/list',{
            params:{month:localStorage.getItem('month')},
            headers:{'authorization':localStorage.getItem('token')}
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
                    dispatch(getCategories(result))
                }
            })
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
            })
}
}

const getCategories = (data) => {
    return { type:"GET_CATEGORIES", payload:data }
}

export const startUpdateCategory = (id,action,value=null) => {
    return  (dispatch) => {
         axios.put(`http://localhost:3210/api/user/category/${id}?action=${action}`,value,{
                    params:{month:localStorage.getItem('month')},
                    headers:{'authorization':localStorage.getItem('token')}
                })
                .then((response)=>{
                    const result=response.data
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
                        dispatch(updateCategories(result))
                    }
        })
        .catch((err)=>{
            swal({title:err.message,icon:'error'})
        })
    }
}

const updateCategories = (data) => {
    return {type:'UPDATE_CATEGORIES', payload:data}
}

