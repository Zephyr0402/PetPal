import React from 'react';
import './forms.css';
import { Form, Input, Button } from 'antd';
import { getCookie, getHeader, login , getView, testPost} from '../Services/userService';
import { LogContext } from '../Layout/HeaderContext';
import { stringify } from 'css';
import {cookies} from 'react-cookie'

const LoginForm = (props) => {

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const onFinish = async (values) => {
        //getView().then(res => console.log(res));
        // await getCookie()
        // .then(res => console.log(res));
        await login(values.username, values.password)
        .then(
            // if(typeof user.message === "string")
            //     return alert(user.message);
            
            
        );
        getHeader("runzw")
            .then(res => {
                console.log(res);
        })
        // getHeader("_none_")
        //     .then(res => {
        //         console.log(res);
        // })
        // getView().then(res=>console.log(res));
        // getView().then(res=>console.log(res));
        // getView().then(res=>console.log(res));
        // getView().then(res=>console.log(res));
        
        //window.location.href = '/';
    };

    const onClick1 = () => {
        getHeader("_none_")
            .then(res => {
                console.log(res);
        })
    }

    const onClick2 = () => {
        testPost().then(res => console.log(res));
    }

    const onFinishFailed = (errorInfo) => {
        //TODO: replace with actual onFinishFailed functionality
        console.log('Failed:', errorInfo);
    };
    console.log(props);
    return (
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
                        label="Username"
                        name="username"
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
                    <Button onClick = {onClick1}>check status</Button>
                    <Button onClick = {onClick2}>post</Button>
                </Form>
            </div>
        </div>
    );

}

export default LoginForm;
