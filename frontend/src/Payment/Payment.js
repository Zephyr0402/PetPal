import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import StripeContainer from "./StripeContainer";
import './Payment.css'
import OrderConfirmation from "./OrderConfirmation";
import {getHeader, getUserInfo} from "../Services/userService";

const { Meta } = Card;

const Payment = (props) => {
    const selectedAnimal = props.data[props.aid];

    console.log("aid: " + props.aid);
    console.log("name: " + selectedAnimal.name);
    console.log("price: " + selectedAnimal.price);
    console.log("seller: " + selectedAnimal.user);
    console.log("_id: " + selectedAnimal._id);

    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(()=>{
        //check if user is logging in
        getHeader()
            .then(async res => {
                console.log("uuid: " + res.uuid);
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
                    <StripeContainer animal={selectedAnimal} animalName={selectedAnimal.name} amount={selectedAnimal.price} setPaymentSuccess={setPaymentSuccess}/> :
                    <OrderConfirmation animalName={selectedAnimal.name} amount={selectedAnimal.price} />
                }
            </Card>
        </div>
    )
}

export default Payment;
