import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { id, amount } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            description: 'Chaussettes',
            payment_method: id,
            confirm: true
        });

        return res.status(200).json({
            confirm: 'succeeded'
        });
    }
    catch(err) {
        console.log(err);
        return res.status(400).json({
            message: err.message
        });
    }
}