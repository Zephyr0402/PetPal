import React, { useState, useRef } from 'react';
import './forms.css';
import {Button, Form, Input,  Modal, message} from 'antd';
import { InfoCircleTwoTone} from '@ant-design/icons';
import { register, verify} from '../Services/userService';
import Header from "../Layout/Header";


const SignUpForm = () => {
    const [verModal, setVerModal] = useState(false);
    const emailInput = useRef("");
    const nameInput = useRef("");
    const passwordInput = useRef("");
    const codeInput = useRef("");

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const onFinish = async (values) => {
        register(nameInput.current.props.value, emailInput.current.props.value, passwordInput.current.props.value, codeInput.current.state.value)
        .then(res => {
            message.error({
                content: res.message,
                duration: 1,
                icon: <InfoCircleTwoTone twoToneColor = "#52c41a"/>,
                onClose: () => {
                    window.location.href = "/login";
                 }
            })
        });
    };

    const showVerModal = () => {
        if(!verModal) verify(emailInput.current.props.value);
        setVerModal(!verModal);
    };

    const isInputBlank = () => {
        const isNameBlank = nameInput.current.props.value === undefined || nameInput.current.props.value.trim() === "";
        const isEmailBlank = emailInput.current.props.value === undefined || emailInput.current.props.value.trim() === "";
        const isPasswordBlank = passwordInput.current.props.value === undefined || passwordInput.current.props.value.trim() === "";
        return isNameBlank || isEmailBlank || isPasswordBlank;
    };

    return (
        <div>
            <Header/>
            <div className="form_container">
                <div id="register_form_wrapper">
                    <h1 className="form_title">Sign Up</h1>
                    <Form id="register_form" {...layout}
                          /*onFinish = {onFinish}*/
                    >
                        <Form.Item
                            label="Preferred Name"
                            name="name_input"
                            rules={[{ required: true, message: 'Please input your preferred name.' }]}
                        >
                            <Input ref = {nameInput}/>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email_input"
                            rules={[{ required: true, message: 'Please input your email.' }]}
                        >
                            <Input ref = {emailInput} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password_input"
                            rules={[{ required: true, message: 'Please input your password.' }]}
                        >
                            <Input.Password ref = {passwordInput}/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType = "submit"
                                    onClick = {() => isInputBlank() ? console.log('some blank input fields') : showVerModal()}>
                                Submit
                            </Button>
                            <Button htmlType="reset">Reset</Button>
                        </Form.Item>

                        <Modal title="Email Address Verification" visible={verModal}
                               onCancel = {showVerModal}
                               onOk = {onFinish}
                        >
                            {verModal ? <p>Verification code has been sent to <b>{emailInput.current.props.value}</b></p> : ""}
                            <p>Please input your code here:</p>
                            <Input id = "333" ref = {codeInput}/>
                        </Modal>

                    </Form>
                </div>
            </div>
        </div>
    );

}

export default SignUpForm;
