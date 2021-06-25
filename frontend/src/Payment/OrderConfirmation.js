import React from 'react';
import {SmileTwoTone, CheckCircleTwoTone} from "@ant-design/icons";
import {Typography} from "antd";

const { Title, Text, Link } = Typography;

function OrderConfirmation({animalName, amount}) {
    return (
        <div className="order-confirmation">
            <CheckCircleTwoTone twoToneColor="#00b8b0" />
            <Title level={3}>Successful Payment</Title>
            <div className="order-info">
                <Title level={4}>Order Number: XXXX</Title>
                <Text>{new Date().toLocaleString('en-CA')}</Text>
                <hr/>
                <Title level={4} className="payment-summary"><span>{animalName}</span><span>${amount}</span></Title>
            </div>
            <div className="thank-you-message">
                <Title level={3}>Thank You!!!</Title>
                <Text>{animalName} is excited to see you.</Text>
                <Text>Have a lovely day <SmileTwoTone /></Text>
            </div>

            <Link href="#">
                View your order
            </Link>

        </div>
    )
}

export default OrderConfirmation;
