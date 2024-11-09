document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
  
    postForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const title = document.getElementById('title').value.trim();
      const content = document.getElementById('content').value.trim();
      const author = document.getElementById('author').value.trim();
  
      if (title && content && author) {
        const response = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, author }),
        });
  
        if (response.ok) {
          alert('Blog post created successfully!');
          document.location.reload(); // Reload the page to show the new blog post
        } else {
          const errorData = await response.json();
          alert(`Failed to create blog post: ${errorData.message}`);
        }
      }
    });
  });