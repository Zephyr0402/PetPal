import React, { useState, useEffect } from 'react';
import {Card, Col, Row} from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import { getPostedAnimals } from '../Services/postAnimalInfo';
import {getWishList, removeFromWishList} from '../Services/wishlistService'
import './UserInfoPage.css'
import {getUserInfo} from "../Services/userService";

const { Meta } = Card;

function PostedAnimals(props){
    // console.log(props);

    const [animalinfo, setanimalinfo] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        console.log(props);
        props.filter === "1" ?
        getPostedAnimals()
            .then((res) => {
                console.log("1");
                setanimalinfo(res);
            })
        :
        getWishList()
            .then((res) => {
                console.log("2")
                setanimalinfo(res);
            });

        getUserInfo()
            .then(res => {
                setUserId(res.uuid);
            });
    },[props.filter]);

    const handleRemoveFromWishlist = (animalId, userId) => {
        removeFromWishList(animalId, userId).then(() => {
            window.location.reload();
        });
    }

    const cardDisplay = animalinfo.map((card) =>
    <Col className="posts-thumbnail" xs={24} md={12} lg={8} xl={6} xxl={4}>
        <Link to = { card.status === "sold" ? '#' : {pathname:'/map', query : { display: card.id }} }>
            <Card
            hoverable
            style={{ height: "97%", objectFit: 'cover', width: '100%'}}
            cover={<img alt={card.name} src={card.image} width="200" height="180"/>}
            >
            <Meta title={card.name + ": $" + card.price} description={card.description} />
            </Card>
        </Link>
        {props.filter === "2" ?
            <CloseCircleTwoTone onClick={() => handleRemoveFromWishlist(card._id, userId)}/> :
            <></>
        }
        {card.status === "sold" ?
            <div className="animal-sold-message"><span>SOLD</span></div> :
            <></>
        }
    </Col>
)

    return (
        <div className="posts-thumbnail-wrapper">
        <br />
        <Row gutter={16}>
            {cardDisplay}
        </Row>
        </div>
    );
}
export default PostedAnimals;
