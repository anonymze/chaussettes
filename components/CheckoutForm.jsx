import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useGlobalContext } from '../context/state';
import axios from 'axios';

export default function CheckoutForm({ total_basket, dispatch }) {
    const [you_can_pay, setYouCanPay] = useState(true);
    const [checkout_success, setCheckoutSuccess] = useState();
    const [checkout_error, setCheckoutError] = useState();
    const stripe = useStripe();
    const elements = useElements();

    const handle_submit = async (e) => {
        e.preventDefault();

        if (total_basket > 0) {
            if (you_can_pay) {
                setYouCanPay(false);   
                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: elements.getElement(CardElement)
                });

                if (!error) {
                    const { id } = paymentMethod;
                    try {     
                        const { data: {confirm} } = await axios.post("/api/charge", { id, amount: total_basket * 100 });
                        if (confirm === "succeeded") {
                            setCheckoutSuccess(true);
                            dispatch({
                                count: 0,
                                infos: []
                            })
                        }
                        else {
                            setCheckoutError('La transaction n\'a pas pu être effectuée, veuillez essayer plus tard.');
                        }

                    }
                    catch {
                        setCheckoutError('Une erreur est survenue, veuillez vérifier vos informations.');
                    }
                }
                else {
                    setCheckoutError(error.message);
                }
            } 
        }
        else {
            setCheckoutError('Votre panier est vide, vous ne pouvez pas effectuer d\'achat.');
        }
    }

    if (checkout_success) return <p>paiment effectué</p>

    return (
        <div>
            <form onSubmit={handle_submit}>
                <CardElement onChange={(() => setYouCanPay(true))} />
                <button type="submit" disabled={!stripe || total_basket <= 0 || !you_can_pay }>Payer</button>
            </form>
            <p>{checkout_error && <span>{checkout_error}</span>}</p>
        </div>
    )
}