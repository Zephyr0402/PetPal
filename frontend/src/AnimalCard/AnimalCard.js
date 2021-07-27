import React, { useState,useEffect } from 'react';
import { ExclamationCircleOutlined, HeartOutlined, ShoppingCartOutlined, CommentOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {Modal, Card, Avatar, Descriptions, Button} from 'antd';
import CommentCollection from './Comments';
import './AnimalCard.css';
import {getUserInfo} from "../Services/userService";
const { Meta } = Card;
const { confirm } = Modal;

const AnimalCard = (props) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        getUserInfo()
        .then(async res => {
            setUserId(res._id);
        });
    }, [])

    let thisCard = props.animalCardInfo;
    if (thisCard === undefined) {
        thisCard = {
            name: 'None',
            image: '/image-not-found.png',
            age: 0,
            price: 0,
            user: 'None',
            userAvatar: 'None',
            kind: 'None',
            description: 'None'
        };
    }

    const showModal = () => {
        confirm({
            title: 'Please login to make a purchase',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                window.location.href="/login";
            },
            okText: 'Login',
            cancelText: 'Cancel',
        });
    };

    return(
        <div>
            <div style = {{height:'100%', overflow:'auto', position:'absolute'}}>
                <div className="card-header">
                    <Button type = 'text' onClick = {() => props.setDisplay(-1)}><ArrowLeftOutlined/></Button>
                    <Meta
                        avatar={<Avatar src={thisCard.userAvatar} />}
                        title={thisCard.user}
                    />
                </div>
                <Card
                    style={{ width: '100%', marginBottom:"20px" }}
                    cover={
                        <img
                            alt="example"
                            src={thisCard.image}
                        />
                    }
                    actions={[
                        <CommentOutlined />,
                        <HeartOutlined />,
                    ]}
                >

                    <hr color = "white"/>
                    <hr color = "white"/>
                    <Descriptions bordered>
                        <Descriptions.Item label = "Name" span={3}>{thisCard.name}</Descriptions.Item>
                        <Descriptions.Item label = "Age" span={3}>{thisCard.age}</Descriptions.Item>
                        <Descriptions.Item label = "Kind" span={3}>{thisCard.kind}</Descriptions.Item>
                        <Descriptions.Item label = "Street" span={1.5}>3338 Webber Lane</Descriptions.Item>
                        <Descriptions.Item label = "City" span = {1.5}>Vancouver</Descriptions.Item>
                        <Descriptions.Item label = "Price (CAD)" span={3}>{thisCard.price}</Descriptions.Item>
                        <Descriptions.Item label="Description">{thisCard.description}</Descriptions.Item>
                    </Descriptions>
                </Card>
                <CommentCollection commentType = "animal" id = {props.aid}/>
                <div className={userId !== thisCard.userinfo ?
                    "shopping-cart-wrapper" :
                    "shopping-cart-wrapper hidden" }>
                    <span className="cta-button-round"
                          onClick={() => userId !== null && userId !== undefined ? props.setDisplayCheckout(true) : showModal()}>
                        <ShoppingCartOutlined/>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AnimalCard;
