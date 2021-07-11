import React, {useRef, useState} from 'react';
import './forms.css';
import { Form, Input, Button, Modal } from 'antd';
import { getHeader, login , sendResetLink} from '../Services/userService';
import Header from '../Layout/Header'

const LoginForm = (props) => {

    const emailInput = useRef("");
    const [showResetModal, setShowResetModal] = useState(false);

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const onShowModal = () => {
        setShowResetModal(!showResetModal);
    }

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

    const onResetLinkSent = () => {
        sendResetLink(emailInput.current.state.value);
        onShowModal();
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                            <a className="login-form-forgot" onClick = {onShowModal}>
                                Forgot password
                            </a>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            New user? <a href="/register"> Sign up here! </a>
                        </Form.Item>

                        <Modal title="Reset Password" visible={showResetModal}
                            onCancel = {onShowModal}
                            onOk = {onResetLinkSent}
                        >
                            <p>Please input your email here:</p>
                            <Input ref = {emailInput}/>
                            <p>After you submit, an confirmation email will be sent to your email address. Please follow instructions in it</p> 
                        </Modal>

                    </Form>
                </div>
            </div>
        </div>
    );

}

export default LoginForm;
