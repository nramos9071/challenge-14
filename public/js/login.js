const loginHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  console.log('Login attempt with username:', username); // Add logging

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/'); // Redirect to the homepage
    } else {
      const errorData = await response.json();
      alert(`Failed to log in: ${errorData.message}`);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', loginHandler);
  }

  const signupButton = document.querySelector('#signup-button');
  if (signupButton) {
    signupButton.addEventListener('click', () => {
      document.location.replace('/register');
    });
  }
});