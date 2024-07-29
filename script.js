// public/script.js
document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/freelancers');
  const freelancers = await response.json();

  const freelancersDiv = document.getElementById('freelancers');
  freelancers.forEach(freelancer => {
      const div = document.createElement('div');
      div.className = 'freelancer';
      div.innerHTML = `
          <h3>${freelancer.name}</h3>
          <p>Skills: ${freelancer.skills.join(', ')}</p>
          <p>Rate: $${freelancer.rate}/hr</p>
          <p>Available: ${freelancer.available ? 'Yes' : 'No'}</p>
      `;
      freelancersDiv.appendChild(div);
  });
});

// public/script.js
document.getElementById('checkout-button').addEventListener('click', async () => {
  const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: 1000 }) // Exemple : $10.00
  });
  const session = await response.json();

  const stripe = Stripe('votre_cle_stripe_publique');
  stripe.redirectToCheckout({ sessionId: session.id });
});
