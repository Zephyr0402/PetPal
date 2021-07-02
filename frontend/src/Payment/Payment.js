import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import StripeContainer from "./StripeContainer";
import './Payment.css'
import OrderConfirmation from "./OrderConfirmation";
import {getHeader, getUserInfo} from "../Services/userService";

const { Meta } = Card;
const data = [
    {
        name: 'Jerry',
        image: '/animalImages/cat.png',
        price: 200,
        user: 'Julia',
        userAvatar: 'userAvatars/julia.jpg',
    },
    {
        name: 'Yuki',
        image: '/animalImages/dog.png',
        price: 200,
        user: 'Nawa',
        userAvatar: 'userAvatars/nawa.png',
    },
    {
        name: 'Milly',
        image: '/animalImages/parrot.png',
        price: 100,
        user: 'Runze',
        userAvatar: 'userAvatars/tsuki.jpg',
    },
    {
        name: 'Ruby',
        image: '/animalImages/fish.png',
        price: 30,
        user: 'Shijun',
        userAvatar: 'userAvatars/shijun.jpg',
    },

];

const Payment = (props) => {
    const selectedAnimal = data[props.aid];
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(()=>{
        getHeader()
            .then(async res => {
                console.log(res.uuid);
            })
    },[]);

    return (
        <div className="payment-wrapper">
            <div className="card-header">
                <Button type = 'text' onClick = {() => props.setDisplayCheckout(false)}><CloseOutlined /></Button>
                <Meta
                    avatar={<Avatar src={selectedAnimal.userAvatar} />}
                    title={selectedAnimal.user}
                />
            </div>
            <Card
                style={{ width: '100%' }}
                cover={
                    <img
                        alt="example"
                        src={selectedAnimal.image}
                    />
                }
            >
                {!paymentSuccess ?
                    <StripeContainer animalName={selectedAnimal.name} amount={selectedAnimal.price} setPaymentSuccess={setPaymentSuccess}/> :
                    <OrderConfirmation animalName={selectedAnimal.name} amount={selectedAnimal.price} />
                }
            </Card>
        </div>
    )
}

export default Payment;
