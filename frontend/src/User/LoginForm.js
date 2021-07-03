import React from 'react';
import './forms.css';
import { Form, Input, Button } from 'antd';
import { getHeader, login } from '../Services/userService';
import { LogContext } from '../Layout/HeaderContext';
import { stringify } from 'css';
import {cookies} from 'react-cookie'
import Header from "../Layout/Header";

const LoginForm = (props) => {

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const onFinish = async (values) => {
        await login(values.email, values.password)
        .then(
            async res => {
                await getHeader(res.uuid)
                .then(res => {
                    alert(res.message);
                })
            }
        );

        window.location.href = '/';
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    console.log(props);
    return (
        <div>
            <Header/>
            <div className="form_container">
                <div id="login_form_wrapper">
                    <h1 className="form_title">Log in</h1>
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            place
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            New user? <a href="/register"> Sign up here! </a>
                        </Form.Item>
                        {/*<Button onClick = {onClick1}>check status</Button>
                        <Button onClick = {onClick2}>post</Button>*/}
                    </Form>
                </div>
            </div>
        </div>
    );

}

export default LoginForm;
