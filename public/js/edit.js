const newEditHandler = async (event) => {
    console.log("button pressed");
    event.preventDefault();

    const title = document.querySelector('#edit-title').value.trim();
    const content = document.querySelector('#edit-content').value.trim();
    const id = document.querySelector('.edit-post-form').getAttribute('data-id');

    console.log(`${id}`);

    if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/oldposts');
        } else {
            alert('Failed to create blog post.');
        }
    }
};
  
  document
    .querySelector('.edit-post-form')
    .addEventListener('submit', newEditHandler);