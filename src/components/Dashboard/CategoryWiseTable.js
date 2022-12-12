import React from 'react'
import { Table } from 'antd'

function CategoryTable(props) {
    const { categoryWiseData,totalExpense } = props
    
    const dataSource =categoryWiseData.map((ele,i)=>{
        return ({
            key:i+1,
            category:ele.categoryName,
            expenses:ele.count,
            amount:ele.totalAmount
        })
    })
    
    const columns = [
        {
            title:'Sl.No',
            dataIndex:'key',
        },
        {
            title:'Category',
            dataIndex:'category',
        },
        {
            title:'Total Expense',
            dataIndex:'expenses'
        },
        {
            title:'Amount',
            dataIndex:'amount'
        }
    ]    
    return (
        <div style={{margin:"10px 20px 20px 20px"}}>
                <b>Category Table</b><br/>
                <small style={{marginLeft:"35%"}}>
                    <b>Total Expense - Rs. {totalExpense}</b>
                </small>
                <Table dataSource={dataSource} 
                        columns={columns} 
                        pagination={{ pageSize: 5 }} 
                        className="category-table"
                        size="small"  
                    />
        </div>
  )
}

export default CategoryTable