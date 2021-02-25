import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';
import { useState } from 'react';

export default function CheckoutForm({ payment_intent }) {
    const stripe = useStripe();
    const elements = useElements();
    const [checkout_success, setCheckoutSuccess] = useState();
    const [checkout_error, setCheckoutError] = useState();



    const handle_submit = async (e) => {
        e.preventDefault();

        try {
            const info_payment = await stripe.confirmCardPayment(payment_intent.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            if (info_payment.error) throw new Error(info_payment.error.message);

            if (info_payment.paymentIntent && info_payment.paymentIntent.status === "succeeded") {
                destroyCookie(null, 'payment_intent_id');
                setCheckoutSuccess(true);
            }

        } catch (err) {
            setCheckoutError(err.message)
        }
    }

    if (checkout_success) return <p>paiment effectué</p>

    return (
        <div>
            <form onSubmit={handle_submit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>Payer</button>
            </form>
            <p>{checkout_error && <span>{checkout_error}</span>}</p>
        </div>
    )
}