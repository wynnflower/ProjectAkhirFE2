import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { urlApi } from '../support/urlAPI';
import swal from 'sweetalert'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class History extends React.Component{
    state={transaction:[],username:"",isViewDetail:false,ordernumber:'',viewDetail:[],selectedFileTrans:null,isUpload:false,isViewReceipt:false,buktiTrans:""}
    componentDidMount(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var nama=this.props.nama
        Axios.get(urlApi+'/transaction/gettransactionbyuser?username='+nama)
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
        this.setState({isViewResi:!this.state.isViewResi,ordernumber:val.ordernumber}) 
    }
    toggleUpload=(val)=>{
        this.setState({isUpload:!this.state.isUpload,ordernumber:val.ordernumber}) 
    }
    toggleReceipt=(val)=>{
        this.setState({isViewReceipt:!this.state.isViewReceipt,buktiTrans:val.image}) 
    }
    getDataDetail=(ordernumber)=>{
        var nama=this.props.nama
        //alert(urlApi+'/transaction/getdetailtrans?ordernumber='+ordernumber)
        Axios.get(urlApi+'/transaction/getdetailtrans?ordernumber='+ordernumber)
        .then((res)=>{
            console.log(res)
            console.log(res.data)
            console.log(res.data[0].harga)
            alert(res.data[0])
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
    valueHandlerTrans=()=>{
        var value= this.state.selectedFileTrans ? this.state.selectedFileTrans.name : "Pick a Picture"
        return value
    }
    onChangeHandlerTrans=(event)=>{

        console.log(event.target.files[0])
        this.setState({selectedFileTrans:event.target.files[0]})
    }
    uploadTrans=(ordernumber)=>{
        //alert('http://localhost:4000/transaction/uploadtrans?ordernumber='+ordernumber)
        var fd=new FormData()
        if (this.state.selectedFileTrans !==null){
            fd.append('imagetrs',this.state.selectedFileTrans,this.state.selectedFileTrans.name)
        } else {
            alert('Silahkan Upload Bukti Transfer')
        }
        console.log(fd)
        Axios.put('http://localhost:4000/transaction/uploadtrans?ordernumber='+ordernumber,fd)
        .then((res)=>{
            console.log(res)
            swal({title: "Transaksi Sukses!",
            text: "Bukti Pembayaran berhasil diupload!",
            icon: "success",
            button: "OK"})
            this.setState({isUpload:false,ordernumber:''})
            this.getDataApi()
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
                        <td>{val.ordernumber}</td>
                        <td>{val.tglcheckout}</td>
                        <td>{val.note}</td>
                        <td><input type="button" value="Lihat Bukti Transaksi" onClick={()=>this.toggleReceipt(val)}/></td>
                        <td>{val.resi}</td>
                        <td><input type="button" className="btn btn-primary" value="Detail" onClick={()=>this.toggle(val)}/></td>
                        {val.status==0?
                        <td>
                            <input type="button" className="btn btn-primary" value="Upload Bukti Trans" onClick={()=>this.toggleUpload(val)}/>
                        </td>:
                        val.status==3 && val.note=="Rejected: Bukti Pembayaran tidak jelas"?
                            <td>
                                <input type="button" className="btn btn-primary" value="Reupload Bukti Trf" onClick={()=>this.toggleUpload(val)}/>
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
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Order Number</th>
                                    <th scope="col">Tgl Checkout</th>
                                    <th scope="col">Keterangan</th>
                                    <th scope="col">Bukti Transaksi</th>
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
                            this.state.isUpload?
                            <Modal isOpen={this.state.isUpload} toggle={()=>this.toggleUpload('')} className={this.props.className}>
                            <ModalHeader toggle={()=>this.toggleUpload('')}>Modal title</ModalHeader>
                            <ModalBody>
                                <h1>Order Number: {this.state.ordernumber}</h1>
                                <h2>Upload Bukti Transfer</h2>
                                <input style={{display:'none'}} type="file" ref="imgEditTrans" onChange={this.onChangeHandlerTrans}/>
                                <input type="button" className="form-control btn btn-success" onClick={()=>this.refs.imgEditTrans.click()} value={this.valueHandlerTrans()}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={()=>this.uploadTrans(this.state.ordernumber)}>Upload</Button>{' '}
                                <Button color="primary" onClick={()=>this.toggleUpload('')}>Close</Button>{' '}
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
export default connect(mapStateToProps)(History)