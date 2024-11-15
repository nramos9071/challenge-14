const deleteUser = async () => {
    const response = await fetch('/api/users/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/'); // Redirect to the homepage or another page
    } else {
      alert('Failed to delete user.');
    }
  };
  
  document.querySelector('#delete-link').addEventListener('click', deleteUser);