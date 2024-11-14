document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('comment-form');

  commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const content = document.getElementById('comment-content').value.trim();
    const blogId = window.location.pathname.split('/').pop();

    if (content) {
      try {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, blog_id: blogId }),
        });

        if (response.ok) {
          const newComment = await response.json();
          const commentList = document.getElementById('comments-list');
          if (commentList) {
            const newCommentElement = document.createElement('li');
            newCommentElement.innerHTML = `<p><strong>${newComment.user.username}:</strong> ${newComment.content}</p><p>Date: ${newComment.date_created}</p>`;
            commentList.appendChild(newCommentElement);
            document.getElementById('comment-content').value = ''; // Clear the textarea
          } else {
            console.error('Error: comments-list element not found');
          }
        } else {
          const errorData = await response.json();
          alert(`Failed to post comment: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to post comment due to a network error.');
      }
    } else {
      alert('Please enter a comment.');
    }
  });
});