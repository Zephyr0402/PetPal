import React, { useState,useEffect } from 'react';
import {HeartTwoTone, ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {Card, Descriptions, Button} from 'antd';
import CommentCollection from './Comments';
import './AnimalCard.css';
import {getUserInfo} from "../Services/userService";
import {addToWishList, isInWishList, removeFromWishList} from "../Services/wishlistService";
import {showLoginRequiredModal} from "../Services/modal";
import UserAvatar from '../Layout/Avatar';

const { Meta } = Card;

const AnimalCard = (props) => {
    const [userId, setUserId] = useState("");
    const [isAddedToWishList, setIsAddedToWishList] = useState(false);
    const [isTheSameUser, setIsTheSameUser] = useState(true);

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

    useEffect(() => {
        getUserInfo()
        .then(res => {
            setUserId(res.uuid);

            setIsTheSameUser(thisCard.userinfo.uuid === res.uuid);

            isInWishList(thisCard._id, res.uuid)
                .then(inWishlist => {
                if(inWishlist) {
                    setIsAddedToWishList(true);
                }
            });
        });

    }, []);

    const isLogin = userId !== null && userId !== undefined;

    const handleAddToWishlist = () => {

        if(!isAddedToWishList){
            addToWishList(thisCard._id, userId).then(success => {
                if(success) {
                    setIsAddedToWishList(true);
                }
            });
        }else{
            removeFromWishList(thisCard._id, userId).then(success => {
                if(success) {
                    setIsAddedToWishList(false);
                }
            });
        }
    };

    return(
        <div>
            <div className="card-wrapper">
                <div className="card-header">
                    <Button type = 'text' onClick = {() => props.setDisplay(-1)}><ArrowLeftOutlined/></Button>
                    <Meta
                        avatar={<UserAvatar size = {40} src={thisCard.userinfo.avatar} uuid = {thisCard.userinfo.uuid} />}
                        title={thisCard.user}
                    />
                </div>
                <Card
                    style={{ width: '100%', marginBottom:"20px" }}
                    cover={
                        <img
                            alt={thisCard.name + " image"}
                            src={thisCard.image}
                        />
                    }
                >

                    <hr color = "white"/>
                    <hr color = "white"/>
                    <Descriptions bordered>
                        <Descriptions.Item label = "Name" span={3}>{thisCard.name}</Descriptions.Item>
                        <Descriptions.Item label="Age" span={3}>{thisCard.animalAgeYear + " year " + thisCard.animalAgeMonth + " month"}</Descriptions.Item>
                        <Descriptions.Item label = "Kind" span={3}>{thisCard.kind}</Descriptions.Item>
                        <Descriptions.Item label = "Address" span={3}>{thisCard.address}</Descriptions.Item>
                        <Descriptions.Item label = "Price (CAD)" span={3}>{thisCard.price}</Descriptions.Item>
                        <Descriptions.Item label="Description">{thisCard.description}</Descriptions.Item>
                    </Descriptions>
                    <CommentCollection commentType = "animal" id = {props.aid}/>
                </Card>
            </div>
            <div className={isTheSameUser ? "icon-button-wrapper hidden" : "icon-button-wrapper visible"}>
                <HeartTwoTone className={isAddedToWishList ? "icon-highlighted" : ""}
                             onClick={() => isLogin ?
                                 handleAddToWishlist() :
                                 showLoginRequiredModal("Please login to add " + thisCard.name + " to your wishlist")}
                />
                <ShoppingCartOutlined
                    onClick={() => isLogin ?
                        props.setDisplayCheckout(true) :
                        showLoginRequiredModal("Please login to make a purchase")
                    }
                />
            </div>

        </div>
    );
};

export default AnimalCard;
