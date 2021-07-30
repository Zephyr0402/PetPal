import React, { useState, useEffect } from 'react';
import {Card, Col, Row} from 'antd';
import {Link} from 'react-router-dom';
import { getPostedAnimals } from '../Services/postAnimalInfo';
import { getWishList } from '../Services/wishlistService'
import './UserInfoPage.css'

const { Meta } = Card;

function PostedAnimals(props){
    // console.log(props);

    const [animalinfo, setanimalinfo] = useState([])

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
            })
    },[props.filter]);
    
    const cardDisplay = animalinfo.map((card) =>
    <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
        <Link to = {{pathname:'/map', state : { display: card.id }}}>
            <Card
            hoverable
            style={{ height: "95%", objectFit: 'cover', width: 200}}
            cover={<img alt={card.name} src={card.image} width="200" height="180"/>}
            >
            <Meta title={card.name} description={card.description} />
            </Card>
        </Link>
    </Col>
)

    return (
        <div style = {{height:'100%', overflow :'auto'}}>
        <br />
        <Row gutter={16}>
            {cardDisplay}
        </Row>
        </div>
    );
}
export default PostedAnimals;