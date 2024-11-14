document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('post-form');

  postForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const username = document.getElementById('username').value.trim(); // Retrieve the username
    const user_id = document.getElementById('user_id').value.trim(); // Retrieve the user_id

    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Username:', username);
    console.log('User ID:', user_id);

    if (title && content && username && user_id) {
      try {
        const response = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, username, user_id }),
        });

        if (response.ok) {
          alert('Blog post created successfully!');
          document.location.reload(); // Reload the page to show the new blog post
        } else {
          const errorData = await response.json();
          console.error('Error Data:', errorData); // Log the error data
          alert(`Failed to create blog post: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to create blog post due to a network error.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  });
});