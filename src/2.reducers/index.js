import {combineReducers} from 'redux' // nggabungin reducer
import UserState from './userGlobal'
import ProductState from './productGlobal'

export default combineReducers({
    user: UserState,
    produk: ProductState
})