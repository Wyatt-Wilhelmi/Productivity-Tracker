// in your other file
import { getCookie } from './utils.js';

// Function to send a POST request
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function sendPostRequest() {
    const url = 'https://sweet-panda-99d8a9.netlify.app/.netlify/functions/check_cookie';

    let cookieValue = getCookie('myCookieName');

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
        if (data.message === "New user created") {
            setCookie('myCookieName', data.cookieValue, 365); // Set the new cookie on the client side
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

window.onload = sendPostRequest;