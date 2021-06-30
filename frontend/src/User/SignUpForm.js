import React from 'react';
import './forms.css';
import { Button, Form, Input, Select} from 'antd';
import { register} from '../Services/userService';


function SignUpForm() {

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const onFinish = (values) => {
        register(values.name_input, values.email_input, values.password_input)
        .then(res => {
            alert(res.message);
        });
        window.location.href = "/login";
    };

    return (
        <div className="form_container">
            <div id="register_form_wrapper">
                <h1 className="form_title">Sign Up</h1>
                <Form id="register_form" {...layout}
                    onFinish = {onFinish}
                >
                    <Form.Item
                        label="Preferred Name"
                        name="name_input"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email_input"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password_input"
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button htmlType="reset">Reset</Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );

}

export default SignUpForm;
