import React from 'react';
import {Redirect} from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import { Button, Icon, Input,Label } from 'semantic-ui-react';
import swal from 'sweetalert';
import {connect} from 'react-redux'

import { urlApi } from '../../support/urlAPI';
import PageNotFound from './../pageNotFound'


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
                <div className={classes.root} >
                    <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                    >
                        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                    </IconButton>
                    <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                    >
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    </IconButton>
                    <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                    >
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </IconButton>
                    <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                    >
                        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                    </IconButton>
            </div>
       );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

// let counter = 0;
// function createData(name, calories, fat) {
//   counter += 1;
//   return { id: counter, name, calories, fat };
// }

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    //   createData('Cupcake', 305, 3.7),
    //   createData('Donut', 452, 25.0),
    //   createData('Eclair', 262, 16.0),
    //   createData('Frozen yoghurt', 159, 6.0),
    //   createData('Gingerbread', 356, 16.0),
    //   createData('Honeycomb', 408, 3.2),
    //   createData('Ice cream sandwich', 237, 9.0),
    //   createData('Jelly Bean', 375, 0.0),
    //   createData('KitKat', 518, 26.0),
    //   createData('Lollipop', 392, 0.2),
    //   createData('Marshmallow', 318, 0),
    //   createData('Nougat', 360, 19.0),
    //   createData('Oreo', 437, 18.0),
    // ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
    page: 0,
    rowsPerPage: 5,
    isEdit:false,
    editItem:{},
    listKat:[]
  };

  componentDidMount(){
    this.getDataApi()
    this.getCategory()
  }

  getDataApi=()=>{
      Axios.get(urlApi+'/product')
      .then((res)=>{
        console.log(res)
        this.setState({rows:res.data})
      })
      .catch((err)=>{
          console.log(err)
      })
  }
  getCategory=()=>{
    Axios.get('http://localhost:2000/tipekategori')
    .then((res)=>{
        console.log(res)
        this.setState({listKat:res.data})
    })
    .catch((err)=>{
        console.log(err)
    })
}
renderDropDown=()=>{
    var jsx=this.state.listKat.map((val)=>{
        return(
            <option ref ="kategori" value={val.tipekat}> 
                {val.tipekat}
            </option>
        )
    })
    return jsx
}

  onBtnAdd=()=>{
      var nama=this.nama.inputRef.value
      var harga=parseInt(this.harga.inputRef.value)
      var diskon=parseInt(this.diskon.inputRef.value)
      // var kategori=this.kategori.inputRef.value
      var kategori=this.refs.kategori.value
      var gambar=this.gambar.inputRef.value
      var deskripsi=this.deskripsi.inputRef.value
      
      //properti harus sesuai dengan db.json

      var newData={nama:nama,harga:harga,kategori:kategori,diskon:diskon,deskripsi:deskripsi,link:gambar}
    //   alert(nama)
    //   alert(harga)
    //   alert(diskon)
    //   alert(kategori)
    //   alert(gambar)
    //   alert(deskripsi)

      Axios.post(urlApi+'/product',newData)
        .then((res)=>{
            // swal("Add Product !","Add Product Success","success","OK")
            swal({title: "Add Product!",
              text: "Add Product Success",
              icon: "success",
              button: "OK"})
            console.log(res)
            this.getDataApi()
            this.nama.inputRef.value=''
            this.harga.inputRef.value=0
            this.diskon.inputRef.value=0
            // this.kategori.inputRef.value=''
            this.refs.kategori.value=''
            this.gambar.inputRef.value=''
            this.deskripsi.inputRef.value=''
        })
        .catch((err)=>console.log(err))

  }
  onBtnEdit=(val)=>{
    this.setState({isEdit:true,editItem:val})
  }

  onBtnDelete=(id)=>{
      Axios.delete(urlApi+'/product/'+id)
      .then((res)=>{
        console.log(res)
        swal({title: "Delete Product!",
              text: "Delete Product Success",
              icon: "success",
              button: "OK"})
        // this.setState({rows:res.data})
        this.getDataApi()
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  onBtnCancel=()=>{
    this.setState({isEdit:false})
  }

  onBtnSave=()=>{
    var nama=this.namaEdit.inputRef.value ==="" ? this.state.editItem.nama : this.namaEdit.inputRef.value
    var harga=this.hargaEdit.inputRef.value ==="" ? this.state.editItem.harga : this.hargaEdit.inputRef.value
    var diskon=this.diskonEdit.inputRef.value ==="" ? this.state.editItem.diskon : this.diskonEdit.inputRef.value
    // var kategori=this.kategoriEdit.inputRef.value ==="" ? this.state.editItem.kategori : this.kategoriEdit.inputRef.value
    var kategori=this.refs.kategori.value ==="" ? this.state.editItem.kategori : this.refs.kategori.value
    var gambar=this.gambarEdit.inputRef.value ==="" ? this.state.editItem.link : this.gambarEdit.inputRef.value
    var deskripsi=this.deskripsiEdit.inputRef.value ==="" ? this.state.editItem.deskripsi : this.deskripsiEdit.inputRef.value
    // alert(nama)
    // alert(harga)
    // alert(diskon)
    // alert(kategori)
    // alert(gambar)
    // alert(deskripsi)
    var newData={nama:nama,harga:harga,kategori:kategori,diskon:diskon,link:gambar,deskripsi}
    Axios.put(urlApi+'/product/'+this.state.editItem.id,newData)
    .then((res)=>{
      console.log(res)
      this.getDataApi()
      swal({title: "Edit Product",
              text: "Edit Product Success",
              icon: "success",
              button: "OK"})
      this.setState({isEdit:false,editItem:{}})
      
    })
    .catch((err)=>{
      console.log(err)
    })

  }

  renderJsx=()=>{
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val)=>{
        return(
            <TableRow key={val.id}>
                <TableCell align="left">{val.id}</TableCell>
                <TableCell component="th" scope="row">
                {val.nama}
                </TableCell>
                <TableCell align="left">Rp. {val.harga}</TableCell>
                <TableCell align="left">{val.diskon}</TableCell>
                <TableCell align="left">{val.kategori}</TableCell>
                
                
                <TableCell align="left"><img src={val.link} width="120" height="80"/></TableCell>
                <TableCell align="left">{val.deskripsi}</TableCell>
                <TableCell>
                    <Button animated color='blue'onClick={()=>{this.onBtnEdit(val)}}>
                    <Button.Content visible >Edit</Button.Content>
                    <Button.Content hidden>
                        <Icon name='edit' />
                        
                    </Button.Content>
                    </Button>
                    {/* </TableCell>
                    
                    <TableCell> */}
                    <Button animated color='blue' onClick={()=>{this.onBtnDelete(val.id)}}>
                    <Button.Content visible >Delete</Button.Content>
                    <Button.Content hidden>
                        <Icon name='delete' />
                    </Button.Content>
                    </Button>
                    <Button animated='fade' color='blue'>
                    <Button.Content visible>Sign-up for a Pro account</Button.Content>
                    <Button.Content hidden>$12.99 a month</Button.Content>
                    </Button>
                </TableCell>
            </TableRow>
        )
    })
    return jsx
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    var{nama,harga,diskon,kategori,link,deskripsi}=this.state.editItem
    if(this.props.role==="admin"){
      return (
          <div className="container">
          {/* ==============================================TABLE PRODUCT======================================== */}
                  <Paper className={classes.root}>
                  <div className={classes.tableWrapper}>
                  <Table className={classes.table}>
                  <TableHead>
                      <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">NAMA</TableCell>
                      <TableCell align="center">HARGA</TableCell>
                      <TableCell align="center">DISC</TableCell>
                      <TableCell align="center">KAT</TableCell>
                      <TableCell align="center">IMG</TableCell>
                      <TableCell align="center">DESC</TableCell>
                      
                      </TableRow>
                  </TableHead>
                      <TableBody>
                      {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                          <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                              {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          </TableRow>
                      ))} */}
                      {this.renderJsx()}
                      {emptyRows > 0 && (
                          <TableRow style={{ height: 48 * emptyRows }}>
                          <TableCell colSpan={6} />
                          </TableRow>
                      )}
                      
                      </TableBody>
                      <TableFooter>
                      <TableRow>
                          <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          colSpan={3}
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                              native: true,
                          }}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActionsWrapped}
                          />
                      </TableRow>
                      </TableFooter>
                  </Table>
                  </div>
              </Paper>
              {/* ==============================================ADD PRODUCT======================================== */}
              <Paper className="mt-3">
                  <Table>
                      <TableHead>
                          <TableRow>
                              <TableCell style={{fontSize:'24px',fontWeight:'600'}}>ADD PRODUCT</TableCell>
                          </TableRow>   
                      </TableHead>
                      <TableBody>
                          <TableRow>
                              <TableCell>
                              <Input className="mr-2 mb-2" placeholder="Nama Produk" ref={input=>this.nama=input}></Input>
                              <Input className="mr-2 mb-2" placeholder="Harga Produk" ref={input=>this.harga=input}>
                                  <Label basic>Rp</Label>
                                  <input type="number" />
                                  <Label>.00</Label>
                              </Input>
                              <Input className="mr-2 mb-2" placeholder="Diskon" ref={input=>this.diskon=input}>
                              <input type="number"/>
                              <Label>%</Label>
                              </Input>
                              {/* <Input className="mr-2 mb-2" placeholder="Kategori" ref={input=>this.kategori=input}></Input> */}
                              <select className="form-control form-control-sm mb-2" style={{width:'150px'}}>
                                <option></option>
                                    {this.renderDropDown()}
                                </select>
                              <Button className="mr-2 mb-2" placeholder="Gambar" ref={input=>this.gambar=input}>Upload Img</Button>
                              <Input className="mr-2 mb-2" placeholder="Upload" ref={input=>this.gambar=input} type="file"></Input>
                              <Input className="mr-2 mb-2" placeholder="Deskripsi" ref={input=>this.deskripsi=input}></Input>
                              <Button color='blue'>
                                  <Button.Content onClick={this.onBtnAdd}>Add Product</Button.Content>
                              </Button>
                              </TableCell>
                          </TableRow>
                      </TableBody>
                      
                  </Table>
              </Paper>

              {/* ==============================================EDIT PRODUCT======================================== */}
              { this.state.isEdit===true?
                <Paper className="mt-3">
                  <Table>
                      <TableHead>
                          <TableRow>
                              <TableCell style={{fontSize:'24px',fontWeight:'600'}}>EDIT PRODUCT: {this.state.editItem.nama}</TableCell>
                          </TableRow>   
                      </TableHead>
                      <TableBody>
                          <TableRow>
                              <TableCell>
                              <Input className="mr-2 mb-2" placeholder={nama} ref={input=>this.namaEdit=input}>
                                <input autoFocus/>
                              </Input>
                              <Input className="mr-2 mb-2" placeholder={harga} ref={input=>this.hargaEdit=input}>
                                  <Label basic>Rp</Label>
                                  <input type="number" />
                                  <Label>.00</Label>
                              </Input>
                              <Input className="mr-2 mb-2" placeholder={diskon} ref={input=>this.diskonEdit=input}>
                              <input type="number"/>
                              <Label>%</Label>
                              </Input>
                              {/* <Input className="mr-2 mb-2" placeholder={kategori} ref={input=>this.kategoriEdit=input}></Input> */}
                              <select className="form-control form-control-sm mb-2" style={{width:'150px'}}>
                                <option selected>{kategori}</option>
                                    {this.renderDropDown()}
                                </select>
                              <Input className="mr-2 mb-2" placeholder={link} ref={input=>this.gambarEdit=input}></Input>
                              <Input className="mr-2 mb-2" placeholder={deskripsi} ref={input=>this.deskripsiEdit=input}></Input>
                              <Button color='blue'>
                                  <Button.Content onClick={this.onBtnSave}>Save</Button.Content>
                              </Button>
                              <Button color='red'>
                                  <Button.Content onClick={this.onBtnCancel}>Cancel</Button.Content>
                              </Button>
                              </TableCell>
                          </TableRow>
                      </TableBody> 
                    </Table>
                </Paper>
                :
                null
              }           
              
          </div>
        
      );
    } 
    // else if(this.props.role==="user"){
    //   return(<Redirect to="/"/>)
    // }
    else{
      return(<PageNotFound/>)
    }
    
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps=(state)=>{
  return{
    role:state.user.role
  }
}

export default connect(mapStateToProps) (withStyles(styles)(CustomPaginationActionsTable));