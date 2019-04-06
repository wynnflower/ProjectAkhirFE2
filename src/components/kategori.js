import React from 'react'
import Axios from 'axios'

import { urlApi } from '../support/urlAPI';
import {Link} from 'react-router-dom'
import './../support/css/product.css'

class Kategori extends React.Component{
    state={kategori:[]}
    componentDidMount(){
        this.getDataApi()
    }
    getDataApi=()=>{
        Axios.get(urlApi+'/tipekategori')
        .then((res)=>{
            console.log(res)
            this.setState({kategori:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    renderCart=()=>{
        var jsx=this.state.kategori.map((val)=>{
                return(
                    <div className="col-lg-3 produk mb-3">
                        <div className="card">
                            <div class="row justify-content-center">
                            <Link to={"/productbykat/"+val.tipekat}>
                                <div className="gradienteff" style={{width:'253px',height:'150px'}}>
                                
                                <img className="card-img-top gradienteff" src={val.link} alt={val.tipekat} style={{height:'150px'}}  />
                                
                                </div>
                                </Link>
                            </div>
                            <div className="card-body">
                            <h5 className="card-title" style={{textAlign:'center',fontSize:'16px'}}>{val.tipekat}</h5>
                            </div>
                        </div>
                    </div>
                ) 
        })
        return jsx
    }
    render(){
            return(
                <div>
                    <div className="producthead">Semua Kategori</div>
                    <div className="row justify-content-center">
                        {this.renderCart()}
                    </div>
            </div>
            ) 
    }
}

export default Kategori