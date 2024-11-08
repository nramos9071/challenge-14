document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
  
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const password2 = document.getElementById('password2').value.trim();
  
      if (password !== password2) {
        alert('Passwords do not match');
        return;
      }
  
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert('Failed to register');
      }
    });
  });