import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StarOutlined, ShoppingCartOutlined, CommentOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {Card, Avatar, Descriptions, Button} from 'antd';
import Comments from './Comments';
import './AnimalCard.css';
import {getHeader} from "../Services/userService";
const { Meta } = Card;
const data = [
    {
        name: 'Jerry',
        image: '/animalImages/cat.png',
        age: 1.5,
        price: 200,
        user: 'Julia',
        userAvatar: 'userAvatars/julia.jpg',
        kind: 'cat',
        description : 'A cute cat!!!'
    },
    {
        name: 'Yuki',
        image: '/animalImages/dog.png',
        age: 2,
        price: 200,
        user: 'Nawa',
        userAvatar: 'userAvatars/nawa.png',
        kind: 'dog',
        description : 'A cute dog!!!'
    },
    {
        name: 'Milly',
        image: '/animalImages/parrot.png',
        age: '6 month',
        price: 100,
        user: 'Runze',
        userAvatar: 'userAvatars/tsuki.jpg',
        kind: 'bird',
        description : 'A cute bird!!!'
    },
    {
        name: 'Ruby',
        image: '/animalImages/fish.png',
        age: 3,
        price: 30,
        user: 'Shijun',
        userAvatar: 'userAvatars/shijun.jpg',
        kind: 'Fish',
        description : 'A cute fish!!!'
    },

];

const AnimalCard = (props) => {
    const [animalInfos, setAnimalInfos] = useState(null);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const backEndURL = "http://127.0.0.1:9999/animalinfo";
        axios.get(backEndURL)
            .then((res) => {
                console.log(res.data.animalInfos);
                setAnimalInfos(res.data.animalInfos);
            });

        getHeader()
            .then(async res => {
                console.log("uuid: " + res.uuid);
                setUserId(res.uuid);
            });
    }, []);
    let thisCard = null;
    if (animalInfos != undefined) {
        thisCard = animalInfos[props.aid];
    } else {
        if (props.aid < 4) {
            thisCard = data[props.aid];
        } else {
            thisCard = {
                name: 'None',
                image: 'https://www.google.com/search?q=Test+image&newwindow=1&safe=active&sxsrf=ALeKk02G4AVAGK_JgnSwZ_Sxj0LU_L26ww:1624699947317&tbm=isch&source=iu&ictx=1&fir=kP6LYXagHuVy2M%252CysX-Qr231ARcNM%252C_&vet=1&usg=AI4_-kRM4nMdypa1KTgxi5Pb17eOU9Cuyw&sa=X&ved=2ahUKEwiZp-f5_rTxAhVNwZ4KHRonCe4Q9QF6BAgQEAE&biw=1395&bih=764#imgrc=kP6LYXagHuVy2M',
                age: 0,
                price: 0,
                user: 'Shijun',
                userAvatar: 'userAvatars/shijun.jpg',
                kind: 'None',
                description: 'None'
            };
        }
    }

    console.log(thisCard);

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
                    style={{ width: '100%' }}
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
                        <Descriptions.Item label = "Age">{thisCard.age}</Descriptions.Item>
                        <Descriptions.Item label = "Kind" span={2}>{thisCard.kind}</Descriptions.Item>
                        <Descriptions.Item label = "Street" span={1.5}>3338 Webber Lane</Descriptions.Item>
                        <Descriptions.Item label = "City" span = {1.5}>Vancouver</Descriptions.Item>
                        <Descriptions.Item label = "Price (CAD)" span={3}>{thisCard.price}</Descriptions.Item>
                        <Descriptions.Item label="Description">{thisCard.description}</Descriptions.Item>
                    </Descriptions>
                </Card>
                <Comments aid = {props.aid}/>
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
