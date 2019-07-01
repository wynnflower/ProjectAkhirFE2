import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { urlApi } from '../support/urlAPI';
//import swal from 'sweetalert'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class History extends React.Component{
    state={users:[],username:"",nama:"",alamat:"",kota:"",provinsi:""}
    componentDidMount(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var username=this.props.nama
        Axios.get(urlApi+'/user/getuserdetail?username='+username)
        .then((res)=>{
            console.log(res.data)
            //alert(res.data[0].nama)
            this.setState({users:res.data,username:username,nama:res.data[0].nama,alamat:res.data[0].alamat,
            kota:res.data[0].kota,provinsi:res.data[0].provinsi})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    editProfile=()=>{
        var nama=this.refs.inputNama.value
        var alamat=this.refs.inputAlamat.value
        var kota=this.refs.inputKota.value
        var provinsi=this.refs.inputProvinsi.value
        if(nama==''||alamat==''||kota==''||provinsi==''){
            alert('Semua field harus diisi')
        } else {
            var newData={
                nama:nama,
                alamat:alamat,
                kota:kota,
                provinsi:provinsi
            }
            console.log(newData)
            var username=this.props.nama
            Axios.post(urlApi+'/user/edituserdetail?username='+username,newData)
            .then((res)=>{
                console.log(res.data)
                alert('Profile berhasil diupdate')
                this.setState({users:res.data,username:username,nama:res.data[0].nama,alamat:res.data[0].alamat,
                kota:res.data[0].kota,provinsi:res.data[0].provinsi})
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }
    render(){
        if(this.props.nama!==""){
            return(
                <div className="container">
                    <h1>Welcome, {this.props.nama}</h1>
                    <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Nama</label>
                        <input type="email" className="form-control" ref="inputNama" defaultValue={this.state.nama}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Alamat</label>
                        <textarea className="form-control" ref="inputAlamat" rows="3" name="teksAlamat" value={this.state.alamat} onChange={()=>this.setState({alamat:this.refs.inputAlamat.value})}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Kota</label>
                        <input type="email" className="form-control" ref="inputKota" defaultValue={this.state.kota} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Provinsi</label>
                        <input type="email" className="form-control" ref="inputProvinsi" defaultValue={this.state.provinsi}/>
                    </div>
                    <div>
                        <input type="button" className="btn btn-primary" value="Edit Profile" onClick={this.editProfile}/>
                    </div>
                    </form>
                </div>
            ) 
        } else{
            return(<Redirect to="/login"/>)
        }
        
    }
}
const mapStateToProps =(state)=>{ 
    return {
        nama: state.user.username
    }
}
export default connect(mapStateToProps)(History)