document.addEventListener('DOMContentLoaded', () => {
  // Check Authentication State
  const currentUserRaw = localStorage.getItem('currentUser');
  if (!currentUserRaw) {
    // Redirect if no active session
    window.location.href = 'index.html';
    return;
  }

  const currentUser = JSON.parse(currentUserRaw);
  document.getElementById('userDisplay').textContent = currentUser.name;

  // Handle Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  });

  // Default Activity Data
  let activities = JSON.parse(localStorage.getItem('userActivities')) || [
    { id: 1, name: 'Morning Jog', duration: 30, calories: 250, status: 'Completed' },
    { id: 2, name: 'Weightlifting', duration: 45, calories: 180, status: 'Completed' }
  ];

  // Render Activity List
  function renderActivities() {
    const tbody = document.getElementById('activityTableBody');
    tbody.innerHTML = '';

    if (activities.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">No activities logged yet.</td></tr>`;
      return;
    }

    activities.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="fw-semibold">${item.name}</td>
        <td>${item.duration} mins</td>
        <td>${item.calories} kcal</td>
        <td><span class="badge bg-success-subtle text-success border border-success-subtle">${item.status}</span></td>
        <td>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteActivity(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Save updated state
    localStorage.setItem('userActivities', JSON.stringify(activities));
  }

  // Handle Adding New Activity
  const activityForm = document.getElementById('activityForm');
  activityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('activityName').value.trim();
    const duration = document.getElementById('activityDuration').value;
    const calories = document.getElementById('activityCalories').value;

    const newActivity = {
      id: Date.now(),
      name: name,
      duration: duration,
      calories: calories,
      status: 'Completed'
    };

    activities.push(newActivity);
    renderActivities();

    // Reset Form & Close Modal
    activityForm.reset();
    const modalElement = document.getElementById('addWorkoutModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  });

  // Global Delete Handler
  window.deleteActivity = (index) => {
    activities.splice(index, 1);
    renderActivities();
  };

  // Initial Render
  renderActivities();
});