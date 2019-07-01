import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string'


class Verify extends React.Component{
    state = {error : '',isVerified:false,username:'',password:''}
    componentDidMount(){
        console.log(this.props.location.search)
        const values = queryString.parse(this.props.location.search)
        var userQuery=values.username // "piko"
        var passQuery=values.password // "hashPassword"
        this.setState({username:userQuery,password:passQuery})
    }
    onBtnVerify = () => {
        if(this.refs.verifyCode.value){
            var verifyData = {
                kode : this.refs.verifyCode.value,
                username: this.state.username,
                password : this.state.password
            }
            //alert(verifyData.kode)
            // alert(verifyData.username)
            // alert(verifyData.password)
            axios.put('http://localhost:4000/user/verify',verifyData)
            .then((res)=>{
                if(typeof(res.data)==='object'){
                    alert(res.data.msg)
                    this.setState({error:res.data.msg})
                } else{
                    alert(res.data)
                    this.setState({isVerified:true})
                }
            })
            .catch((err)=>{
                console.log(err)
            })

        }else{
            //this.setState({error : 'semua form harus diisi'})
            alert('Kode Verifikasi harus diisi')
        }
    }

    render(){
        if(this.state.isVerified===false){
            return(
                        <div className="container">
                            <center>
                                <h5 className="mb-2">Masukkan Kode Verifikasi</h5>
                                {/* <input type="text" style={{width:'50%'}} className="form-control mb-2" placeholder="Masukkan Kode"/> */}
                                <input className="mb-2 mr-2" type="text" ref="verifyCode" placeholder=""/>
                                <input type="button" value="verify" className="btn btn-primary" onClick={this.onBtnVerify}/>
                                {/* <p className="mb-2">Klik di sini apabila anda tidak menerima kode verifikasi</p>     */}
                            </center>         
                        </div>
                    )
        }
        return(
            <center>
                <h1>Verification Success, Klik di <Link to="/login">sini</Link> untuk login</h1>
            </center>
        )
        
    }
}

export default Verify