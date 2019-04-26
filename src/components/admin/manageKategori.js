import React from 'react'
import Axios from 'axios'
import { throws } from 'assert';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ManageKategori extends React.Component{
    state={listKat:[],listSubkat:[],selectedFileKat:null,
    isEdit:false,editItemKat:{},editFileKat:null,editIdKat:-1}
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
    onChangeHandlerKat=(event)=>{
        //alert('masuk')
        //untuk mendapatkan file image
        console.log(event.target.files[0])
        this.setState({selectedFileKat:event.target.files[0]})
    }
    onChangeHandlerEditKat=(event)=>{
        //alert('masuk')
        //untuk mendapatkan file image
        console.log(event.target.files[0])
        this.setState({editFileKat:event.target.files[0]})
    }  
    renderKategori=()=>{
        var jsx = this.state.listKat.map((val)=>{
            return(
             <tr>
                <td>{val.id}</td>
                <td>{val.kategori}</td>
                <td><img src={"http://localhost:4000/"+val.image} height="100" width="150"/></td>
                <td scope="col">
                    <input type="button" value="Edit" className="btn btn-primary mr-2" onClick={()=>this.onEditKat(val)}/>
                    <input type="button" value="Delete" className="btn btn-primary" onClick={()=>this.onDeleteKat(val)}/>
                    </td>
            </tr>   
            )
            
        })
        return jsx
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
    valueHandler=()=>{
        var value= this.state.selectedFileKat ? this.state.selectedFileKat.name : "Pick a Picture"
        return value
    }
    valueHandlerEdit=()=>{
        var value= this.state.editFileKat ? this.state.editFileKat.name : "Upload"
        return value
    }

    onDeleteKat=(val)=>{
        //alert('Delete Kategori '+val.id +' '+val)
        Axios.delete('http://localhost:4000/kategori/delkategori/'+val.id,{data:val})
        .then((res)=>{
            console.log(res)
            //alert(res.data)
            this.getKategori()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onEditKat=(val)=>{
        this.setState({editItemKat:val,isEdit:true,editIdKat:val.id})
    }
    onCancelKat=()=>{
        this.setState({editItemKat:{},isEdit:false,editIdKat:-1})
    }
    onSaveKat=()=>{
        var id=this.state.editIdKat
        var newData={
            kategori:this.refs.editKat.value!=''?this.refs.editKat.value:this.refs.editKat.placeholder
        }
        alert('id: '+id+', kategori: '+newData.kategori)
        var fd=new FormData()
        if (this.state.editFileKat !==null){
            fd.append('imagekat',this.state.editFileKat,this.state.editFileKat.name)
        }
        fd.append('data',JSON.stringify(newData))
        console.log(fd)
        Axios.put('http://localhost:4000/kategori/editkategori/'+id,fd)
        .then((res)=>{
            console.log(res)
            alert(res.data)
            this.setState({editItemKat:{},isEdit:false,selectEdit:-1,editFileKat:null})
            this.getKategori()
        })
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
    addKategori=()=>{
        var data={
            kategori:this.refs.namaKat.value,
          }
          var fd=new FormData()
          if (this.state.selectedFileKat !==null){
          fd.append('imagekat',this.state.selectedFileKat,this.state.selectedFileKat.name)
          }
          fd.append('data',JSON.stringify(data))
          console.log(fd)
          Axios.post('http://localhost:4000/kategori/addkategori',fd)
          .then((res)=>{
            if(res.data.error){
              this.setState({error:res.data.msg})
            }
            alert(res.data)
            this.getProduct()
          })
          .catch((err)=>{
            console.log(err)
          })
    }
    render(){
        return (<div>
            <h2>Manage Kategori</h2>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Kategori</th>
                    <th scope="col">Image</th>
                    {/* <th scope="col">
                    <input type="button" value="Edit" className="btn btn-primary mr-2"/>
                    <input type="button" value="Delete" className="btn btn-primary"/>
                    </th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.renderKategori()}
                </tbody>
            </table>
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
                    {/* <th scope="col">
                    <input type="button" value="Edit" className="btn btn-primary mr-2"/>
                    <input type="button" value="Delete" className="btn btn-primary"/>
                    </th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.renderSubkategori()}
                </tbody>
            </table>
            <h2>Add Kategori</h2>
                <div className='row'>
                    <div className='col-md-3'><input type="text" className="form-control" ref="namaKat" placeholder="Nama Kategori"/></div>
                    <div className="col-md-3">
                        <input style={{display:'none'}} type="file" ref="imgKat" onChange={this.onChangeHandlerKat}/>
                        <input type="button" className="form-control btn btn-success" onClick={()=>this.refs.imgKat.click()} value={this.valueHandler()}/>
                    </div>
                    <div className='col-md-3'><input type='button' className='btn btn-primary' value='Add Kategori' onClick={this.addKategori}/></div>
                </div>
            <h2>Add Subkategori</h2>
                <div className='row'>
                    <div className='col-md-3'><select ref="ddAddKategori" className="form-control">
                        {this.renderDDKategori()}
                        </select></div>
                    <div className='col-md-3'><input type="text" className="form-control" ref="addSubkategori" placeholder="Nama Subkategori"/></div>
                    <div className='col-md-3'><input type='button' className='btn btn-primary' value='Add Subkategori'/></div>
                </div>
                {this.state.editItemKat!=={}?
                <Modal isOpen={this.state.isEdit} toggle={this.cancel} className={this.props.className}>
                    <ModalHeader toggle={(this.cancel)}>Edit Produk {this.state.editItemKat.kategori}</ModalHeader>
                    <ModalBody>
                        <div className="row">
                        <div className="col-md-3">
                        {this.state.editItemKat.image!==undefined?
                        <img src={'http://localhost:4000/'+this.state.editItemKat.image} width="100%" alt="broken"/>
                        :null}
                            
                            <div className='mt-2'>
                            <input style={{display:'none'}} type="file" ref="imgEditKat" onChange={this.onChangeHandlerEditKat}/>
                            <input type="button" className="form-control btn btn-success" onClick={()=>this.refs.imgEditKat.click()} value={this.valueHandlerEdit()}/>
                            </div>
                            
                        </div>
                        <div className="col-md-9">
                            <div className="mb-1">Masukkan Nama Kategori:</div>
                            <div className="mb-1"><input type="text" className="form-control" ref="editKat" placeholder={this.state.editItemKat.kategori}/></div>
                        </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.onSaveKat}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.onCancelKat}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                :null
                }
            </div>)
    }
}
export default ManageKategori