import React from 'react';
import { StarOutlined, ShoppingCartOutlined, CommentOutlined } from '@ant-design/icons';
import {Card, Avatar, Descriptions} from 'antd';
import Comments from './Comments';
const { Meta } = Card;
const AnimalCard = (props) => {
    return(
        <div style = {{height:'100%', overflow:'auto'}}>
            <Card
                style={{ width: '100%' }}
                cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
                }
                actions={[
                    <CommentOutlined />,
                    <StarOutlined />,
                    <ShoppingCartOutlined />,
                ]}
            >
                <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="User"
                description="A cute fox!"
                />
                <hr color = "white"/>
                <hr color = "white"/>
                <Descriptions bordered>
                    <Descriptions.Item label = "Name" span={3}>DING DING</Descriptions.Item>
                    <Descriptions.Item label = "Age">1</Descriptions.Item>
                    <Descriptions.Item label = "Kind" span={2}>Fox</Descriptions.Item>
                    <Descriptions.Item label = "Street" span={1.5}>3338 Webber Lane</Descriptions.Item>
                    <Descriptions.Item label = "City" span = {1.5}>Vancouver</Descriptions.Item>
                    <Descriptions.Item label = "Price" span={3}>1 buck</Descriptions.Item>
                    <Descriptions.Item label = "Description">I love this bear so much, but as I am moving out of the city, I want you to keep it!</Descriptions.Item>
                </Descriptions>
            </Card>
            <Comments/>
        </div>
    );
};

export default AnimalCard;