import React, { useState, useEffect } from 'react';
import { Avatar, Card, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getPostedAnimals } from '../Services/postAnimalInfo';
import './UserInfoPage.css'

const { Meta } = Card;

function PostedAnimals(){

    const [animalinfo, setanimalinfo] = useState([])

    useEffect(async () => {
        getPostedAnimals()
            .then((res) => {
                setanimalinfo(res);
            })
    },[]);
    
    const cardDisplay = animalinfo.map((card) =>
    <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
        <Card
        hoverable
        style={{ height: "95%", objectFit: 'cover', width: 200}}
        cover={<img alt={card.name} src={card.image} width="200" height="180"/>}
        >
        <Meta title={card.name} description={card.description} />
        </Card>
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