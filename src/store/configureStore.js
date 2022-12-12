import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import categoryWiseReducer from '../reducers/categoryWiseReducer'
import categoriesReducer from '../reducers/categoriesReducer'
import expensesReducer from '../reducers/expensesReducer'
import budgetReducer from '../reducers/budgetReducer'
import monthReducer from '../reducers/monthReducer'
import userReducer from '../reducers/userReducer'

const configureStore = ()=>{
    const store = createStore(combineReducers({
        categoryWiseData : categoryWiseReducer,
        categories : categoriesReducer,
        expenses : expensesReducer,
        budget : budgetReducer,
        month : monthReducer,
        user : userReducer
    }),applyMiddleware(thunk))
return store
}

export default configureStore