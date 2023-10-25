function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

// Function to set a cookie with a very long expiration time
function setCookie(name, value) {
    const TEN_YEARS_IN_SECONDS = 10 * 365 * 24 * 60 * 60;
    let date = new Date();
    date.setTime(date.getTime() + TEN_YEARS_IN_SECONDS * 1000);
    let expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to send a POST request
function sendPostRequest() {
    const url = 'https://sweet-panda-99d8a9.netlify.app/.netlify/functions/check_cookie'; // Replace with your function's endpoint

    let cookieValue = getCookie('myCookieName'); // Replace 'myCookieName' with your cookie's name

    if (!cookieValue) {
        cookieValue = self.crypto.randomUUID(); // Generate a new unique cookie value
        setCookie('myCookieName', cookieValue);
    }

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

// Call the function when the page loads
window.onload = sendPostRequest;