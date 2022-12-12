const monthReducer = (state=[],action) => {
    switch(action.type)
    {
        case 'ADD_MONTH':{
            return [...state,action.payload]
        }
        case 'GET_MONTHS':{
            return [...action.payload]
        }
        case 'GET_MONTH':{
            return [{...action.payload}]
        }
        case 'LOGOUT' : {
            return []
        }
        default:{
            return state
        }
    }
}

export default monthReducer