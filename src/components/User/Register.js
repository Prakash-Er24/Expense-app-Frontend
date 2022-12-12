import React from 'react'
import { useFormik  } from 'formik'
import * as Yup from 'yup'
import swal from 'sweetalert'
import { startUserRegister } from '../../actions/userAction'
import '../../styling/register.css'

function Register(props) {
    const formik = useFormik({
        initialValues:{
            email:'',
            password:'',
            name:'',
            occupation:''
        },
        validationSchema:Yup.object({
            email:Yup.string().required().email(),
            password:Yup.string().required().min(8),
            name:Yup.string().required()
        }),
        onSubmit:function(values){
            const data = {
                email:values.email,
                password:values.password,
                profile:{
                    name:values.name,
                    occupation:values.occupation
                }
            }
            
            const success = () => {
                swal({title:"Registered SuccessFully", icon:'success'})
                props.history.push('/login')
            }
            startUserRegister(data,success)
        }
    })
  return (
    <div className='register'>
        <h2>Register here</h2>
        <form onSubmit={formik.handleSubmit}>
            <input  type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Name"
            /><br/>
            {
                formik.touched.name && formik.errors.name && <span>{formik.errors.name}</span>
            }
            <br/>
            <input  type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Email"
            /><br/>
            {
                formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>
            }
            <br/>

            <input  type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Password"
            /><br/>
            {
                formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>
            }
            <br/>
            <input  type="text"
                    name="occupation"
                    value={formik.values.occupation}
                    onChange={formik.handleChange}
                    placeholder="Occupation"
            /><br/>
            <input type = "submit" value="Register" />
        </form>    
    </div>
  )
}

export default Register