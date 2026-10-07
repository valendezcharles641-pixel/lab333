document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const alertContainer = document.getElementById('alertContainer');

  // If user is already logged in, redirect to dashboard
  if (localStorage.getItem('currentUser')) {
    window.location.href = 'dashboard.html';
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      // Simple Validation Simulation
      if (username !== "" && password.length >= 4) {
        // Save user session in localStorage
        const userData = {
          name: username,
          role: "Fitness Enthusiast",
          loginTime: new Date().toLocaleTimeString()
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));

        // Show Success Alert
        showAlert('Login successful! Redirecting...', 'success');

        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      } else {
        showAlert('Invalid credentials. Password must be at least 4 characters.', 'danger');
      }
    });
  }
});

// Helper function to render Bootstrap Alerts dynamically
function showAlert(message, type) {
  const alertContainer = document.getElementById('alertContainer');
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show text-start py-2 px-3 small" role="alert">
      ${message}
      <button type="button" class="btn-close py-2" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}