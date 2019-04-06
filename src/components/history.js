import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { urlApi } from '../support/urlAPI';
//import swal from 'sweetalert'

class History extends React.Component{
    state={history:[],username:""}
    componentDidMount(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var nama=this.props.nama
        Axios.get(urlApi+'/history?username='+nama)
        .then((res)=>{
            console.log(res.data)
            this.setState({history:res.data,username:nama})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    renderHistory=()=>{
        var jsx=this.state.history.map((val)=>{
            if (this.props.nama!==""){
                return(
                    <tr>
                        <th style={{textAlign:'center'}}><img src={val.link} width="200" height="100"/></th>
                        <td>{val.nama}</td>
                        <td>{val.harga}</td>
                        <td>{val.qty}</td>
                        <td>{val.tglbeli}</td>
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
                                    <th scope="col">Image</th>
                                    <th scope="col">Produk</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Tanggal</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.renderHistory()}
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
export default connect(mapStateToProps)(History)