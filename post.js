// in your other file
const utils = require('./utils.js');

// Function to send a POST request
function sendPostRequest() {
    const url = 'https://sweet-panda-99d8a9.netlify.app/.netlify/functions/check_cookie';

    const cookieValue = utils.getCookie('myCookieName');

    const payload = {
        cookieValue: cookieValue 
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
window.onload = sendPostRequest;