import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { urlApi } from '../support/urlAPI';

class ProductDetail extends React.Component{
    state={product:[]}
    componentDidMount(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var kat=this.props.match.params.tipekat
        // alert(kat)
        Axios.get(urlApi+'/product?kategori='+kat)
        .then((res)=>{
            console.log(res)
            this.setState({product:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    renderProduct=()=>{
        var jsx=this.state.product.map((val)=>{
            return(
                <div className="col-lg-3 produk mb-3">
                    <div className="card" style={{height:'350px'}}>
                        <Link to={"/productdetail/"+val.id}>
                        <div class="gradienteff">
                        
                            <img className="card-img-top img img-1" src={val.link} alt={val.nama} style={{height:'150px'}} />
                            {/* <div>{val.id}</div> */}
                        
                            
                        </div>
                        </Link>
                        {
                            val.diskon!==0?
                            <div className="diskon">{val.diskon}%</div>
                            :null
                        }
                        
                        <div className="kategori">{val.kategori}</div>
                        <div className="card-body">
                            <h5 className="card-title" style={{fontSize:'16px'}}>{val.nama}</h5>
                            {
                                val.diskon===0?
                                <p className="card-text mr-3" style={{display:'block',fontSize:'16px',color:'#606060'}}>Rp. {val.harga}</p>
                                :<p className="card-text mr-3" style={{display:'inline',fontSize:'16px',textDecoration:'line-through',color:'red'}}>Rp. {val.harga}</p>
                            }
                            {
                                val.diskon!==0?
                                <p className="card-text" style={{display:'inline',fontSize:'16px'}}>Rp. {val.harga-(val.harga*val.diskon/100)}</p>
                                :null
                            }
                            <Link to={"/productdetail/"+val.id}>
                            <div className="mt-3"><a href="#" className="btn btn-danger">Add to Cart</a></div>
                            </Link>
                            
                        </div>
                    </div>
                </div>    
            )
        })
        return jsx
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    {this.renderProduct()}
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