const editPostHandler = async (event) => {
    event.preventDefault();


    const title = document.querySelector('#edit-title').value.trim();
    const content = document.querySelector('#edit-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to create blog post.');
    }
}

};
  
  document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editPostHandler);