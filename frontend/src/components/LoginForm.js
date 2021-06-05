import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

function LoginForm() {

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const onFinish = (values) => {
        //TODO: replace with onFinish functionality
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        //TODO: replace with onFinishFailed functionality
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
                    rules={[{required: true}]}
                >
                    <Input placeholder="Please input your username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input.Password placeholder="Please input your password"/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );

}

export default LoginForm;
