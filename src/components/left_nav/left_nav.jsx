import React, { Component } from 'react';
import './left_nav.less'
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom'

import menuConfig from '../../config/menuConfig'

import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

export default class Left extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // map()+递归调用
    getMenuNudes_map = (menuConfig) => {
        return menuConfig.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNudes(item.children)}
                    </SubMenu>
                )
            }

        })
    }
    // reduce()+递归调用
    getMenuNudes_reduce = (menuConfig) => {
        return menuConfig.reduce((pre, item) => {
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNudes_reduce(item.children)}
                    </SubMenu>
                )
            }
            return pre
        }, [])
    }

    render() {
        console.log(menuConfig)


        return <div className="left_nav">
            <Link to='/' className="left_nav_header">
                <img src={logo} alt="logo" />
                <h1>硅谷后台</h1>
            </Link>
            <Menu
                defaultSelectedKeys={['/home']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
            >
                {
                    this.getMenuNudes_reduce(menuConfig)
                }

            </Menu>

        </div>

    }
}