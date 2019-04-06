import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import { urlApi } from '../support/urlAPI';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class ProductDetail extends React.Component{
    state={product:{},proteksiJml:""}
    componentDidMount(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var idUrl=this.props.match.params.id
        Axios.get(urlApi+'/product/'+idUrl)
        .then((res)=>{
            console.log(res)
            this.setState({product:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    proteksiJumlah=()=>{
        var jml=this.refs.jumlah.value
        if(jml<=0){
            this.setState({proteksiJml:"Jumlah harus lebih dari 0"})
        } else{
            this.setState({proteksiJml:""})
        }
    }
    addToCart=()=>{
        var username=this.props.nama
        var nama = this.state.product.nama
        //alert(this.state.product.diskon>0)
        var harga=parseInt(this.state.product.harga)  
        if(this.state.product.diskon > 0){
           var harga=parseInt(this.state.product.harga -(this.state.product.harga*this.state.product.diskon/100)) 
        }
        
        //alert(harga)
        var link=this.state.product.link
        var qty=parseInt(this.refs.jumlah.value)
        var newData={username:username,nama:nama,harga:harga,link:link,qty:qty}
        // alert(newData.username)
        // alert(newData.nama)
        // alert(newData.harga)
        // alert(newData.link)
        // alert(newData.qty)
        Axios.get(urlApi+'/cart?username='+username+'&nama='+nama)
        .then((res)=>{
            console.log(res)
            
            if(res.data.length>0){
                //alert(res.data.length)
                newData.qty=res.data[0].qty + newData.qty
                //Axios.put('&nama='+this.state.product.nama,newData)
                Axios.put(urlApi+'/cart/'+res.data[0].id,newData)
                .then((res)=>{
                    console.log(res)
                    swal({title: "Add to Cart!",
                    text: "Add to Cart Success",
                    icon: "success",
                    button: "OK"})
                    //alert("Add to Cart Sukses (Update Lama)")
                })
                .catch((err)=>{
                    console.log(err)
                })
            }else{
                //alert(res.data.length)
                Axios.post('http://localhost:2000/cart',newData)
                .then((res)=>{
                    console.log(res)
                    //alert("Add to Cart Sukses (Data Baru)")
                    swal({title: "Add to Cart!",
                    text: "Add to Cart Success",
                    icon: "success",
                    button: "OK"})
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        var {nama,link,diskon,harga,deskripsi}=this.state.product
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card" style={{width: '100%'}}>
                        <img className="card-img-top" src={link} alt={deskripsi} />
                        </div>

                    </div>
                    <div className="col-md-8">
                        <h1 style={{color:'#4C4C4C'}}>{nama}</h1>
                        <div style={{backgroundColor:'#D50000',color:'white',width:'80px',height:'22px',textAlign:'center',display:'inline-block',marginRight:'5px'}}>
                            {diskon}% OFF
                        </div>
                        <span style={{fontSize:'12px',color:'#606060',fontWeight:'600',textDecoration:'line-through'}}>
                            Rp. {harga}
                        </span>
                        <div style={{marginTop:'20px',fontSize:'24px',fontWeight:'700',color:'#FF5722'}}>Rp. {harga -(harga * diskon /100)}</div>

                        <div className="row">
                            <div className="col-md-2">
                                <div style={{marginTop:'15px',color:'#606060',fontWeight:'700',fontSize:'14px'}}>Jumlah</div>
                                <input type="number" className="form-control" style={{width:'60px',marginTop:'10px'}} min={1} onChange={this.proteksiJumlah} ref="jumlah" defaultValue={1}/>
                                <div style={{color:'red'}}>{this.state.proteksiJml}</div>
                            </div>
                            <div className="col-md-6">
                                <div style={{marginTop:'15px',color:'#606060',fontWeight:'700',fontSize:'14px'}}>Catatan untuk penjual (opsional)</div>
                                <input type="text" className="form-control" style={{marginTop:'10px'}}
                                placeholder="Packing Kayu, Ekstra Bubble Wrap"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 mt-3">
                                <p style={{color:'#606060',fontStyle:'italic'}}>
                                {deskripsi}
                                </p>
                            </div>
                        </div>
                        {
                            this.props.nama===""?
                            <div className="row mt-3">
                            <Link to="/login" style={{width:'100%'}}>
                            <input type="button" className ="btn btn-outline-secondary col-md-2" value="Add to Wishlist"/>
                            <input type="button" className ="btn btn-outline-danger col-md-3" value="Beli Sekarang"/>
                            
                            <input type="button" className ="btn btn-outline-primary col-md-3" value="Add to Cart"/>
                            </Link>
                        </div>
                            : this.state.proteksiJml !==""?
                            <div className="row mt-3">
                            <input type="button" disabled className ="btn border-secondary col-md-2 disabled" value="Add to Wishlist"/>
                            <input type="button" disabled className ="btn border-secondary col-md-3 disabled" value="Beli Sekarang"/>
                            <input type="button" disabled className ="btn border-secondary col-md-3 disabled" value="Add to Cart"/>
                        </div>
                            :
                            <div className="row mt-3">
                            <input type="button" className ="btn btn-outline-secondary col-md-2" value="Add to Wishlist"/>
                            <input type="button" className ="btn btn-outline-danger col-md-3" value="Beli Sekarang"/>
                            <input type="button" className ="btn btn-outline-primary col-md-3" value="Add to Cart" onClick={this.addToCart}/>
                        </div>
                        }
                        {/* <div className="row mt-3">
                            <input type="button" className ="btn border-secondary col-md-2" value="Add to Wishlist"/>
                            <input type="button" className ="btn btn-danger col-md-3" value="Beli Sekarang"/>
                            <input type="button" className ="btn btn-primary col-md-3" value="Add to Cart"/>
                        </div> */}
                    </div>
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps =(state)=>{ 
    return {
        id:state.user.id,
        nama: state.user.username,
        role:state.user.role
    }
}
export default connect(mapStateToProps) (ProductDetail)