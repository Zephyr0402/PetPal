import React, { useState } from 'react';
import './forms.css';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Button, Form, Input, InputNumber, DatePicker, Select, message} from 'antd';
import axios from 'axios';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Header from "../Layout/Header";
import { getUserInfo } from '../Services/userService';
import { postAnimalInfo } from '../Services/postAnimalInfo';
import { getBase64 } from '../Services/utils';

axios.defaults.withCredentials = true;

function PostAnimalForm() {

    const { Option } = Select;
    const { TextArea } = Input;
    const [location, setLocation] = useState(null);
    const [animalName, setAnimalName] = useState(null);
    const [animalAgeMonth, setAnimalAgeMonth] = useState(null);
    const [animalAgeYear, setAnimalAgeYear] = useState(null);
    const [dateFound, setDateFound] = useState(null);
    const [category, setCategory] = useState(null);
    const [price, setPrice] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [description, setDescription] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const handlePostAnimal = async (e) => {
        e.preventDefault();
        //TODO: replace with actual handlePostAnimal functionality
        console.log("handlePostAnimal");
        let canPost = true;
        if (category === null) {
            canPost = false;
        }
        console.log(location);

        const userInfo = await getUserInfo().
            then(
                res => {
                    return res;
                }
            );

        console.log("Get current user")

        console.log(userInfo);

        console.log(fileList.fileList[0]);
        console.log(userInfo);
        
        const animalInfo = {
            "id": "",
            "name": animalName,
            "address": location.value.description,
            "animalAgeYear": animalAgeYear,
            "animalAgeMonth": animalAgeMonth,
            "dateFound": dateFound,
            "kind": category,
            "price": price,
            "description": description,
            "image": fileList.fileList[0].thumbUrl,
            "userinfo": userInfo._id,
            "position": {
                lat: "49.26127572955761",
                lng: "-123.23869115661624",
            }
        };

        console.log(animalInfo);


        const req = {
            "animalinfo": animalInfo,
            "userUUID": userInfo.uuid
        }
        
        await postAnimalInfo(req);

        if (canPost) {
            window.alert('Posted!');
            resetInput();
            window.location.href = '/'
        }
    };

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        setPreviewImage(file.url || file.preview);
    };

    const handleResetForm = (e) => {
        e.preventDefault();
        resetInput();
    };

    const handleSelectBoxChange = (data) => {
        setCategory(data);
    }

    const resetInput = () => {
        //TODO: replace with actual resetInput functionality
        console.log("resetInput");
    };

    const onDateChange = (date, dateString) => {
        //TODO: replace with actual onDateChange functionality
        console.log('onDateChange', dateString);
        setDateFound(dateString);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        return false;
    };

    const handleChange = ({ fileList }) => { setFileList({ fileList }) };

    const handleCancel = () => { setPreviewVisible(false) };

    const handleUpload = (info) => {
        //TODO: replace with actual handleUpload functionality
        console.log("handleUpload");
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <div>
            <Header/>
            <div className="form_container">
            <div id="post_animal_form_wrapper">
                <h1 className="form_title">Post New Animal</h1>
                <Form {...layout}>
                    <Form.Item
                        label="Animal Name"
                        name="animal_name_input"
                    >
                        <Input placeholder="Please enter animal name" onChange={event => setAnimalName(event.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="Age"
                    >
                        <Input.Group compact>
                            <Form.Item
                                name={['age', 'years']}
                                noStyle
                            >
                                <InputNumber
                                    placeholder="years"
                                    min={0}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    onChange={event => setAnimalAgeYear(event)}
                                />
                            </Form.Item>
                            <Form.Item
                                name={['age', 'months']}
                                noStyle
                            >
                                <InputNumber
                                    placeholder="months"
                                    min={0}
                                    formatter={value => `${value}`}
                                    onChange={event => setAnimalAgeMonth(event)}
                                />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item label="Location">
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyC8w_bEe3IlzsbyjWJ96uOhlSADfrhh7gQ"
                            selectProps={{
                                location,
                                onChange: setLocation,
                            }}
                        />

                    </Form.Item>


                    <Form.Item
                        label="Date Found"
                        name="date_found_input"
                    >
                        <DatePicker onChange={onDateChange} />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="animal_category_input"
                    >
                        <Select defaultValue="Select" onChange={handleSelectBoxChange}>
                            <Option value="Squirrel">Squirrel</Option>
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
                    >
                        <Input prefix="$" suffix="CAD" placeholder="Please enter animal price" onChange={event => setPrice(event.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="animal_image"
                    >
                            <Upload
                                beforeUpload
                                listType="picture-card"
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                            >
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="animal_description_input"
                    >
                        <TextArea rows={4} onChange={event => setDescription(event.target.value)}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={async (e) => handlePostAnimal(e)}>Post</Button>
                        <Button htmlType="reset" onClick={(e) => handleResetForm(e)}>Reset</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        </div>
    );
}

export default PostAnimalForm;
