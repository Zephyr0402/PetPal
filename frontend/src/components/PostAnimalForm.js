import React from 'react';
import { Button, Form, Input, InputNumber, DatePicker, Select, Upload, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';


function PostAnimalForm() {

    const { Option } = Select;
    const { TextArea } = Input;

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const handlePostAnimal = (e) => {
        e.preventDefault();
        //TODO: replace with post animal functionality
        console.log("handlePostAnimal");

        resetInput();
    };

    const handleResetForm = (e) => {
        e.preventDefault();
        resetInput();
    };

    const resetInput = () => {
        //TODO: replace with clear form functionality
        console.log("resetInput");
    };

    const onDateChange = (date, dateString) => {
        //TODO: replace with onDateChange functionality
        console.log('onDateChange', dateString);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    };

    const handleUpload = (info) => {
        //TODO: replace with handleUpload functionality
        console.log("handleUpload");
    };

    return (
        <div id="post_animal_form_wrapper">
            <h1 className="form_title">Post New Animal</h1>
            <Form id="post_animal_form" {...layout}>
                <Form.Item
                    label="Animal Name"
                    name="animal_name_input"
                    rules={[{ required: true}]}
                >
                    <Input placeholder="Please input animal name" />
                </Form.Item>

                <Form.Item
                    label="Age"
                    name="animal_age_input"
                >
                    <InputNumber
                        placeholder="years"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                    <InputNumber
                        placeholder="months"
                        formatter={value => `${value}`}
                    />
                </Form.Item>

                <Form.Item
                    label="Location"
                    name="animal_location_input"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Where did you find this animal?"/>
                </Form.Item>

                <Form.Item
                    label="Date Found"
                    name="date_found_input"
                    rules={[{ required: true}]}
                >
                    <DatePicker onChange={onDateChange} />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="animal_category_input"
                >
                    <Select defaultValue="dog">
                        <Option value="amphibian">Amphibian</Option>
                        <Option value="bird">Bird</Option>
                        <Option value="cat">Cat</Option>
                        <Option value="chicken">Chicken</Option>
                        <Option value="dog">Dog</Option>
                        <Option value="duck">Duck</Option>
                        <Option value="fish">Fish</Option>
                        <Option value="guinea_pig">Guinea Pig</Option>
                        <Option value="hamster">Hamster</Option>
                        <Option value="horse">Horse</Option>
                        <Option value="mouse_rat">Mouse/Rat</Option>
                        <Option value="rabbit">Rabbit</Option>
                        <Option value="snake">Snake</Option>
                        <Option value="spider">Spider</Option>
                        <Option value="turtle">Turtle</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="animal_price_input"
                    rules={[{ required: true}]}
                >
                    <Input prefix="$" suffix="CAD" placeholder="Please input animal price"/>
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="animal_image"
                >
                    <Upload beforeUpload={beforeUpload} onChange={handleUpload}>
                        <Button icon={<UploadOutlined />}>Upload (png or jpg only)</Button>
                    </Upload>

                </Form.Item>

                <Form.Item
                    label="Description"
                    name="animal_description_input"
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={(e) => handlePostAnimal(e)}>Post</Button>
                    <Button htmlType="reset" onClick={(e) => handleResetForm(e)}>Reset</Button>
                </Form.Item>
            </Form>
        </div>

    );
}

export default PostAnimalForm;
