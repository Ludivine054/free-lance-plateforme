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
