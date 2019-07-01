import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { urlApi } from './../../support/urlAPI';
//import swal from 'sweetalert'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ManageHistory extends React.Component{
    state={transaction:[],username:"",isViewDetail:false,transDetail:[]}
    componentDidMount(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var nama=this.props.nama
        Axios.get(urlApi+'/transaction/getalltransaction')
        .then((res)=>{
            console.log(res.data)
            this.setState({transaction:res.data,username:nama})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    
    
    
    
    renderTransaction=()=>{
        var jsx=this.state.transaction.map((val)=>{
            if (this.props.nama!==""){
                return(
                    <tr>
                        <td>{val.username}</td>
                        <td>{val.ordernumber}</td>
                        <td>{val.tglcheckout}</td>
                        <td>{val.note}</td>
                        <td><input type="button" className="btn btn-primary" value="Detail" onClick={this.toggle}/></td>
                        {val.status==0?
                        <td>
                            <input type="button" className="btn btn-primary" value="Cancel Transaction" onClick={()=>alert('Transaction Rejected: Melewati batas pembayaran')}/>
                        </td>:
                        val.status==1?
                        <td>
                            <input type="button" className="btn btn-primary mr-2" value="Accept Transaction" onClick={()=>alert('Transaction Accepted')}/>
                            <input type="button" className="btn btn-primary" value="Reject Transaction" onClick={()=>alert('Transaction Rejected: Bukti pembayaran tidak jelas')}/>
                        </td>   
                        :
                        val.status==2?
                        <td>
                            <input type="button" className="btn btn-primary" value="Masukkan Resi" onClick={()=>alert('Input Resi')}/>
                        </td>
                        
                        :
                        val.status==3?
                            <td>
                                <input type="button" className="btn btn-primary" value="Lihat Detail" onClick={()=>alert('Detail Transaksi Gagal : '+val.note)}/>
                            </td>  
                        :
                        val.status==4?
                        <td>
                            <input type="button" className="btn btn-primary" value="Ubah Status Pengiriman" onClick={()=>alert('Barang Terkirim')}/>
                        </td>
                        :
                        null
                        }
                    </tr>
                ) 
            }
            
        })
        return jsx
    }
    render(){
        if(this.props.nama!==""){
            return(
                <div>
                    <h1>Transaction Detail Transaksi</h1>
                    <h2>Order Number: {this.state.ordernumber}</h2>
                    <div className="mb-3">
                    <input type="button" className="btn btn-success mr-3" value="Semua Transaksi" onClick={this.getDataApi}/>
                    <input type="button" className="btn btn-success mr-3" value="Menunggu Pembayaran" onClick={this.getDataWaiting}/>
                    <input type="button" className="btn btn-success mr-3" value="On Process" onClick={this.getOnProcess}/>
                    <input type="button" className="btn btn-success mr-3" value="Payment Accepted" onClick={this.getAccept}/>
                    <input type="button" className="btn btn-success mr-3" value="Transaction Failed" onClick={this.getReject}/>
                    <input type="button" className="btn btn-success mr-3" value="Dalam Pengiriman" onClick={this.getOnDelivery}/>
                    <input type="button" className="btn btn-success mr-3" value="Terkirim" onClick={this.getDelivered}/>
                    </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">Order Number</th>
                                    <th scope="col">Tgl Checkout</th>
                                    <th scope="col">Keterangan</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransaction()}
                            </tbody>
                        </table>
                        
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
export default connect(mapStateToProps)(ManageHistory)