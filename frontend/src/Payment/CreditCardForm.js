import React, {useState} from 'react';
import axios from "axios";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Button, Typography} from "antd";
import { CloseCircleTwoTone } from '@ant-design/icons';

const { Title, Text } = Typography;

const CreditCardForm = (props) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const CARD_OPTIONS = {
        iconStyle: "solid",
        hidePostalCode: true,
        style: {
            base: {
                iconColor: "#212121",
                color: "#06070f",
                backgroundColor: "transparent",
                fontSize: "14px",
            },
            invalid: {
                iconColor: "#ff4d4f",
                color: "#ff4d4f",
            },
            complete: {
                iconColor: "#00b8b0"
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        if(!error) {
            try {
                setIsProcessing(true);
                const {id} = paymentMethod;

                const payment = {
                    //TODO: change to auto-increment or random unique number
                    orderNumber: "PetPal-001",

                    //TODO: update to id???
                    buyerId: "123",
                    //TODO: update to id
                    sellerId: props.animal.user,
                    animalId: props.animal._id,
                    timestamp: new Date(),
                    price: props.animal.price,
                    status: "Pending",
                    tag: props.animal.kind,
                    id
                };

                fetch("http://localhost:9999/api/payment", {
                    method: "POST",
                    headers: new Headers({
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify(payment)
                }).then(res => {
                    if(res.status === 200) {
                        props.setPaymentSuccess(true);
                    }else if(res.status >= 400){
                        res.text().then(text => setErrorMsg(text));
                    }
                });

            }catch (err) {
                setErrorMsg(err.message);
                console.log("Error", err);
            }
        }else {
            setErrorMsg(error.message);
            console.log(error.message);
        }
    };

    const handleOnCardInputChange = (ev) => {
        ev.error ? setErrorMsg(ev.error.message) : setErrorMsg();
    };


    return (
        <div className="credit-card-form">
            <Title level={2} className="payment-summary"><span>Payment for {props.animal.name}</span><span>${props.animal.price}</span></Title>
            <form onSubmit={handleSubmit}>
                <h3>Please enter your valid credit card</h3>
                <fieldset className="form-group">
                    <div className="form-row">
                        <CardElement options = {CARD_OPTIONS} onChange={handleOnCardInputChange}/>
                    </div>
                </fieldset>
                {isProcessing ?
                    <Text >Processing Payment</Text > :
                    <Button type="primary" htmlType="submit">Make Payment</Button>
                }

            </form>
            <div className={errorMsg === "" || errorMsg === undefined ? "error-msg hidden" : "error-msg"}>
                <CloseCircleTwoTone twoToneColor="#ff4d4f"/>
                <Text type="danger"> {errorMsg}</Text>
            </div>
        </div>
    )
};

export default CreditCardForm;
