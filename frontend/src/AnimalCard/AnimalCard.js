import React, { useState,useEffect } from 'react';
import { StarOutlined, ShoppingCartOutlined, CommentOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {Card, Avatar, Descriptions, Button} from 'antd';
import CommentCollection from './Comments';
import './AnimalCard.css';
import {getHeader} from "../Services/userService";
const { Meta } = Card;

const AnimalCard = (props) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        getHeader()
        .then(async res => {
            setUserId(res.uuid);
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

    const showLoginAlert = () => {
        if (window.confirm("Please log in to make the payment.")) {
            window.location.href="http://localhost:3000/login";
        }
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
                        <StarOutlined />,
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
                <div className="shopping-cart-wrapper">
                    <span className="cta-button-round" onClick={() => userId !== null && userId !== undefined ? props.setDisplayCheckout(true) : showLoginAlert()}>
                        <ShoppingCartOutlined />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AnimalCard;
