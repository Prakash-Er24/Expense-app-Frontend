import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { startAddCategory } from '../../actions/categoryAction'
import '../../styling/settings.css'

function CategoryForm(props) {
    const { formSubmission, name, action } = props

    const dispatch = useDispatch()
    
    const formik = useFormik({
        initialValues:{
            name:name || ''
        },
        validationSchema:Yup.object({
            name:Yup.string().required('Category Name is required')
        }),
        onSubmit:function(value,{resetForm}){
            if(name && formSubmission)
            {
                formSubmission(value)
            }
            else
            {
                dispatch(startAddCategory(value,resetForm))
            }
        }
    })

  return (
    <div className='category-form'>
        <form onSubmit={formik.handleSubmit}>       
            <input  type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Add Category"
            /><br/>
            {
                formik.touched.name && formik.errors.name && <small style={{color:'red'}}>{formik.errors.name}</small>
            }
            <input type="submit" value={action} style={{backgroundColor:action==='Update'&&'green',color:action==='Update' && 'white'}} /> <br/>
        </form>
    </div>
  )
}

export default CategoryForm