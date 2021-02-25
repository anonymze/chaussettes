import { useEffect, useMemo } from 'react';
import Header from '../../components/layout/Header';
import { useGlobalContext } from '../../context/state';
import get_total_basket from '../../lib/getTotalBasket';
import CheckoutForm from '../../components/CheckoutForm';

// Stripe
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const stripe_promise = loadStripe('pk_test_51IONAPHeHH7vOTSrXHqUBupEker6OCCZ88wDJOWw9L2YzDI8eHZQ3HOahCAWyphOJcZZacY1TYsJGeCRayXGSGNS00C02T4ADA');

export default function Commander({payment_intent}) {
        const [{ infos }] = useGlobalContext();

        const total_basket = useMemo(() => {
                return get_total_basket(infos);
        }, [infos])

        useEffect(() => {
                payment_intent.amount = total_basket + 100;
        }, [payment_intent])

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
                                {/* <pre>{JSON.stringify(payment_intent, null, 2)}</pre> */}
                                <CheckoutForm payment_intent={payment_intent} />
                        </Elements>
                </>
        )
}

export async function getServerSideProps(ctx) {
        const stripe = new Stripe("sk_test_51IONAPHeHH7vOTSrPBguGiwAZA1H91DAcSsqzh1ZmHe91pt5pITICHTLRpYzj541l3B8W32Dvy5sLT3OIq0ADpDE009Dwtqunb");
        let payment_intent;
        const { payment_intent_id } = await parseCookies(ctx);

        if (payment_intent_id) {
                payment_intent = await stripe.paymentIntents.retrieve(payment_intent_id);
                return {
                        props: {
                                payment_intent
                        }
                }
        }

        payment_intent = await stripe.paymentIntents.create({    
                amount: 4500,     
                currency: "EUR"
        });

        setCookie(ctx, "payment_intent_id", payment_intent.id);

        return {
                props: {
                        payment_intent
                }
        }
}