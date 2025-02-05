const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Get user orders
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('products.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create order
router.post('/', auth, async (req, res) => {
    try {
        const { products, shippingAddress, paymentMethod } = req.body;

        // Calculate total amount
        const totalAmount = products.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        // Create order
        const order = new Order({
            user: req.user.id,
            products,
            shippingAddress,
            paymentMethod,
            totalAmount,
            status: 'pending'
        });

        await order.save();

        // Create Stripe payment intent
        if (paymentMethod === 'card') {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(totalAmount * 100), // Stripe expects amount in cents
                currency: 'usd',
                metadata: {
                    orderId: order._id.toString()
                }
            });

            return res.json({
                order,
                clientSecret: paymentIntent.client_secret
            });
        }

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update order status
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Verify user owns the order
        if (order.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Webhook endpoint for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;

        // Update order status to paid
        await Order.findByIdAndUpdate(orderId, { status: 'paid' });
    }

    res.json({ received: true });
});

module.exports = router;
