//应用根组件
import React, { Component } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom'
//导入路由组件
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login/login';
import Admin from './pages/admin/admin';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/admin' component={Admin}></Route>
            </Switch>
        </BrowserRouter>

    }
}