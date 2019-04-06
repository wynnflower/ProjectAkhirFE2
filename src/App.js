import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Product from './components/Product'
import ManageProduct from './components/admin/manageProduct'
import PageNotFound from './components/pageNotFound'
import ProductDetail from './components/productDetail'
import ScrollToTop from './components/scrollToTop'
import ProductFlash from './components/productFlash'
import Cart from './components/Cart'
import Kategori from './components/kategori'
import Footer from './components/footer'
import History from './components/history'
import ProductByKat from './components/productByKategori'

import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'universal-cookie'
import { keepLogin } from './1.actions'
import './App.css';

//WithRouter untuk tersambung ke Reducer dengan connect,
//tapi di dalam komponen ada routing <-- kepake kalau kita import Route

const objCookie=new cookie()
class App extends Component {
  componentDidMount(){
    var getCookie=objCookie.get('userData')
    if (getCookie !== undefined){
      this.props.keepLogin(getCookie)
    }
    
  }
  render() {
    return (
      <div>
          <Navbar/>
          
          <ScrollToTop>
            <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/login' component={Login} exact/>
            <Route path='/register' component={Register} exact/>
            <Route path='/products' component={Product} exact/>
            <Route path='/flashproducts' component={ProductFlash} exact/>
            <Route path='/manage' component={ManageProduct} exact/>
            <Route path='/cart' component={Cart} exact/>
            <Route path='/kategori' component={Kategori} exact/>
            <Route path='/productbykat/:tipekat' component={ProductByKat} exact/>
            <Route path='/history' component={History} exact/>
            <Route path='/productdetail/:id' component={ProductDetail} exact/>
            <Route path='*' component={PageNotFound} exact/>
          </Switch>
          
          </ScrollToTop>
          <Footer/>
          
          
      </div>
    );
  }
}

export default withRouter(connect(null,{keepLogin})(App));
