import React from 'react';
import '../forms.css';
import { Form, Input, Button } from 'antd';

function LoginForm() {

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const onFinish = (values) => {
        //TODO: replace with actual onFinish functionality
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        //TODO: replace with actual onFinishFailed functionality
        console.log('Failed:', errorInfo);
    };

    return (
        <div id="login_form_wrapper">
            <h1 className="form_title">Log in</h1>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
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
                    New user? <a href="/join"> Sign up here! </a>
                </Form.Item>
            </Form>
        </div>
    );

}

export default LoginForm;
