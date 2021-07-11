import React from 'react';
import {Form, Input, Button} from 'antd';
import { resetPassword } from '../Services/userService';

const ResetPwdForm = (props) => {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const onResetPassword = async (values) => {
        await resetPassword(props.match.params.token, values.password).then(
            res => alert(res.message)
        )
    }
    console.log(props.match.params.token)
    return (
        <div className = "form_container">
            <div id="register_form_wrapper">
                <h1 className="form_title">Sign Up</h1>
                <Form
                    {...layout}
                    onFinish = {onResetPassword}
                >
                    <Form.Item
                        lable = "new password"
                        name = "password"
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ResetPwdForm;