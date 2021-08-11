import React, {useState} from 'react';
import {Avatar, Button, Card} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import StripeContainer from "./StripeContainer";
import './Payment.css'
import OrderConfirmation from "./OrderConfirmation";

const { Meta } = Card;

const Payment = (props) => {
    const selectedAnimal = props.animalInfos[props.aid];

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [newTransaction, setNewTransaction] = useState(null);

    const setAllDisplayValues = () => {
        if(paymentSuccess) {
            props.setDisplay(-1);
            window.location.reload();
        }

        props.setDisplayCheckout(false);

    };


    return (
        <div className="payment-wrapper">
            <div className="card-header">
                {/* If payment is successfully process, the back button should take user to home page, otherwise
                 take user to animal info*/}
                <Button type = 'text' onClick = {setAllDisplayValues}><CloseOutlined /></Button>
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
                    <StripeContainer animal={selectedAnimal} setPaymentSuccess={setPaymentSuccess} setNewTransaction={setNewTransaction}/> :
                    <OrderConfirmation animal={selectedAnimal} newTransaction={newTransaction}/>
                }
            </Card>
        </div>
    )
};

export default Payment;
