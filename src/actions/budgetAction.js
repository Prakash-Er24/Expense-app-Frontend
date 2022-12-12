import axios from 'axios'
import swal from 'sweetalert'

export const startGetBudget = () => {
    return (dispatch) => {
        axios.get('http://localhost:3210/api/user/budget',{
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
                    swal({title:result.errors.message,icon:'warning'})
                }
                else
                {
                    dispatch(getBudget(result))
                }
            })
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
            })
    }
}

const getBudget = (data) => {
    return {type:'GET_BUDGET', payload:data}
}

export const startUpdateBudget = (data, resetForm) => {
    return (dispatch) => {
        axios.put('http://localhost:3210/api/user/budget',data,{
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
                    swal({title:result.errors.message,icon:'warning'})
                }
                else
                {
                    resetForm()
                    dispatch(getBudget(result))
                    swal({title:'Budget updated successfully',icon:'success'})
                }
            })
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
            })
    }
}


