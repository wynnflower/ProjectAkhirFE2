// import axios from 'axios'
// import {urlApi} from './../support/urlAPI' // urlAPi -> dari const di urlApi.js, kalau default pake alias

// export const getProduct=()=>{
//     return (dispatch)=>{
//         dispatch({
//             type:"LOADING"
//         })
//         axios.get(urlApi+'/product')
//         .then((res)=>{
//             console.log(res)
//             if(res.data.length>0){
//                 dispatch({
//                     type:'GET_SUCCESS'
//                 })
//             } else{
//                 dispatch({
//                     type:'PRODUCT_NOT_FOUND'
//                 })
//             }
            
//         })
//         .catch((err)=>{
//             console.log(err)
//             dispatch({
//                 type:'SERVER_ERROR'
//             })
//         })
//     }
// }
export const inputProduk = (list) => {
    
    return{
        type :'INPUT_PRODUK', // tipe
        payload : list // value kita kirim ke reducer
    }
}