const loginHandler = async (event) => {
//prevent default behavior when login form is submitted
    event.preventDefault();

    // gather inputs from user
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {

        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Login failed.')
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginHandler);