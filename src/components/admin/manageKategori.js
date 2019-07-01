import React from 'react'
import Axios from 'axios'
import { throws } from 'assert';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';

class ManageKategori extends React.Component{
    state={listKat:[],listSubkat:[],selectedFileKat:null,
    isEdit:false,editItemKat:{},editFileKat:null,editIdKat:-1,
    selectedFileSkat:null,isEditSub:false,editItemSkat:{},editFileSkat:null,editIdSkat:-1}
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
    //-------------------- MANAGE KATEGORI-----------------------//
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
    onChangeHandlerSkat=(event)=>{
        //alert('masuk')
        //untuk mendapatkan file image
        console.log(event.target.files[0])
        this.setState({selectedFileSkat:event.target.files[0]})
    }
    onChangeHandlerEditSkat=(event)=>{
        //alert('masuk')
        //untuk mendapatkan file image
        console.log(event.target.files[0])
        this.setState({editFileSkat:event.target.files[0]})
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
    
    valueHandler=()=>{
        var value= this.state.selectedFileKat ? this.state.selectedFileKat.name : "Pick a Picture"
        return value
    }
    valueHandlerEdit=()=>{
        var value= this.state.editFileKat ? this.state.editFileKat.name : "Upload"
        return value
    }
    valueHandlerSkat=()=>{
        var value= this.state.selectedFileSkat ? this.state.selectedFileSkat.name : "Pick a Picture"
        return value
    }
    valueHandlerEditSkat=()=>{
        var value= this.state.editFileSkat ? this.state.editFileSkat.name : "Upload"
        return value
    }
    //-------------------------------BUTTON FUNCTION KATEGORI
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
            this.setState({editItemKat:{},isEdit:false,editIdKat:-1,editFileKat:null})
            this.getKategori()
        })
    }
    addKategori=()=>{
        if(this.refs.namaKat.value==''){
            //alert('error')
            swal({title: "Add Kategori!",
            text: "Isi semua Data !",
            icon: "error",
            button: "OK"})
        } else {
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
              this.setState({error:res.data.msg,selectedFileKat:null})
            }
            swal({title: "Add Kategori!",
      text: "Add Kategori Success !",
      icon: "success",
      button: "OK"})
            this.getKategori()
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
                <td><img src={"http://localhost:4000/"+val.image} height="100" width="150" alt={val.image}/></td>
                <td scope="col">
                    <input type="button" value="Edit" className="btn btn-primary mr-2" onClick={()=>this.onEditSkat(val)}/>
                    <input type="button" value="Delete" className="btn btn-primary" onClick={()=>this.onDeleteSkat(val)}/>
                    </td>
            </tr>   
            )
            
        })
        return jsx
    }
    //----------------------------------MANAGE SUBKATEGORI ----------------------------
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
    //-------------------------BUTTON FUNCTION SUBKATEGORI --------------------------
    onDeleteSkat=(val)=>{
        //alert('Delete Kategori '+val.id +' '+val)
        Axios.delete('http://localhost:4000/kategori/delsubkat/'+val.id,{data:val})
        .then((res)=>{
            console.log(res)
            //alert(res.data)
            this.getSubkategori()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onEditSkat=(val)=>{
        this.setState({editItemSkat:val,isEditSub:true,editIdSkat:val.id})
    }
    onCancelSkat=()=>{
        this.setState({editItemSkat:{},isEditSub:false,editIdSkat:-1})
    }
    onSaveSkat=()=>{
        
        var id=this.state.editIdSkat
        var newData={
            idkat:this.refs.ddEditKategori.value,
            namasubkat:this.refs.editSub.value!=''?this.refs.editSub.value:this.refs.editSub.placeholder
        }
        
        alert('id: '+id+', kategori: '+newData.idkat+', subkategori: '+newData.namasubkat)
        var fd=new FormData()
        if (this.state.editFileSkat !==null){
            alert('Ada Image')
            fd.append('imageskat',this.state.editFileSkat,this.state.editFileSkat.name)
        } else{
            alert('Tidak Ada Image')
        }
        fd.append('data',JSON.stringify(newData))
        console.log(fd)
        Axios.put('http://localhost:4000/kategori/editsubkat/'+id,fd)
        .then((res)=>{
            console.log(res)
            alert(res.data)
            this.setState({editItemSkat:{},isEditSub:false,editIdSkat:-1,editFileSkat:null})
            this.getSubkategori()
        })
    }
    addSubkategori=()=>{
        if(this.refs.addSubkategori.value==''){
            //alert('error')
            swal({title: "Add SubKategori!",
            text: "Isi semua Data !",
            icon: "error",
            button: "OK"})
        } else {
        var data={
            idkat:this.refs.ddAddKategori.value,
            namasubkat:this.refs.addSubkategori.value
          }
          var fd=new FormData()
          if (this.state.selectedFileSkat !==null){
          fd.append('imageskat',this.state.selectedFileSkat,this.state.selectedFileSkat.name)
          }
          fd.append('data',JSON.stringify(data))
          console.log(fd)
          Axios.post('http://localhost:4000/kategori/addsubkat',fd)
          .then((res)=>{
            if(res.data.error){
              this.setState({error:res.data.msg,selectedFileSkat:null})
            }
            swal({title: "Add SubKategori!",
            text: "Add Subkategori Sukses",
            icon: "success",
            button: "OK"})
            this.refs.addSubkategori.value=''
            this.getSubkategori()
          })
          .catch((err)=>{
            console.log(err)
          })
        }
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
                    <div className="col-md-3">
                        <input style={{display:'none'}} type="file" ref="imgKat2" onChange={this.onChangeHandlerSkat}/>
                        <input type="button" className="form-control btn btn-success" onClick={()=>this.refs.imgKat2.click()} value={this.valueHandlerSkat()}/>
                    </div>
                    <div className='col-md-3'><input type='button' className='btn btn-primary' value='Add Subkategori' onClick={this.addSubkategori}/></div>
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
                            <input style={{display:'none'}} type="file" ref="imgEditKat" onChange={this.onChangeHandlerEditSkat}/>
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
                {this.state.editItemSkat!=={}?
                <Modal isOpen={this.state.isEditSub} toggle={this.cancel} className={this.props.className}>
                    <ModalHeader toggle={(this.cancelSkat)}>Edit Produk {this.state.editItemSkat.subkategori}</ModalHeader>
                    <ModalBody>
                        <div className="row">
                        <div className="col-md-3">
                        {this.state.editItemSkat.image!==undefined?
                        <img src={'http://localhost:4000/'+this.state.editItemSkat.image} width="100%" alt="broken"/>
                        :null}
                            
                            <div className='mt-2'>
                            <input style={{display:'none'}} type="file" ref="imgEditSkat" onChange={this.onChangeHandlerEditSkat}/>
                            <input type="button" className="form-control btn btn-success" onClick={()=>this.refs.imgEditSkat.click()} value={this.valueHandlerEditSkat()}/>
                            </div>
                            
                        </div>
                        <div className="col-md-9">
                        <div className="mb-1">Masukkan Nama Kategori:</div>
                        <select ref="ddEditKategori" className="form-control">
                        {this.renderDDKategori()}
                        </select>
                            <div className="mb-1">Masukkan Nama SubKategori:</div>
                            <div className="mb-1"><input type="text" className="form-control" ref="editSub" placeholder={this.state.editItemSkat.subkategori}/></div>
                        </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.onSaveSkat}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.onCancelSkat}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                :null
                }
            </div>)
    }
}
export default ManageKategori