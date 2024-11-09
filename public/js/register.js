document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('#register-form');
  registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = document.querySelector('#username').value.trim();
      const password = document.querySelector('#password').value.trim();
      const password2 = document.querySelector('#password2').value.trim();

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
          const errorData = await response.json();
          alert(`Failed to register: ${errorData.message}`);
      }
  });
});