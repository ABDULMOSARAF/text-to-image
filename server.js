const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Stripe = require('stripe');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(bodyParser.json());

// Endpoint to create a Stripe Checkout session
app.post('/api/create-checkout-session', async (req, res) => {
    const { items } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items,
            mode: 'payment',
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/cancel`,
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for text-to-image generation (mock implementation)
app.post('/api/text-to-image', async (req, res) => {
    const { text } = req.body;

    // Here you would implement your text-to-image generation logic
    // For demonstration, we will return a placeholder image URL
    const imageUrl = `https://via.placeholder.com/800x400.png?text=${encodeURIComponent(text)}`;
    res.json({ imageUrl });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
