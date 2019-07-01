import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import './../support/css/product.css'
import queryString from 'query-string'

class Search extends React.Component{
    state={listProduct:[],page:1,searchQuery:''}
    // constructor(props) {
    //     super(props);
    //     this.handleScroll = this.handleScroll.bind(this);
    //   }
      
      componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll);
        console.log(this.props.location.search)
        const values = queryString.parse(this.props.location.search)
        var searchQuery=values.search // "piko"
        //this.setState({searchQuery:searchQuery})
        alert(searchQuery)
        this.getProduct(searchQuery)
      };
      
    //   componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll);
    //   };
      
    //   handleScroll(event) {
    //     //console.log('the scroll things', event)
    //     //console.log(window.scrollY)
    //     var hal=Math.floor((window.scrollY/300)-4)
    //     if(hal>1){
    //         hal=hal+1
    //         console.log(hal)
    //         this.setState({page:hal})
    //         //alert(this.state.page)
    //         this.getProduct()
    //     }
    //   };
    
    getProduct=(searchQuery)=>{
        //var items=this.state.page * 8
        //Axios.get('http://localhost:2000/product?_page=1&_limit='+items)
        //var search=''
        alert('Search Query='+searchQuery)
        Axios.get('http://localhost:4000/product/searchproduct?nama='+searchQuery)
        .then((res)=>{
            console.log(res.data)
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
            return(
                <div className="col-lg-3 produk mb-3">
                    <div className="card" style={{height:'350px'}}>
                        <Link to={"/productdetail/"+val.id}>
                        <div class="gradienteff">
                        
                            <img className="card-img-top img img-1" src={'http://localhost:4000/'+val.image} alt={'http://localhost:4000/'+val.image} style={{height:'150px'}} />
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
            <div>
                <div className="producthead">Semua Produk</div>
                <div className="row">
                
                    {this.renderProduct()}
                </div>
            </div>
           
        )
    }
}
export default Search;