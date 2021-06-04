import React, { useState } from 'react';
/*import Button from "./Button";*/
import { Button, Form, Input, DatePicker, Select, Upload, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

function PostAnimalForm({newAnimal}) {
    let _animalName, _animalLocation, _dateFound, _animalCategory, _animalPrice, _animalImage, _animalDescription;

    const handlePostAnimal = (e) => {
        e.preventDefault();
        //TODO: replace with post animal functionality
        console.log("handlePostAnimal");

        resetInput();
    };

    const handleClearForm = (e) => {
        e.preventDefault();
        resetInput();
    };

    const resetInput = () => {
        _animalName.value = "";
        _animalLocation.value = "";
        _dateFound.value = "";
        _animalCategory.value = "undefined";
        _animalPrice.value = "";
        _animalImage.value = "";
        _animalDescription.value = "";
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
            <h1>Post New Animal</h1>
            <Form id="post_animal_form">
                <Form.Item
                    label="Animal Name"
                    name="animal_name_input"
                    rules={[{ required: true}]}
                >
                    <Input placeholder="Please input animal name" />
                </Form.Item>

                <Form.Item
                    label="Animal Location"
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
                    label="Animal Category"
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
                    label="Price (CAD)"
                    name="animal_price_input"
                    rules={[{ required: true}]}
                >
                    <Input placeholder="Please input animal price in CAD"/>
                </Form.Item>

                <Form.Item
                    label="Animal Image"
                    name="animal_image"
                >
                    <Upload beforeUpload={beforeUpload} onChange={handleUpload}>
                        <Button  icon={<UploadOutlined />}>Upload Animal Image (png or jpg only)</Button>
                    </Upload>

                </Form.Item>

                <Form.Item
                    label="Description"
                    name="animal_description_input"
                >
                    <TextArea rows={4} />
                </Form.Item>

                <div id="buttons_container">
                    <Button type="primary" htmlType="submit" onClick={(e) => handlePostAnimal(e)}>Post Animal</Button>
                    <Button htmlType="reset" onClick={(e) => handleClearForm(e)}>Clear Form</Button>
                </div>
            </Form>
        </div>

    );
}

export default PostAnimalForm;
