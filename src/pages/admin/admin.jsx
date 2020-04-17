import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Route, Switch } from 'react-router-dom'

import './admin.less'
import LeftNav from '../../components/left_nav/left_nav'
import HeaderNav from '../../components/header_nav/header_nav'

import Home from '../home/home'
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';


import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;

// 后台管理的路由界面
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        console.log('memoryUtils:' + user);

        if (!user || !user._id) {
            return <Redirect to='/login'></Redirect>
        }

        return <Layout className='adminLayout'>
            <Sider>
                <LeftNav></LeftNav>
            </Sider>
            <Layout>
                <HeaderNav></HeaderNav>
                <Content className="content">
                    <Switch>
                        <Route path='/home' component={Home}></Route>
                        <Route path='/category' component={Category}></Route>
                        <Route path='/product' component={Product}></Route>
                        <Route path='/role' component={Role}></Route>
                        <Route path='/user' component={User}></Route>
                        <Route path='/charts/bar' component={Bar}></Route>
                        <Route path='/charts/line' component={Line}></Route>
                        <Route path='/charts/pie' component={Pie}></Route>
                        <Redirect to='/home'></Redirect>
                    </Switch>
                </Content>
                <Footer className="footer">Footer</Footer>
            </Layout>
        </Layout>
    }
}