
/**
     * @desc This class is being used to provide stripe services
     * @author Growexx
     * @since 23/10/2023
     */
class Stripe {

    /**
     * @desc This function is being used to create stripe checkout session
     * @author Growexx
     * @since 23/10/2023
     */
    static async createCheckoutSession ({ priceId, quantity }, stripe) {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: quantity
                }
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}?success=true`,
            cancel_url: `${process.env.FRONTEND_URL}?canceled=true`
        });

        return session;
    }

    /**
     * @desc This function is being used to create payment intent for custom payment flow
     * @author Growexx
     * @since 23/10/2023
     */
    static async createPaymentIntent (amount, stripe) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: CONSTANTS.CURRENCY,
            automatic_payment_methods: {
                enabled: true
            }
        });

        return ({ paymentIntentId: paymentIntent.id, clientSecret: paymentIntent.client_secret });
    }

    /**
     * @desc This function is being used to fetch all the products available in the stripe
     * @author Growexx
     * @since 23/10/2023
     */
    static async getProducts ({ limit, startingAfter, endingBefore }, stripe) {
        const productData = await stripe.products.list({
            active: true,
            ...limit && { limit },
            ...startingAfter && { starting_after: startingAfter },
            ...endingBefore && { ending_before: endingBefore }
        });

        return productData.data;
    }

    /**
     * @desc This function is being used to create products in the stripe
     * @author Growexx
     * @since 23/10/2023
     */
    static async createProduct ({ name, description, price, recurring = false, recurringInterval = null }, stripe) {
        let productData = await stripe.products.create({
            name,
            description,
            type: 'service'
        });

        const priceData = await stripe.prices.create({
            product: productData.id,
            unit_amount: parseInt(price + '00'),
            currency: CONSTANTS.CURRENCY,
            ...recurring && {
                recurring: { interval: recurringInterval }
            }
        });

        productData = await stripe.products.update(productData.id, { default_price: priceData.id });

        return {
            stripeProductId: productData.id,
            stripePriceId: priceData.id,
            name,
            description,
            price,
            recurring,
            recurringInterval
        };
    }

    /**
     * @desc This function is being used to update the products in the stripe
     * @author Growexx
     * @since 23/10/2023
     */
    static async updateProduct ({ productId, name, description, price, recurring, recurringInterval }, stripe) {
        let productData = await stripe.products.update(
            productId,
            {
                ...name && { name },
                ...description && { description }
            }
        );
        let priceData = await stripe.prices.retrieve(productData.default_price);

        if (price || typeof (recurring) === 'boolean') {
            priceData = await stripe.prices.create({
                product: productData.id,
                ...price ? { unit_amount: parseInt(price + '00') } : { unit_amount: priceData.unit_amount_decimal },
                currency: CONSTANTS.CURRENCY,
                ...recurring
                    ? { recurring: { interval: recurringInterval } }
                    : { ...(typeof (recurring) !== 'boolean' && priceData.recurring) && {
                        recurring: { interval: priceData.recurring.interval }
                    } }
            });

            productData = await stripe.products.update(productData.id, { default_price: priceData.id });
        }

        return {
            stripeProductId: productData.id,
            stripePriceId: priceData.id,
            name: productData.name,
            description: productData.description,
            price: priceData.unit_amount_decimal.slice(0, -2),
            recurring: !!priceData.recurring,
            recurringInterval: (priceData.recurring && priceData.recurring.interval) ? priceData.recurring.interval : null
        };
    }

    /**
     * @desc This function is being used to archive the product from stripe product listing
     * @author Growexx
     * @since 23/10/2023
     */
    static async archiveProduct (productId, stripe) {
        await stripe.products.update(productId, { active: false });
    }

    /**
     * @desc This function is being used to unarchive the product from stripe product listing
     * @author Growexx
     * @since 23/10/2023
     */
    static async unarchiveProduct (productId, stripe) {
        await stripe.products.update(productId, { active: true });
    }

    /**
     * @desc This function is being used to construct the webhooks for the payment processing.
     * @author Growexx
     * @since 23/10/2023
     */
    static async constructWebhookEvent (body, signature, stripe) {
        return (await stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET_KEY));
    }
}

module.exports = Stripe;
