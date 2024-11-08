document.addEventListener('DOMContentLoaded', () => {
    const updateBioForm = document.getElementById('update-bio-form');
  
    updateBioForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const bio = document.getElementById('bio').value.trim();
      const userId = document.getElementById('user-id').value; // Assuming you have a hidden input with the user ID
  
      if (bio) {
        const response = await fetch(`/api/users/profile/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bio }),
        });
  
        if (response.ok) {
          alert('Bio updated successfully!');
          document.location.replace(`/api/users/profile/${userId}`);
        } else {
          const errorData = await response.json();
          alert(`Failed to update bio: ${errorData.message}`);
        }
      }
    });
  });