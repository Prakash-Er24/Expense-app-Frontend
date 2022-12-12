import axios from 'axios'
import swal from 'sweetalert'

export const startGetCategoryWise = () => {
    return (dispatch) => {
        axios.get('http://localhost:3210/api/user/category-wise-list',{
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
                    dispatch(getCategoryWise(result))
                }
            })
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
            })
}
}

const getCategoryWise = (data) => {
    return { type:"GET_CATEGORy_WISE", payload:data }
}
