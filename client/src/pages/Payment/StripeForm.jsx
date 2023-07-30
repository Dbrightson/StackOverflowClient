import React,{useState,useEffect} from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./StripeForm.css";
import CheckoutForm from "./CheckoutForm";
import {useSelector} from 'react-redux'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

const StripeForm = (props) => {
    const [clientSecret, setClientSecret] = useState("");
    var user = useSelector((state)=>(state.currentUserReducer))

    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
        fetch(
            process.env.REACT_APP_NODE_JS + "payment/purchasePlan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ plan: window.location.href.split('?')[1], id: user.result._id }),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const appearance = {
        theme: 'stripe',
    };
  
    // const appearance = {
    //     theme: 'night',
    //     variables: {
    //       colorPrimary: '#00eeff',
    //       colorBackground: '#000000',
    //       colorText: '#ffffff',
    //     },
    //   };
    const options = {
      clientSecret,
      appearance,
    };
  
    return (
      <div className="payment">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    );
}

export default StripeForm