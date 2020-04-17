import React, { Component } from 'react';
import './login.less'
import logo from '../../assets/images/logo.png';

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';


export default class Login extends Component {

    onFinish = async (values) => {
        console.log('Received values of form: ', values);

        const { username, password } = values
        console.log('username: ', username);
        console.log('password: ', password);

        const result = await reqLogin(username, password)
        console.log('result: ', result);

        const user = result.data;
        memoryUtils.user = user
        storageUtils.saveUser(user)
        console.log(memoryUtils.user);

        if (result.status === 0) {
            console.log('登陆成功');
            message.success('登陆成功')
            //跳转
            this.props.history.push('/')
            console.log('跳转成功');
        } else {
            message.error(result.msg)
        }
    }


    validatePwd = (rule, value) => {
        // console.log(value)
        if (!value) {
            return Promise.reject("密码必须输入！");
        }
        if (/^[a-zA-Z0-9_]+&/.test(value)) {
            return Promise.reject("密码必须是英文字母数字或下划线！");
        }
        if (value.length < 4) {
            return Promise.reject("密码长度不能小于4位！");
        }
        if (value.length > 12) {
            return Promise.reject("密码长度不能大于12位！");
        }

        return Promise.resolve();
    }


    render() {

        const user = memoryUtils.user
        if (user && user._id) {
            return <Redirect to='/'></Redirect>
        }


        return <div className="login">
            <header className="login_header">
                <img src={logo} alt="logo" />
                <h1>React项目：后台管理系统</h1>
            </header>
            <section className="login_content">
                <h2>用户登陆</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true, }}
                    onFinish={this.onFinish}
                >
                    {/* 用户名 自带验证*/}
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！', },
                        { min: 4, message: '用户名最少4位！', },
                        { max: 12, message: '用户名最多12位！', },
                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文字母数字或下划线！', }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    {/* 密码 自定义验证*/}
                    <Form.Item
                        name="password"
                        rules={[
                            // { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
                            // { validator: async (rule, value) => { throw new Error('Something wrong!value'); } },
                            { validator: this.validatePwd },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    {/* 记住我 */}
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="https://www.baidu.com/">Forgot password</a>
                    </Form.Item>
                    {/* 登陆按钮 */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
            Or <a href="https://www.baidu.com/">register now!</a>
                    </Form.Item>
                </Form>
            </section>
        </div>
    }
}
