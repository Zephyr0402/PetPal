import React from 'react';
import {Form, Input, Button} from 'antd';
import { resetPassword } from '../Services/userService';

const ResetPwdForm = (props) => {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const onResetPassword = async (values) => {
        await resetPassword(props.match.params.token, values.password).then(
            res => alert(res.message)
        )
        window.location.href = "/login"
    }
    return (
        <div className = "form_container">
            <div id="register_form_wrapper">
                <h1 className="form_title">Reset Password</h1>
                <Form
                    {...layout}
                    onFinish = {onResetPassword}
                >
                    <Form.Item
                        label = "New password:"
                        name = "password"
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item wrapperCol = {{ offset: 10, span: 18 }}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ResetPwdForm;