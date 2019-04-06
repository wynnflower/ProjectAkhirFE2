// const INITIAL_STATE={id:0,nama:'',harga:0,kategori:0,gambar:'',error:'',loading:true}
const INITIAL_STATE={listproduk:[]}

export default(state=INITIAL_STATE , action) => {
    if(action.type == 'INPUT_PRODUK'){
        return{...INITIAL_STATE , listproduk: action.payload}
    }else{
        return state
    }
}

// export default (state=INITIAL_STATE,action)=>{
//     if(action.type==="LOADING"){
//         return {...INITIAL_STATE,loading:true}
//     }else if(action.type==="GET_SUCCESS"){
//         return {...state,error:'Server sedang error'}
//     }else if(action.type==="PRODUCT_NOT_FOUND"){
//         return {...INITIAL_STATE,error:'Product not found'}
//     }else if(action.type==="SERVER_ERROR"){
//         return {...INITIAL_STATE,error:'Server sedang error'}
//     }else{
//         return state
//     }
    
// }