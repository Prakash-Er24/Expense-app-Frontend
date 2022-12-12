const categoryWiseReducer = (state = [], action) => {
    switch(action.type){
        case "GET_CATEGORy_WISE" :{
            return [...action.payload]
        }
        case "LOGOUT" : {
            return []
        }
        default:{
            return state
        }
    }
}

export default categoryWiseReducer