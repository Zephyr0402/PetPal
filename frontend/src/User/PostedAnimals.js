import React, { useState, useEffect } from 'react';
import {Card, Col, Row} from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';
import {getPostedAnimals, removeAnimal} from '../Services/postAnimalInfo';
import {getWishList, removeFromWishList} from '../Services/wishlistService'
import './UserInfoPage.css'
import {getUserInfo} from "../Services/userService";

const { Meta } = Card;

function PostedAnimals(props){
    const [animalinfo, setanimalinfo] = useState([]);
    const [userId, setUserId] = useState("");
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setReload(false);
        props.filter === "1" ?
        getPostedAnimals(props.uuid)
            .then((res) => {
                setanimalinfo(res);
            })
        :
        getWishList()
            .then((res) => {
                setanimalinfo(res);
            });

        getUserInfo()
            .then(res => {
                setUserId(res.uuid);
            });
    },[props.filter, reload]);

    const handleRemove = (animalId, userId) => {
        if(props.filter === "1") {
            removeAnimal(animalId).then(() => {
                setReload(true);
            });
        }else if(props.filter === "2"){
            removeFromWishList(animalId, userId).then(() => {
                setReload(true);
            });
        }
    };

    const cardDisplay = animalinfo.map((card) =>
    <Col className="posts-thumbnail" xs={24} md={12} lg={8} xl={6} xxl={4}>
        {/*<Link to = { card.status === "sold" ? '#' : {pathname:'/map', query : { display: card.id }} }>*/}
            <Card
            hoverable
            style={{ height: "97%", objectFit: 'cover', width: '100%'}}
            cover={<img alt={card.name} src={card.image} width="200" height="180"/>}
            >
            <Meta title={card.name + ": $" + card.price} description={card.address} />
            </Card>
       {/* </Link>*/}

        { props.isMe? <CloseCircleTwoTone onClick={() => handleRemove(card._id, userId)}/> : null}

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
