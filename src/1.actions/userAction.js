import axios from 'axios'
import {urlApi} from './../support/urlAPI' // urlAPi -> dari const di urlApi.js, kalau default pake alias
import cookie from 'universal-cookie'

const objCookie=new cookie()
export const onLogin=(paramUsername,paramPassword)=>{
    return(dispatch)=>{ // sebagai middleware --> function yg menerima object
        //Ini untuk mengubah loading menjadi true
        dispatch({
            type:'LOADING'
        })

        // Get Data dari Fake Api Json Server
        axios.get('http://localhost:2000/users',{ //asynchronous action
            params:{username:paramUsername,
                password:paramPassword} //username(json/fake api):username(parameter)
        })

        //Kalau berhasil, dia masuk then
        .then((res)=>{
            console.log(res)
            // if username dan password sesuai maka res.data ada isinya
            if(res.data.length>0){
                dispatch(
                    {
                        type: 'LOGIN_SUCCESS',
                        payload:{
                            username:res.data[0].username,
                            role:res.data[0].role,
                            id:res.data[0].id
                        }
                    }
                )
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
        axios.get('http://localhost:2000/users',{params:{username:cookie}})
        .then((res)=>{
            if(res.data.length>0){
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload:{
                        username:res.data[0].username,
                        role:res.data[0].role,
                        id:res.data[0].id}// <-- dari userGlobal
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
        axios.get(urlApi+'/users?username='+newData.username)
        .then((res)=>{ // kalau username sudah ada
            console.log(res)
            if(res.data.length>0){
                dispatch({
                    type:'USERNAME_NOT_AVAILABLE'
                })
            } else{ // kalau username belum ada
                axios.post(urlApi+'/users',newData)
                .then((res)=>{
                    console.log(res)
                    dispatch({
                        type:'LOGIN_SUCCESS',
                        // payload:paramUsername
                        payload:{username:res.data[0].username,
                            role:res.data[0].role,
                            id:res.data[0].id}
                        //mengirim payload dalam bentuk object
                        //payload:{username:newData.username,id:res.data.id,email:paramEmail}
                    })
                    objCookie.set('userData',paramUsername,{path:'/'})
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

