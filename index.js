const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parsing JSON
app.use(express.json());

// Connexion à MongoDB Atlas
const dbURI = 'votre_mongodb_atlas_uri';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Modèle de freelance
const freelancerSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  rate: Number,
  available: Boolean
});

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

// Routes API
app.get('/api/freelancers', async (req, res) => {
  const freelancers = await Freelancer.find();
  res.json(freelancers);
});

app.post('/api/freelancers', async (req, res) => {
  const freelancer = new Freelancer(req.body);
  await freelancer.save();
  res.status(201).json(freelancer);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const stripe = require('stripe')('votre_cle_stripe_secrete');

// Exemple de route pour créer une session de paiement
app.post('/api/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Freelance Service',
          },
          unit_amount: req.body.amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://votre_site.com/success',
    cancel_url: 'https://votre_site.com/cancel',
  });

  res.json({ id: session.id });
});
