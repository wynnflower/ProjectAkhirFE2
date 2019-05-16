import React from 'react'
import Axios from 'axios'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ManageSubkat extends React.Component{
    state={listSubkat:[]}
    componentDidMount(){
        this.getKategori()
        this.getSubkategori()
    }
    getKategori=()=>{
        Axios.get('http://localhost:4000/kategori/getkategori')
        .then((res)=>{
            this.setState({listKat:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    getSubkategori=()=>{
        Axios.get('http://localhost:4000/kategori/getsubkategori')
        .then((res)=>{
            console.log(res.data)
            this.setState({listSubkat:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    renderDDKategori=()=>{
        var jsx = this.state.listKat.map((val)=>{
            return(
                <option value={val.id}>{val.kategori}</option>
            )
            
        })
        return jsx
    }
    filterSubkat=()=>{
        if(this.refs.ddFilterKategori.value=='*'){
            this.getSubkategori()
        } else{
            Axios.get('http://localhost:4000/kategori/getsubbykat/'+this.refs.ddFilterKategori.value)
            .then((res)=>{
                console.log(res.data)
                this.setState({listSubkat:res.data})
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    renderSubkategori=()=>{
        var jsx = this.state.listSubkat.map((val)=>{
            return(
             <tr>
                <td>{val.id}</td>
                <td>{val.kategori}</td>
                <td>{val.subkategori}</td>
                <td scope="col">
                    <input type="button" value="Edit" className="btn btn-primary mr-2" onClick={()=>this.onEditSubkat(val)}/>
                    <input type="button" value="Delete" className="btn btn-primary" onClick={()=>this.onDeleteSubkat(val)}/>
                    </td>
            </tr>   
            )
            
        })
        return jsx
    }
    render(){
        return(<div>
            <h2>Manage Sub Kategori</h2>
            <div className='row'>
                    <div className="col-md-3 mb-2">
                        <select ref="ddFilterKategori">
                            <option value='*'>All Kategori</option>
                            {this.renderDDKategori()}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input type="button" value="Filter" onClick={this.filterSubkat}/>
                    </div>
            </div>
            
            
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Kategori</th>
                    <th scope="col">Subkategori</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderSubkategori()}
                </tbody>
            </table>
            <h2>Add Subkategori</h2>
                <div className='row'>
                    <div className='col-md-3'><select ref="ddAddKategori" className="form-control">
                        {this.renderDDKategori()}
                        </select></div>
                    <div className='col-md-3'><input type="text" className="form-control" ref="addSubkategori" placeholder="Nama Subkategori"/></div>
                    <div className='col-md-3'><input type='button' className='btn btn-primary' value='Add Subkategori'/></div>
                </div>
        </div>)
    }
}

export default ManageSubkat