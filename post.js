// in your other file
import {Person} from './utils.js';
let newPerson = new Person();


function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

// Function to send a POST request
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + ";secure;path=/";
}

function postFetch(url, payload = {}){
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    return response;
}



async function userAuthentication() {
    const url = 'https://sweet-panda-99d8a9.netlify.app/.netlify/functions/check_cookie';
    const cookieValue = getCookie('myCookieName');
    const payload = { cookieValue: cookieValue };

    try {
        const response = await postFetch(url, payload);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        newPerson.setPersonUserID = data.userID;

        if (response.status === 201) {
            setCookie('myCookieName', data.cookieValue, 365);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

async function requestDatabaseItems(){
    const url = 'https://sweet-panda-99d8a9.netlify.app/.netlify/functions/database_items';
    const payload = { userID: newPerson.getPersonUserID };

    try {
        const response = await postFetch(url, payload);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        const data = await response.json();

        let newToDoListItems = data.toDoList;

        if (!data.toDoList) {
            return; 
        }

        const checklistMap = {};

    for (const item of newToDoListItems) {
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;
      const label = document.createElement('label');
      label.textContent = item.text;
      listItem.appendChild(checkbox);
      listItem.appendChild(label);

      if (!checklistMap[item.day]) {
        checklistMap[item.day] = document.createElement('ul');
      }
      checklistMap[item.day].appendChild(listItem);
    }

    // Append checklists to respective containers
    for (const day in checklistMap) {
      const container = document.getElementById('day' + day);
      container.appendChild(checklistMap[day]);
    }
    
    } catch (error) {
        console.error('Error:', error);
    }
}

async function populateToDoListText(day){
    
}

function initializePage(){
    userAuthentication().then(() => 
    requestDatabaseItems())
}

window.addEventListener('DOMContentLoaded', (event) => {
    initializePage();
});


//Edit, update, delete Handler here