import React from 'react';
import { StarOutlined, ShoppingCartOutlined, CommentOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {Card, Avatar, Descriptions, Button} from 'antd';
import Comments from './Comments';
const { Meta } = Card;
const data = [
    {
        name: 'Jerry',
        image: '/animalImages/cat.png',
        age: 1.5,
        user: 'Julia',
        userAvatar: 'userAvatars/julia.jpg',
        kind: 'cat',
        description : 'A cute cat!!!'
    },
    {
        name: 'Yuki',
        image: '/animalImages/dog.png',
        age: 2,
        user: 'Nawa',
        userAvatar: 'userAvatars/nawa.png',
        kind: 'dog',
        description : 'A cute dog!!!'
    },
    {
        name: 'Milly',
        image: '/animalImages/parrot.png',
        age: '6 month',
        user: 'Runze',
        userAvatar: 'userAvatars/tsuki.jpg',
        kind: 'bird',
        description : 'A cute bird!!!'
    },
    {
        name: 'Ruby',
        image: '/animalImages/fish.png',
        age: 3,
        user: 'Shijun',
        userAvatar: 'userAvatars/shijun.jpg',
        kind: 'Fish',
        description : 'A cute fish!!!'
    },
    
];

const AnimalCard = (props) => {
    const thisCard = data[props.aid];
    return(
        <div>
            <div style = {{height:'100%', overflow:'auto', position:'absolute'}}>
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
                        <ShoppingCartOutlined />,
                    ]}
                >
                    <Meta
                    avatar={<Avatar src={thisCard.userAvatar} />}
                    title={thisCard.user}
                    description={thisCard.description}
                    />
                    <hr color = "white"/>
                    <hr color = "white"/>
                    <Descriptions bordered>
                        <Descriptions.Item label = "Name" span={3}>{thisCard.name}</Descriptions.Item>
                        <Descriptions.Item label = "Age">{thisCard.age}</Descriptions.Item>
                        <Descriptions.Item label = "Kind" span={2}>{thisCard.kind}</Descriptions.Item>
                        <Descriptions.Item label = "Street" span={1.5}>3338 Webber Lane</Descriptions.Item>
                        <Descriptions.Item label = "City" span = {1.5}>Vancouver</Descriptions.Item>
                        <Descriptions.Item label = "Price" span={3}>1 buck</Descriptions.Item>
                        <Descriptions.Item label = "Description">I love this bear so much, but as I am moving out of the city, I want you to keep it!</Descriptions.Item>
                    </Descriptions>
                </Card>
                <Comments aid = {props.aid}/>
            </div>
            <Button type = 'text' style = {{position:'relative'}} onClick = {() => props.setDisplay(-1)}><ArrowLeftOutlined style = {{color:'whilte'}}/></Button>
        </div>
    );
};

export default AnimalCard;