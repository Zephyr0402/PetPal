import React, {useEffect, useState} from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Button, Typography} from "antd";
import { CloseCircleTwoTone } from '@ant-design/icons';
import {getHeader} from "../Services/userService";
import backendURL from "../Services/backendURL";

const { Title, Text } = Typography;

const CreditCardForm = (props) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [userId, setUserId] = useState(null);
    const [sellerId, setSellerId] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const animalId = { id : props.animal.id };

        fetch( backendURL + "/animalinfo/userinfo", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(animalId)
        }).then(res => {
            if(res.status === 200) {
                return res.json();
            }else if(res.status >= 400){
                console.log("cannot get user info");
            }
        }).then(data => {
            if(data) {
                setSellerId(data.uuid);
            }
        });
    },[]);

    getHeader()
        .then(async res => {
            setUserId(res.uuid);
        });

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

                const transaction = {
                    buyerId: userId,
                    sellerId: sellerId,
                    animalId: props.animal._id,
                    timestamp: new Date(),
                    price: props.animal.price,
                    status: "pending",
                    tag: props.animal.kind,
                    id
                };

                fetch(backendURL + "/api/transaction/add", {
                    method: "POST",
                    headers: new Headers({
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify(transaction)
                }).then(res => {
                    if(res.status === 200) {
                        res.json().then(result => {
                            props.setNewTransaction(result.data);
                            props.setPaymentSuccess(true);

                            const notification = {
                                destinationUserID: sellerId,
                                contentID: result.data._id,
                            };

                            fetch(backendURL + "/api/notify/transaction/proceed&" + userId, {
                                method: "POST",
                                headers: new Headers({
                                    "Content-Type": "application/json",
                                }),
                                body: JSON.stringify(notification)
                            }).then(res => {
                                res.text().then(text => console.log(text));
                            }).catch(err => console.log(err));


                        });
                    }else if(res.status >= 400){
                        res.text().then(text => setErrorMsg(text));
                    }
                });

            }catch (err) {
                setErrorMsg(err.message);
            }
        }else {
            setErrorMsg(error.message);
        }
    };

    const handleOnCardInputChange = (ev) => {
        ev.error ? setErrorMsg(ev.error.message) : setErrorMsg();
    };


    return (
        <div className="credit-card-form">
            <Title level={2} className="payment-summary"><span>{props.animal.name}</span><span>${props.animal.price}</span></Title>
            <form onSubmit={handleSubmit}>
                <h3>Please enter your valid credit card</h3>
                <fieldset className="form-group">
                    <div className="form-row">
                        <CardElement options = {CARD_OPTIONS} onChange={handleOnCardInputChange}/>
                    </div>
                </fieldset>
                {isProcessing ?
                    <Text >Processing Payment</Text > :
                    <Button type="primary" htmlType="submit">Pay ${props.animal.price}</Button>
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
