import React, {useState} from 'react';
import axios from "axios";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Button, Typography} from "antd";

const { Title, Text } = Typography;

const CreditCardForm = ({animalName, amount, setPaymentSuccess}) => {
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

                /*const response = await axios.post("http://localhost:9999/api/payment", {
                    //stripe amount is in cent
                    amount: amount * 100,
                    id
                });

                if(response.data.success) {
                    console.log("Successful payment");
                    setPaymentSuccess(true);
                }*/

                const payment = {
                    amount: amount * 100,
                    id
                };

                fetch("http://localhost:9999/api/payment", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(payment)
                }).then(res => {
                    if(res.status === 200) {
                        setPaymentSuccess(true);
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
            <Title level={2} className="payment-summary"><span>Payment for {animalName}</span><span>${amount}</span></Title>
            <form onSubmit={handleSubmit}>
                <h3>Please enter your valid credit card</h3>
                <fieldset className="form-group">
                    <div className="form-row">
                        <CardElement options = {CARD_OPTIONS} onChange={handleOnCardInputChange}/>
                    </div>
                </fieldset>
                {isProcessing ?
                    <Text>Processing Payment</Text> :
                    <Button type="primary" htmlType="submit">Make Payment</Button>
                }

            </form>
            <Text type="danger">{errorMsg}</Text>
        </div>
    )
};

export default CreditCardForm;
