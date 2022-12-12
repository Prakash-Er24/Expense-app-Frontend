import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Table, Space, Popconfirm, Modal } from 'antd'
import swal from 'sweetalert'

import { startUpdateExpense } from '../../actions/expensesAction';
import ExpensesForm from './ExpensesForm';
import restore from '../../icons/restore.png'
import trash from '../../icons/trash.png'
import edit from '../../icons/edit.png'
import '../../styling/dashboard.css'

function ExpensesTable(props) {
    const { handleToggle, expensesData, remainingBudget } = props
    const [expense,setExpense] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
 
    const dispatch = useDispatch()
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const confirm = (data,action)=>{
        if(action==='restore' && remainingBudget<data.amount)
        {
            swal({title:'Not enough budget. Update Budget to restore',icon:'warning'})
        }
        else{
            handleToggle()
            dispatch(startUpdateExpense(data.id,action))
        }
    }

    const showModal = (expense) => {
        setExpense(expense)
        setIsModalOpen(true)
    }
    
    const dataSource = expensesData.map((ele,i)=>{
        return ({
            key:i+1,
            id:ele._id,
            title:ele.title,
            category:ele.category.name,
            categoryId:ele.category._id,
            isdeleted:ele.isdeleted,
            amount:ele.amount,
            expenseDate:ele.expenseDate.slice(0,10).split('-').reverse().join('-'),
        })
    })

    const columns = [
        {
            title:'Sl.No',
            key:'key',
            render:(record)=>( 
                record.isdeleted?<s>{record.key}</s>:<span>{record.key}</span>
            )
        },
        {
            title:'Category',
            key:'category',
            render:(record)=>(
                record.isdeleted?<s>{record.category}</s>:<span>{record.category}</span>
            )
        },
        {
            title:'Item name',
            key:'title',
            render:(record)=>(
                record.isdeleted?<s>{record.title}</s>:<span>{record.title}</span>
            )
        },
        {
            title:'Amount',
            key:'amount',
            render:(record)=>(
                record.isdeleted?<s>{record.amount}</s>:<span>{record.amount}</span>
            )
        },
        {
            title:'Expense date',
            key:'expenseDate',
            render:(record)=>( 
                record.isdeleted?<s>{record.expenseDate}</s>:<span>{record.expenseDate}</span>
            )
        },
        {
            title:'Action',
            key:'action',
            render:(record)=>
                (       
                            record.isdeleted ?
                           ( <Popconfirm
                                title="Are you sure to restore this expense?"
                                onConfirm={()=>confirm(record,'restore')}
                                okText="Yes"
                                cancelText="No"
                            >
                                 <img src={restore} alt="restore" height="25px" style={{cursor:'pointer'}} title="Restore"/>
                            </Popconfirm>) :
                            <Space size="large">
                                <img src={edit} alt="edit" height="25px" style={{cursor:'pointer'}} 
                                        title="edit" onClick={()=>{showModal(record)}}/>
                                <Popconfirm
                                    title="Are you sure to delete this expense?"
                                    onConfirm={()=>confirm(record, 'delete')}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <img src={trash} alt="delete" height="25px" style={{cursor:'pointer'}} title='Delete'/>
                                </Popconfirm>         
                            </Space>     
                )
        }
    ]
    
  return (
    <div >
            <div className='expenses-table'>
              <Table dataSource={dataSource} 
                    columns={columns} 
                    pagination={{ pageSize: 5 }} 
                    size="small"
                    style={{fontSize: '50px'}}
                />
            </div>

              <Modal title="Edit Expense" 
                    open={isModalOpen} 
                    onCancel={handleCancel} 
                    okButtonProps={{style:{display:'none'}}}
                    cancelButtonProps={{style:{backgroundColor:'#f44336',color:'white'}}}
                >
                    <ExpensesForm   action='Update' 
                                    handleCancel={handleCancel} 
                                    {...expense} 
                                    
                    />
              </Modal>
    </div>
  )
}

export default ExpensesTable