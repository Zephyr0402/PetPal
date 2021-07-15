import React from 'react';
import {SmileTwoTone, CheckCircleTwoTone} from "@ant-design/icons";
import {Typography, Button} from "antd";
import {CardElement} from "@stripe/react-stripe-js";

const { Title, Text, Link } = Typography;
const backEndURL = "http://localhost:9999/api/";

function OrderConfirmation(props) {

    const handleCancel = async (e) => {
        e.preventDefault();

        const transaction = {
            id: props.newTransaction._id,
            status: "canceled"
        };

        fetch(backEndURL + "transaction/update_status", {
            method: "PATCH",
            headers: new Headers({
                'Accept': 'application/json',
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(transaction)
        }).then(res => {
            if(res.status === 200) {
                console.log("transaction status successfully updated");
            }else if(res.status >= 400){
                console.log("transaction status fail to updated");
            }
        });
    };

    return (
        <div className="order-confirmation">
            <CheckCircleTwoTone twoToneColor="#00b8b0" />
            <Title level={3}>Successful Payment</Title>
            <div className="order-info">
                <Title level={4}>Order Number: {props.newTransaction.orderNumber}</Title>
                <Text>{new Date().toLocaleString('en-CA')}</Text>
                <hr/>
                <Title level={4} className="payment-summary"><span>{props.animal.name}</span><span>${props.animal.price}</span></Title>
            </div>
            <div className="thank-you-message">
                <Title level={3}>Thank You!!!</Title>
                <Text>{props.animal.name} is excited to see you.</Text>
                <Text>Have a lovely day <SmileTwoTone /></Text>
            </div>

            <Link href="http://localhost:3000/user" className="link-block">
                View your order
            </Link>

            {/*To be deleted*/}
            <Button type="primary" danger onClick={handleCancel}>
                Testing: Cancel
            </Button>

        </div>
    )
}

export default OrderConfirmation;
