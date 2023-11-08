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
    document.cookie = name + "=" + (value || "")  + expires + ";path=/";
}

async function sendPostRequest() {
    const url = 'https://sweet-panda-99d8a9.netlify.app/.netlify/functions/check_cookie';
    const cookieValue = getCookie('myCookieName');
    const payload = { cookieValue: cookieValue };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.status === 201) {
            const data = await response.json();
            setCookie('myCookieName', data.cookieValue, 365);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

window.onload = sendPostRequest;

//Edit, update, delete Handler here