const logout = async () => {
    // Destroy session on back end when user logs out
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // Redirect to login page
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

const logpage = () => {

    alert("button works!");
    document.location.replace('/login');

};

document.querySelector('#logout').addEventListener('click', logout);
document.querySelector('#login').addEventListener('click', logpage);