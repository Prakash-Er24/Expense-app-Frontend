const categoriesReducer = (state = [], action) => {
    switch(action.type)
    {
        case 'ADD_CATEGORY':{
            return [...state,{...action.payload}]
        }
        case 'GET_CATEGORIES':{
            return [...action.payload]
        }
        case 'UPDATE_CATEGORIES':{
           return state.map(ele=>{
            if(action.payload._id===ele._id)
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

export default categoriesReducer