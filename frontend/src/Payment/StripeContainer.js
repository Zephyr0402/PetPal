import React from 'react';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js/pure";
import CreditCardForm from "./CreditCardForm";

const PUBLIC_KEY = "pk_test_51J2f66JoWtlpotrESG51Kl1u0CjSHCLPwdIliNtHh5WGX3aGwGupHt8yXZsFt1VcQ6fZeUeZQgEEP0vBuKg7QXVj00M3IuU3JR";

//synchronously loads the Stripe.js script and initializes a Stripe object
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = (props) => {
    return (
        <Elements stripe={stripeTestPromise}>
            <CreditCardForm animal={props.animal} setPaymentSuccess={props.setPaymentSuccess} setOrderNumber={props.setOrderNumber}/>
        </Elements>
    )
};

export default StripeContainer;
