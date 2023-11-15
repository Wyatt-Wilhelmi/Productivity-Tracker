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

        console.log(newToDoListItems);

        const checklistMap = {};

        for (const item of newToDoListItems) {
            // Create the main wrapper div
            const wrapperDiv = document.createElement('div');
            wrapperDiv.className = 'checkbox-wrapper-52';

            // Create the label that wraps everything
            const itemLabel = document.createElement('label');
            itemLabel.className = 'item';

            // Create the hidden checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `todo-${item._id}`; // Assuming each item has a unique ID
            checkbox.className = 'hidden';
            checkbox.checked = item.completed;

            // Create the custom checkbox
            const customCheckboxLabel = document.createElement('label');
            customCheckboxLabel.htmlFor = `todo-${item._id}`;
            customCheckboxLabel.className = 'cbx';

            // Create the SVG for the custom checkbox
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '14px');
            svg.setAttribute('height', '12px');
            svg.setAttribute('viewBox', '0 0 14 12');
            const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            polyline.setAttribute('points', '1 7.6 5 11 13 1');
            svg.appendChild(polyline);

            // Append the SVG to the custom checkbox label
            customCheckboxLabel.appendChild(svg);

            // Create the text label
            const textLabel = document.createElement('label');
            textLabel.htmlFor = `todo-${item._id}`;
            textLabel.className = 'cbx-lbl';
            textLabel.textContent = item.text;

            // Append elements to item label
            itemLabel.appendChild(checkbox);
            itemLabel.appendChild(customCheckboxLabel);
            itemLabel.appendChild(textLabel);

            // Append item label to wrapper div
            wrapperDiv.appendChild(itemLabel);

            // Append the wrapper div to the correct day list
        if (!checklistMap[item.day]) {
            checklistMap[item.day] = document.createElement('ul');
        }
        checklistMap[item.day].appendChild(wrapperDiv);
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

function initializePage(){
    userAuthentication().then(() => 
    requestDatabaseItems())
}

initializePage();

//Edit, update, delete Handler here