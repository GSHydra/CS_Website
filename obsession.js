// obsession.js
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

// Make the canvas cover the entire viewport
canvas.width = window.outerWidth;
canvas.height = window.outerHeight;

// Star properties
const stars = [];
const numStars = 200; // Adjust for star density
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3,
    color: `rgba(255, 255, 255, ${Math.random()})` // Adjust color range
  });
}

// Sun properties
const sun = {
  x: canvas.width / 2, // Center the sun horizontally
  y: canvas.height / 2, // Center the sun vertically
  radius: 175, // Adjust the size of the sun
  color: '#FFD700', // Color of the sun
};

// Planet properties
const planets = [
  {
    x: sun.x, // Initial x position (centered on sun)
    y: sun.y, // Initial y position (centered on sun)
    radius: 40, // Increased radius
    color: '##55bd3e', // Green
    speed: 0.005, // Adjust for orbital speed
    name: 'Info', // Planet name
    info: 'This is Planet 1. More information about Planet 1 can be displayed here.'
  },
  {
    x: sun.x, // Initial x position (centered on sun)
    y: sun.y, // Initial y position (centered on sun)
    radius: 30, // Increased radius
    color: '#dc3545', // Red
    speed: 0.01,
    name: 'Tartarus',
    info: 'This is Tartarus. Since I did not have much time as this website was past its due date, I decided to name this planet after a place from Greek mythology..'
  },
  {
    x: sun.x, // Initial x position (centered on sun)
    y: sun.y, // Initial y position (centered on sun)
    radius: 30, // Increased radius
    color: '#007bff', // Blue
    speed: 0.02,
    name: 'Info',
    info: 'This is Planet 3. More information about Planet 3 can be displayed here.'
  },
  // Add more planets here with different properties
];

// Draw stars
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  stars.forEach(star => {
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Draw the sun (half-circle)
function drawSun() {
  // Save the current canvas state
  ctx.save();

  // Create a radial gradient for the sun
  const gradient = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, sun.radius);
  gradient.addColorStop(0, '#f7c52f'); // Center of the sun
  gradient.addColorStop(0.5, '#f7ae2f'); // Midpoint
  gradient.addColorStop(1, '#f7862f'); // Edge of the sun

  // Draw the sun with the gradient
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // Restore the canvas state
  ctx.restore();
}

// Draw planets
function drawPlanets() {
  planets.forEach(planet => {
    ctx.fillStyle = planet.color;
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Display planet name
    ctx.font = '12px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(planet.name, planet.x + planet.radius + 5, planet.y + 5);
  });
}

// Update planet positions
function updatePlanets() {
  planets.forEach(planet => {
    if (planet !== selectedPlanet) { // Only update if not selected
      planet.angle += planet.speed;
      planet.x = sun.x + (Math.cos(planet.angle) * (planet.radius + 250)); // Orbit around sun center (increased radius)
      planet.y = sun.y + (Math.sin(planet.angle) * (planet.radius + 250)); // Orbit around sun center (increased radius)
    }
  });
}

// Initialize planet angles and store original speed
planets.forEach(planet => {
  planet.angle = Math.random() * 2 * Math.PI;
  planet.originalSpeed = planet.speed; // Store the original speed here
});

// ... (rest of your obsession.js code)

// Handle click events
let selectedPlanet = null;
canvas.addEventListener('click', (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Check if any planet was clicked
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    const distance = Math.sqrt(
      Math.pow(mouseX - planet.x, 2) + Math.pow(mouseY - planet.y, 2)
    );
    if (distance <= planet.radius) {
      if (selectedPlanet === planet) { // If the same planet is clicked, reset
        selectedPlanet = null;
        planet.radius /= 1.5; // Reset size
        planets.forEach(p => {
          p.speed = p.originalSpeed; // Reset speed to original speed
        });
        // Hide the planet info box
        document.getElementById('planetInfo').style.display = 'none';
      } else { // If a different planet is clicked, update the selected planet
        selectedPlanet = planet;
        planet.radius *= 1.5; // Enlarge
        // Reset speeds of all planets (except the selected one)
        planets.forEach(p => {
          if (p !== selectedPlanet) {
            p.speed = 0; // Stop other planets
          }
        });
        // Display planet information
        document.getElementById('planetInfo').innerHTML = selectedPlanet.info;
        document.getElementById('planetInfo').style.display = 'block';
        // Position the info box to the right of the planet
        document.getElementById('planetInfo').style.left = (selectedPlanet.x + planet.radius + 10) + 'px'; // Adjusted offset
        document.getElementById('planetInfo').style.top = (selectedPlanet.y - 30) + 'px';
        document.getElementById('planetInfo').style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Added background color
        document.getElementById('planetInfo').style.color = 'white'; // Added text color
        document.getElementById('planetInfo').style.padding = '10px'; // Added padding
        document.getElementById('planetInfo').style.borderRadius = '5px'; // Added border radius
        document.getElementById('planetInfo').style.width = '200px'; // Added fixed width
      }
      break;
    }
  }

});

// ... (rest of your obsession.js code)

// Update star positions (simple animation)
function updateStars() {
  stars.forEach(star => {
    star.y += 0.1; // Adjust for speed
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

// Animation loop
function animate() {
  updateStars();
  drawStars();
  drawSun();
  updatePlanets();
  drawPlanets();
  requestAnimationFrame(animate);
}

animate();
