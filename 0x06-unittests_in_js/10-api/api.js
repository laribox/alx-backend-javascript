const express = require('express');

const app = express();
const PORT = 7865;

// Middleware to parse JSON requests
app.use(express.json());

// Root endpoint
app.get('/', (_req, res) => {
  res.send('Welcome to the payment system');
});

// Endpoint to get payment methods for a specific cart
app.get('/cart/:id(\\d+)', (req, res) => {
  const id = req.params.id;
  res.send(`Payment methods for cart ${id}`);
});

// Endpoint to get available payment methods
app.get('/available_payments', (_req, res) => {
  res.json({
    payment_methods: {
      credit_cards: true,
      paypal: false,
    },
  });
});

// Endpoint for user login
app.post('/login', (req, res) => {
  const username = req.body?.userName || '';
  res.send(`Welcome ${username}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`API available on localhost port ${PORT}`);
});

module.exports = app;

