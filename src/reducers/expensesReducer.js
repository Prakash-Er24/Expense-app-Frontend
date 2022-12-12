const expensesReducer = (state = [], action) => {
    switch(action.type)
    {
        case 'ADD_EXPENSES':{
            return [...state,{...action.payload}]
        }
        case 'GET_EXPENSES' :{
            return [...action.payload]
        }
        case 'UPDATE_EXPENSE' : {
            return state.map(ele=>{
                if(ele._id === action.payload._id)
                {
                    return {...ele,...action.payload}
                }
                else
                {
                    return {...ele}
                }
            })
        }
        case 'LOGOUT':{
            return []
        }
        default:{
            return state
        }
    }
}

export default expensesReducer