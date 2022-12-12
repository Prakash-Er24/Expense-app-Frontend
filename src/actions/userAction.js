import axios from 'axios'
import swal from 'sweetalert'

export const startUserRegister = (data,success) => {
    axios.post('http://localhost:3210/api/user/register',data)
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('notice'))
            {
                swal({title:result.notice,icon:'warning'})
            }
            else if(result.hasOwnProperty('errors'))
            {
                swal({text:result.message, icon:'error'})
            }
            else if(result === 'success')
            {
                success()
            }
            else
            {
                swal({title:"Unable to register", icon:'error'})
            }
        })
        .catch((err)=>{
            swal({title:err.message,icon:'error'})
        })
        
}
export const startUserLogin = (data,loggedin) => {
    axios.post('http://localhost:3210/api/user/login',data)
        .then((response)=>{
            const result = response.data
       
            if(result.hasOwnProperty('errors'))
            {
                swal({title:result.errors.message, icon:'error'})
            }
            else if(result.hasOwnProperty('token'))
            {
                localStorage.setItem('token',result.token)
                loggedin()
            }
            else 
            {
                swal({title:"Unable to login", icon:'error'})
            }
        })
        .catch((err)=>{
            swal({title:err.message,icon:'error'})
        })
}

export const startGetUser = () => {
    return  (dispatch)=> {
    axios.get('http://localhost:3210/api/user/data',{
        headers:{
            'authorization':localStorage.getItem('token')
        }
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
                dispatch(getUser(result))
            }
    })
    .catch((err)=>{
        swal({title:err.message,icon:'error'})
    })
}
}

const getUser = (data) => {
    return {type:'GET_USER',payload:data}
}

export const startUpdateUserImage = (formData,reset) => {
    return (dispatch) => {
        axios.put('http://localhost:3210/api/user/data',formData,{
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
                dispatch(updateImage(result))
                reset()
            }              
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}
 
const updateImage = (data) => {
    return ({type:'UPDATE_IMAGE',payload:data})
    
}

export const logoutAction = () => {
    return {type:'LOGOUT'}
}