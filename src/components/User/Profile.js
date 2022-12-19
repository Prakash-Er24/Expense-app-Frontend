import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import swal from 'sweetalert'
import { startGetUser, startUpdateUserImage } from '../../actions/userAction'
import { startSelectedMonth } from '../../actions/monthAction'
import defaultImg from '../../icons/default.png'
import '../../styling/profile.css'

function Profile(props) {
    const dispatch = useDispatch()
    const [selectImage,setSelectImage] = useState('')

    const user = useSelector((state)=>state.user)

    useEffect(()=>{
        dispatch(startGetUser()) 
        localStorage.getItem('month') && dispatch(startSelectedMonth(localStorage.getItem('month')))
    },[dispatch])

    const handleChange = (e) => {
        setSelectImage(e.target.files[0])
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image',selectImage)
        const reset = () => {
            swal({title:'Profile picture succesfully updated',icon:'success'})
            setSelectImage('')
        }
        dispatch(startUpdateUserImage(formData,reset))
    }
       
    return (
        <div className='profile'>
            <h2>Profile</h2>
            <img src={user.img ? `http://localhost:3210/${user.img}`: defaultImg} alt="Profile"  className='image'/>            { 
                Object.keys(user).length>0 && <>              
                    <p>Name - {user.profile.name} </p>
                    <p>Email - {user.email} </p>
                    {user.profile.occupation && <p>Occupation - {user.profile.occupation} </p>}
                    <p>Account created At - {user.createdAt.slice(0,10)} / {user.createdAt.slice(11,16)} </p>
                </>
            }
            <b>Upload Profile picture</b><br/>
            <img src={selectImage ? URL.createObjectURL(selectImage) :''} alt="" className='check-image' />
            <form onSubmit = {handleSubmit}>
                <input type="file" onChange={handleChange} />
                <input type="submit" value="Upload" disabled={!selectImage}
                style={{backgroundColor:!selectImage && 'transparent',color:!selectImage && 'gray'}}
                /><br/>
            </form>
        </div>
  )
}

export default Profile