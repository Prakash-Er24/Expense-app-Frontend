import React from 'react'
import { Chart } from "react-google-charts";
import '../../styling/dashboard.css'

function CategoryChart(props) {
    const { categoryWiseData,totalExpense } = props
    const data = [['Category','Expense']]

    categoryWiseData.forEach(ele=>{  
          data.push([ele.categoryName,ele.totalAmount])
      })
      const options = {
        title:`Total Expense - Rs. ${totalExpense}`,
        is3D:true,
        backgroundColor:'transparent'
      }
       
  return (
    <div style={{margin:"10px 0 0 10px"}}>
      <b>Category Chart</b><br/>
      <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"110%"}
            height={"350px"}
          />
    </div>
  )
}

export default CategoryChart


