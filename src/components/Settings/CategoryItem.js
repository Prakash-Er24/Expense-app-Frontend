import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { Space, Popconfirm } from 'antd';

import edit from '../../icons/edit.png'
import trash from '../../icons/trash.png'
import restore from '../../icons/restore.png'
import CategoryForm from './CategoryForm'
import { startUpdateCategory } from '../../actions/categoryAction'
import '../../styling/settings.css'

function CategoryItem(props) {
    const {_id, name, isdeleted} = props
    const [toggle,setToggle] = useState(false)
    const dispatch = useDispatch()

    const handleCategoryUpdate = (id,action) => {
        dispatch(startUpdateCategory(id,action))
      }

      const handleToggle = () => {
        setToggle(!toggle)
      }

      const formSubmission = (data) => {
        dispatch(startUpdateCategory(_id,'edit',data))
        handleToggle()
      }

    return (
    <div className='category-item'>           

        {
            toggle ? 
            <div className='category-edit-form'>
              <CategoryForm formSubmission={formSubmission} {...props} action="Update" />
              <button onClick={handleToggle} >Cancel</button>
            </div> :
            <div>
              <span style={{textDecoration:isdeleted ?'line-through':'none',fontSize:"120%"}}>{name}</span><br/><br/>
            <Space size="large">
              {
                !isdeleted && (<img src={edit} alt="edit" height="25px" style={{cursor:'pointer'}} 
                                    title="edit" onClick={handleToggle} />)
              }
              {
                  isdeleted ? 
                  <Popconfirm
                        title="Are you sure to restore this category?"
                        onConfirm={()=>handleCategoryUpdate(_id,'restore')}
                        okText="Yes"
                        cancelText="No"
                  >
                     <img src={restore} alt="restore" height="25px" style={{cursor:'pointer'}} title="restore" />
                  </Popconfirm>:
                  <Popconfirm
                        title="Are you sure to delete this category?"
                        onConfirm={()=>handleCategoryUpdate(_id,'delete')}
                        okText="Yes"
                        cancelText="No"
                  >
                     <img src={trash} alt="delete" height="25px" style={{cursor:'pointer'}} title="delete" />
                  </Popconfirm>
              }
              </Space>
            </div>
        }
    
    </div>
  )
}

export default CategoryItem