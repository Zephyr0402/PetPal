import React from 'react';
import './forms.css';
import { Button, Form, Input, Select, Upload, message} from 'antd';
import {UploadOutlined} from "@ant-design/icons";


function SignUpForm() {
    const { Option } = Select;
    const { TextArea } = Input;

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        //TODO: replace with actual handlePostAnimal functionality
        resetInput();
    };

    const handleResetForm = (e) => {
        e.preventDefault();
        resetInput();
    };

    const resetInput = () => {
        //TODO: replace with actual resetInput functionality
        console.log("resetInput");
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    };

    const handleUpload = (info) => {
        //TODO: replace with actual handleUpload functionality
        console.log("handleUpload");
    };

    return (
        <div className="form_container">
            <div id="register_form_wrapper">
                <h1 className="form_title">Sign Up</h1>
                <Form id="register_form" {...layout}>
                    <Form.Item
                        label="Username"
                        name="username_input"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password_input"
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
                        label="Phone Number"
                        name="phone_number_input"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Street Address"
                        name="street_address_input"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="City"
                    >
                        <Input.Group compact>
                            <Form.Item
                                name={['location', 'city']}
                                noStyle
                            >
                                <Input placeholder="City" style={{ width: '50%' }} />
                            </Form.Item>
                            <Form.Item
                                name={['location', 'province']}
                                noStyle
                            >
                                <Select placeholder="Province">
                                    <Option value="ab">AB</Option>
                                    <Option value="bc">BC</Option>
                                    <Option value="mb">MB</Option>
                                    <Option value="nb">NB</Option>
                                    <Option value="nl">NL</Option>
                                    <Option value="nt">NT</Option>
                                    <Option value="ns">NS</Option>
                                    <Option value="nu">NU</Option>
                                    <Option value="on">ON</Option>
                                    <Option value="pe">PE</Option>
                                    <Option value="qc">QC</Option>
                                    <Option value="sk">SK</Option>
                                    <Option value="yt">YT</Option>
                                </Select>
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item
                        label="Identification"
                        name="identification_document"
                    >
                        <Upload beforeUpload={beforeUpload} onChange={handleUpload}>
                            <Button icon={<UploadOutlined />}>Upload (png or jpg only)</Button>
                        </Upload>

                    </Form.Item>

                    <Form.Item
                        label="About"
                        name="about_input"
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={(e) => handleSignUp(e)}>Submit</Button>
                        <Button htmlType="reset" onClick={(e) => handleResetForm(e)}>Reset</Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );

}

export default SignUpForm;
