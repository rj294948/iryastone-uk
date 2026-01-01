const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Stripe = require('stripe');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'https://your-domain.com'],
    credentials: true
}));
app.use(express.json());

// Initialize Stripe with your SECRET KEY from .env
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create Payment Intent
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency = 'gbp', customer_email, description, metadata } = req.body;
        
        // Validate amount
        if (!amount || amount < 50) { // Minimum 50 cents/pence
            return res.status(400).json({ 
                error: 'Invalid amount. Minimum payment is £0.50' 
            });
        }
        
        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to smallest currency unit
            currency: currency,
            description: description || 'IRYA STONE Advance Payment',
            metadata: metadata || {},
            receipt_email: customer_email,
            automatic_payment_methods: {
                enabled: true,
            },
            // For UK businesses
            statement_descriptor: 'IRYA STONE',
            statement_descriptor_suffix: 'ADVANCE',
        });
        
        // Return client secret
        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency
        });
        
    } catch (error) {
        console.error('❌ Payment intent creation error:', error);
        res.status(500).json({ 
            error: error.message || 'Payment processing failed' 
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`✅ Stripe Payment Server running on port ${port}`);
});
