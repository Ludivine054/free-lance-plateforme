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
