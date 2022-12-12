const userReducer = (state = {}, action) => {
    switch(action.type)
    {
        case 'GET_USER':{
            return {...action.payload}
        }
        case 'UPDATE_IMAGE':{
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

export default userReducer