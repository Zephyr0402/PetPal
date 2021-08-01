import React from 'react';
import {SmileTwoTone, CheckCircleTwoTone} from "@ant-design/icons";
import {Typography} from "antd";
import {Link} from 'react-router-dom';


const { Title, Text } = Typography;

function OrderConfirmation(props) {

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

            <Link to = {{pathname:'/user', state : { key:"3" }}}>
                View your order
            </Link>
            <p>You may cancel your order within 2 hours after it is processed.</p>
        </div>
    )
}

export default OrderConfirmation;
