import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { urlApi } from './../../support/urlAPI';
import swal from 'sweetalert'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ManageHistory extends React.Component{
    state={transaction:[],username:"",isViewDetail:false,viewDetail:[],isViewResi:false,recipient:"",isViewReceipt:false,buktiTrans:""}
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
    getDataWaiting=()=>{
        var nama=this.props.nama
        Axios.get(urlApi+'/transaction/getwaitingpayment')
        .then((res)=>{
            console.log(res.data)
            this.setState({transaction:res.data,username:nama})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    getOnProcess=()=>{
        var nama=this.props.nama
        Axios.get(urlApi+'/transaction/getonprocess')
        .then((res)=>{
            console.log(res.data)
            this.setState({transaction:res.data,username:nama})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    getAccept=()=>{
        var nama=this.props.nama
        Axios.get(urlApi+'/transaction/getpaymentaccept')
        .then((res)=>{
            console.log(res.data)
            this.setState({transaction:res.data,username:nama})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    getReject=()=>{
        var nama=this.props.nama
        Axios.get(urlApi+'/transaction/getpaymentreject')
        .then((res)=>{
            console.log(res.data)
            this.setState({transaction:res.data,username:nama})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    getOnDelivery=()=>{
        var nama=this.props.nama
        Axios.get(urlApi+'/transaction/getondelivery')
        .then((res)=>{
            console.log(res.data)
            this.setState({transaction:res.data,username:nama})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    getDelivered=()=>{
        var nama=this.props.nama
        Axios.get(urlApi+'/transaction/getdelivered')
        .then((res)=>{
            console.log(res.data)
            this.setState({transaction:res.data,username:nama})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    toggle=(val)=>{
        this.setState({isViewDetail:!this.state.isViewDetail,ordernumber:val.ordernumber}) 
        this.getDataDetail(val.ordernumber)   
    }
    toggleResi=(val)=>{
        this.setState({isViewResi:!this.state.isViewResi,ordernumber:val.ordernumber,recipient:val.username}) 
    }
    getDataDetail=(ordernumber)=>{
        var nama=this.props.nama
        //alert(urlApi+'/transaction/getdetailtrans?ordernumber='+ordernumber)
        Axios.get(urlApi+'/transaction/getdetailtrans?ordernumber='+ordernumber)
        .then((res)=>{
            // console.log(res)
            // console.log(res.data)
            // console.log(res.data[0].harga)
            // alert(res.data[0])
            this.setState({viewDetail:res.data,username:nama})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    renderDetail=()=>{
        var jsx=this.state.viewDetail.map((val)=>{
            return(
            <tr>
                <td>{val.nama}</td>
                <td>{val.harga}</td>
                <td>{val.namasubkat}</td>
                <td>{val.qty}</td>
                <td>{val.subtotal}</td>
            </tr>
            )
        })
        return jsx
    }
    // lewatJatuhTempo=(ordernumber)=>{
    //     var nama=this.props.nama
    //     //alert(urlApi+'/transaction/rejecttrans?ordernumber='+ordernumber)
    //     Axios.get(urlApi+'/transaction/rejecttrans?ordernumber='+ordernumber)
    //     .then((res)=>{
    //         console.log(res)
    //         this.getDataApi()
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // }
    lewatJatuhTempo=(ordernumber)=>{
        var nama=this.props.nama
        var note={note:'Rejected: Melewati Jatuh Tempo'}
        //alert(note)
        //alert(urlApi+'/transaction/rejecttrans?ordernumber='+ordernumber)
        Axios.put(urlApi+'/transaction/rejecttrans?ordernumber='+ordernumber,note)
        .then((res)=>{
            console.log(res)
            this.getDataApi()
            swal({title: "Transaksi Dibatalkan!",
            text: "Melewati tanggal Jatuh Tempo !",
            icon: "error",
            button: "OK"})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    buktiTidakJelas=(ordernumber)=>{
        //var nama=this.props.nama
        var note={note:'Rejected: Bukti Pembayaran tidak jelas'}
        //alert(urlApi+'/transaction/rejecttrans?ordernumber='+ordernumber)
        Axios.put(urlApi+'/transaction/rejecttrans?ordernumber='+ordernumber,note)
        .then((res)=>{
            console.log(res)
            swal({title: "Transaksi Dibatalkan!",
            text: "Bukti Pembayaran Tidak Jelas !",
            icon: "error",
            button: "OK"})
            this.getDataApi()
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    acceptTrans=(ordernumber)=>{
        //alert(urlApi+'/transaction/rejecttrans?ordernumber='+ordernumber)
        Axios.put(urlApi+'/transaction/accepttrans?ordernumber='+ordernumber)
        .then((res)=>{
            console.log(res)
            this.getDataApi()
            swal({title: "Transaksi Sukses!",
            text: "Pembayaran diterima!",
            icon: "success",
            button: "OK"})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onDelivered=(ordernumber)=>{
        Axios.put(urlApi+'/transaction/delivered?ordernumber='+ordernumber)
        .then((res)=>{
            console.log(res)
            this.getDataApi()
            swal({title: "Transaksi Sukses!",
            text: "Barang telah terkirim!",
            icon: "success",
            button: "OK"})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onDelivery=(ordernumber)=>{
        var resi=this.refs.inputResi.value
        var nama=this.state.recipient
        if(resi==''){
            alert('Resi harus diisi')
        } else {
            var dataResi={resi:resi,ordernumber:ordernumber,username:nama}
        Axios.put(urlApi+'/transaction/ondelivery?ordernumber='+ordernumber,dataResi)
        .then((res)=>{
            console.log(res)
                Axios.post(urlApi+'/transaction/sendinvoice',dataResi)
                .then((res)=>{
                    console.log(res)
                    this.getDataApi()
                    swal({title: "Transaksi Sukses!",
            text: "Invoice dikirim",
            icon: "success",
            button: "OK"})
                })
                .catch((err)=>{
                    console.log(err)
                })
            // this.getDataApi()
            // alert('Transaction Accepted')
        })
        .catch((err)=>{
            console.log(err)
        })
        }
        
    }
 
    toggleReceipt=(val)=>{
        this.setState({isViewReceipt:!this.state.isViewReceipt,buktiTrans:val.image}) 
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
                        <td><input type="button" value="Lihat Bukti Transaksi" onClick={()=>this.toggleReceipt(val)}/></td>
                        <td>{val.resi}</td>
                        <td><input type="button" className="btn btn-primary" value="Detail" onClick={()=>this.toggle(val)}/></td>
                        {val.status==0?
                        <td>
                            <input type="button" className="btn btn-primary" value="Cancel Transaction" onClick={()=>this.lewatJatuhTempo(val.ordernumber)}/>
                        </td>:
                        val.status==1?
                        <td>
                            <input type="button" className="btn btn-primary mr-2" value="Accept Transaction" onClick={()=>this.acceptTrans(val.ordernumber)}/>
                            <input type="button" className="btn btn-primary" value="Reject Transaction" onClick={()=>this.buktiTidakJelas(val.ordernumber)}/>
                        </td>   
                        :
                        val.status==2?
                        <td>
                            <input type="button" className="btn btn-primary" value="Masukkan Resi" onClick={()=>this.toggleResi(val)}/>
                        </td>
                        
                        :
                        val.status==3?
                            <td>
                                <input type="button" className="btn btn-primary" value="Lihat Detail" onClick={()=>alert('Detail Transaksi Gagal : '+val.note)}/>
                            </td>  
                        :
                        val.status==4?
                        <td>
                            <input type="button" className="btn btn-primary" value="Ubah Status Pengiriman" onClick={()=>this.onDelivered(val.ordernumber)}/>
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
                    <h1>Manage Transaksi</h1>
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
                                    <th scope="col">Bukti Transfer</th>
                                    <th scope="col">Resi</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransaction()}
                            </tbody>
                        </table>
                        {
                            this.state.isViewDetail?
                            <Modal isOpen={this.state.isViewDetail} toggle={()=>this.toggle('')} className={this.props.className}>
                            <ModalHeader toggle={()=>this.toggle('')}>Modal title</ModalHeader>
                            <ModalBody>
                                <h1>Order Number: {this.state.ordernumber}</h1>
                                <table className="table">
                                    <tr>
                                        <td>Nama Produk</td>
                                        <td>Harga</td>
                                        <td>Subkategori</td>
                                        <td>Qty</td>
                                        <td>Subtotal</td>
                                    </tr>
                                    {this.renderDetail()}
                                </table>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={()=>this.toggle('')}>Close</Button>{' '}
                            </ModalFooter>
                            </Modal>
                            :null
                        }
                        {
                            this.state.isViewResi?
                            <Modal isOpen={this.state.isViewResi} toggle={()=>this.toggleResi('')} className={this.props.className}>
                            <ModalHeader toggle={()=>this.toggleResi('')}>Modal title</ModalHeader>
                            <ModalBody>
                                <h1>Order Number: {this.state.ordernumber}</h1>
                                <input type="text" className="form-control" ref="inputResi"></input>
                                <input type="button" className="btn btn-primary" value="Input Resi" onClick={()=>this.onDelivery(this.state.ordernumber)}></input>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={()=>this.toggleResi('')}>Close</Button>{' '}
                            </ModalFooter>
                            </Modal>
                            :null
                        }
                        {
                            this.state.isViewReceipt?
                            <Modal isOpen={this.state.isViewReceipt} toggle={()=>this.toggleReceipt('')} className={this.props.className}>
                            <ModalHeader toggle={()=>this.toggleReceipt('')}>Modal title</ModalHeader>
                            <ModalBody>
                                <img src={"http://localhost:4000/"+this.state.buktiTrans} height="600" width="450"/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={()=>this.toggleReceipt('')}>Close</Button>{' '}
                            </ModalFooter>
                            </Modal>
                            :null
                        }
                        
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