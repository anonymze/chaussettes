import { useMemo } from 'react';
import Header from '../../components/layout/Header';
import { useGlobalContext } from '../../context/state';
import get_total_basket from '../../lib/getTotalBasket';
import CheckoutForm from '../../components/CheckoutForm';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripe_promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Commander() {
        const [{ infos }, dispatch] = useGlobalContext();

        const total_basket = useMemo(() => {
                return get_total_basket(infos);
        }, [infos]);

        return (
                <>
                        <Header />
                        <div id="dropin-container"></div>
                        {
                                infos.map((info) => {
                                        return <div key={info.product_id}>
                                                <p>{info.name}</p>
                                                <p>{info.price} * {info.count} = {info.price * info.count} €</p>
                                        </div>
                                })
                        }

                        <h2>{total_basket} €</h2>
                        <Elements stripe={stripe_promise}>
                                <CheckoutForm total_basket={total_basket} dispatch={dispatch} />
                        </Elements>
                </>
        )
}
