const budgetReducer = (state = {}, action) => {
    switch(action.type)
    {
        case 'GET_BUDGET':{
            return {...action.payload}
        }
        case 'UPDATE_BUDGET':{
            return {...state,...action.payload}
        }
        case 'LOGOUT':{
            return {}
        }
        default:{
            return state
        }
    }
}

export default budgetReducer