import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import './../support/css/product.css'

class Product extends React.Component{
    state={listProduct:[],countdown:"tes"}
    componentDidMount(){
        this.getProduct()
    }

    getProduct=()=>{
        Axios.get('http://localhost:2000/product?diskon=10&diskon=5&_page=1&_limit=8')
        .then((res)=>{
            this.setState({listProduct:res.data})
            //alert(res.data[0].nama)
            //this.props.inputProduk(res.data)
            //this.props.inputProduk([this.state.listProduct.nama,this.state.listProduct.harga,this.state.listProduct.kategori,this.state.listProduct.link])
            }
        )
        .catch((err)=>console.log(err))
        
    }
    renderProduct=()=>{
        var jsx=this.state.listProduct.map((val)=>{
            if(val.diskon>0){
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
            }
            
        })
        return jsx
    }
    
    render(){
        
        return(
            
                <div>
                    {this.state.countdown!==""?
                    <div>
                        <div className="producthead">Promo Bulan Ini</div>
                        <div className="row">
                            {this.renderProduct()}
                        </div>  
                    </div>
                    :null
                    }
                </div>
            
            )
    
    }
}
export default Product;