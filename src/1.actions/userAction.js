import axios from 'axios'
import {urlApi} from './../support/urlAPI' // urlAPi -> dari const di urlApi.js, kalau default pake alias
import cookie from 'universal-cookie'
import swal from 'sweetalert';

const objCookie=new cookie()
export const onLogin=(paramUsername,paramPassword)=>{
    return(dispatch)=>{ // sebagai middleware --> function yg menerima object
        //Ini untuk mengubah loading menjadi true
        dispatch({
            type:'LOADING'
        })

        // Get Data dari Fake Api Json Server
        // axios.get('http://localhost:2000/users',{ //asynchronous action
        axios.get('http://localhost:4000/user/logincart',{
            params:{username:paramUsername,
                password:paramPassword} //username(json/fake api):username(parameter)
        })

        //Kalau berhasil, dia masuk then
        .then((res)=>{
            console.log(res)
            // if username dan password sesuai maka res.data ada isinya
            if(res.data.length>0){
                //alert(res.data[0].username)
                if(res.data=='Please Verify your Email'){
                    dispatch({
                        type:'NEED_VERIFICATION'
                    })
                }else if(res.data=='Username / Password invalid'){
                    dispatch({
                        type:'USER_NOT_FOUND'
                    })
                } else {
                   dispatch(
                    {
                        type: 'LOGIN_SUCCESS',
                        payload:{
                            username:res.data[0].username,
                            role:res.data[0].role,
                            id:res.data[0].id,
                            verified:res.data[0].verified,
                            cartitems:res.data[0].cartitems
                        }
                    }
                    )

                objCookie.set('userData',paramUsername,{path:'/'}) 
                }
                
            } else{
                dispatch({
                    type:'USER_NOT_FOUND'
                })
            }
            
        })
        .catch((err)=>{console.log(err)
            dispatch({
                type:'SERVER_ERROR'
            })
        })
    }
    
}

export const keepLogin=(cookie)=>{
    return (dispatch)=>{
        axios.get('http://localhost:4000/user/keeplogincart',{params:{username:cookie}})
        .then((res)=>{
            if(res.data.length>0){
                //alert('cookie get')
                if(res.data=='Please Verify your Email'){
                    dispatch({
                        type:'NEED_VERIFICATION'
                    })
                }else if(res.data=='Username / Password invalid'){
                    dispatch({
                        type:'USER_NOT_FOUND'
                    })
                }else{
                   dispatch({
                    type:'LOGIN_SUCCESS',
                    payload:{
                        username:res.data[0].username,
                        role:res.data[0].role,
                        id:res.data[0].id,
                        verified:res.data[0].verified,
                        cartitems:res.data[0].cartitems
                    }// <-- dari userGlobal
                }) 
                }
                
            }
        })
        .catch((err)=>console.log(err))
    }
    
}

export const getUserCart=(paramUsername)=>{
    return (dispatch)=>{
        axios.get('http://localhost:4000/cart/getcartcount',{params:{username:paramUsername}})
        .then((res)=>{
            if(res.data.length>0){
                dispatch({
                    type:'ADD_CART',
                    payload:{
                        username:res.data[0].username,
                        verified:res.data[0].verified,
                        id:res.data[0].id,
                        cartitems:res.data[0].cartitems
                    }// <-- dari userGlobal
                })
            }
        })
        .catch((err)=>console.log(err))
    }
    
}

export const resetUser=()=>{
    return{
        type:'RESET_USER'
    }
}

export const userRegister=(paramUsername,paramPassword,paramEmail,paramPhone)=>{
    return (dispatch)=>{
        dispatch({
            type:'LOADING'
        })
        var newData={username:paramUsername,password:paramPassword,email:paramEmail,phone:paramPhone}
        axios.get(urlApi+'/user/checkusername?username='+newData.username)
        .then((res)=>{ // kalau username sudah ada
            console.log(res)

            if(res.data.length>0){
                dispatch({
                    type:'USERNAME_NOT_AVAILABLE'
                })
            } else{ // kalau username belum ada
                axios.post(urlApi+'/user/register2',newData)
                .then((res)=>{
                    console.log(res)
            // alert('masuk')
                    alert('Registrasi berhasil, Silahkan lakukan verifikasi via email untuk mengaktifkan akun!')
                    swal({title: "Registration",
                    text: "Registrasi Sukses, Cek Email untuk verifikasi",
                    icon: "success",
                    button: "OK"})
                    dispatch({
                        type:'REGISTER_SUCCESS'
                    })
                    // dispatch({
                    //     type:'LOGIN_SUCCESS',
                    //     // payload:paramUsername
                    //         payload:{username:res.data[0].username,
                    //             role:res.data[0].role,
                    //             id:res.data[0].id,
                    //             verified:res.data[0].verified,
                    //             cartitems:res.data[0].cartitems}
                    //     //mengirim payload dalam bentuk object
                    //     //payload:{username:newData.username,id:res.data.id,email:paramEmail}
                    // })
                    // objCookie.set('userData',paramUsername,{path:'/'})
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            dispatch({
                type:'SERVER_ERROR',
            })
        })
    }
}

