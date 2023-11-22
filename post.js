// in your other file
import {Person} from './utils.js';
import { ToDoListItems } from './utils.js';

let newPerson = new Person();

let newToDoListItems = [];
const checklistMap = {};

function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

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
    const url ='https://sweet-panda-99d8a9.netlify.app/.netlify/functions/check_cookie';
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
// https://sweet-panda-99d8a9.netlify.app
async function requestDatabaseItems(){
    const url ='https://sweet-panda-99d8a9.netlify.app/.netlify/functions/database_items';
    const payload = { userID: newPerson.getPersonUserID };

    try {
        const response = await postFetch(url, payload);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.toDoList) {
            return; 
        }

        newToDoListItems = data.toDoList;

    } catch (error) {
        console.error('Error:', error);
    }
}

async function addingDatabaseItems(payload){
    const url = 'https://sweet-panda-99d8a9.netlify.app/.netlify/functions/create_db_item';

    try {
        const response = await postFetch(url, payload);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

async function handleUpdatingDatabaseItems(payload){
    const url = 'https://sweet-panda-99d8a9.netlify.app/.netlify/functions/update_db_item';

    try {
        const response = await postFetch(url, payload);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

function populateToDoListItems(){

    for (const item of newToDoListItems) {
        // Create the main wrapper div
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'checkbox-wrapper-52';
        // wrapperDiv.classList.add('text-xl');

        // Create the label that wraps everything
        const itemLabel = document.createElement('label');
        itemLabel.className = 'item';

        // Create the hidden checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `todo-${item._id}`; // Assuming each item has a unique ID
        checkbox.className = 'hidden';
        checkbox.checked = item.completed;

        checkbox.addEventListener('change', function(event) {
            let listItemId = item._id;
            let isChecked = !item.completed;

            const payload = {
                updateDatabaseItem: {
                    'listItemId': listItemId,
                    'target': "completed",
                    'value': isChecked
                }
            }

            handleUpdatingDatabaseItems(payload);

        });

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

}





function initializeEventListners(){
    const addItemListeners = ['addItemDay1', 'addItemDay2', 'addItemDay3', 'addItemDay4', 'addItemDay5', 'addItemDay6', 'addItemDay7'];
    const addItemPlusListeners = ['addItemPlus1', 'addItemPlus2', 'addItemPlus3', 'addItemPlus4', 'addItemPlus5', 'addItemPlus6', 'addItemPlus7'];
    const addItemCancelListener = ['addItemCancel1', 'addItemCancel2', 'addItemCancel3', 'addItemCancel4', 'addItemCancel5', 'addItemCancel6', 'addItemCancel7'];
    const inputSectionListners = ['inputSection1', 'inputSection2', 'inputSection3', 'inputSection4', 'inputSection5', 'inputSection6', 'inputSection7'];
    const inputBoxListners = ['inputBox1', 'inputBox2', 'inputBox3', 'inputBox4', 'inputBox5', 'inputBox6', 'inputBox7'];
    const submitInputListners = ['submitInput1', 'submitInput2', 'submitInput3', 'submitInput4', 'submitInput5', 'submitInput6', 'submitInput7'];
    
    let newItemCount = 0;


    for (let i = 0; i < addItemListeners.length; i++) {
        let addItemButton = document.getElementById(addItemListeners[i]);
        let addItemPlus = document.getElementById(addItemPlusListeners[i]);
        let addItemCancel = document.getElementById(addItemCancelListener[i]);
        let inputSection = document.getElementById(inputSectionListners[i]);
        if (addItemButton) {
            addItemButton.addEventListener('click', function(event) {
                // Your event handling logic here

                 addItemPlus.classList.toggle('hidden');
                 addItemCancel.classList.toggle('hidden');               

                if (inputSection) {
                    inputSection.classList.toggle('hidden');
                    inputSection.classList.toggle('flex');
                }
            });
        }
    }

    for (let i = 0; i < 7; i++) {
        let inputBox = document.getElementById(inputBoxListners[i]);
        let submitButton = document.getElementById(submitInputListners[i]);
        let inputSection = document.getElementById(inputSectionListners[i]);
        let addItemPlus = document.getElementById(addItemPlusListeners[i]);
        let addItemCancel = document.getElementById(addItemCancelListener[i]);
        let day = i + 1;

        if (inputBox) {
            inputBox.addEventListener('keyup', function(event) {           
                // Your event handling logic here
                if(event.key === 'Enter'){

                addItemPlus.classList.toggle('hidden');
                addItemCancel.classList.toggle('hidden');

                    if(inputSection){
                        inputSection.classList.toggle('flex');
                        inputSection.classList.toggle('hidden');
                    }                            
                    
                newItemCount++;

                const inputValue = inputBox.value;

                const wrapperDiv = document.createElement('div');
                wrapperDiv.className = 'checkbox-wrapper-52';
    
                // Create the label that wraps everything
                const itemLabel = document.createElement('label');
                itemLabel.className = 'item';
    
                // Create the hidden checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `todo-${newItemCount}`; // Assuming each item has a unique ID
                checkbox.className = 'hidden';
    
                // Create the custom checkbox
                const customCheckboxLabel = document.createElement('label');
                customCheckboxLabel.htmlFor = `todo-${newItemCount}`;
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
                textLabel.htmlFor = `todo-${newItemCount}`;
                textLabel.className = 'cbx-lbl';
                textLabel.textContent = inputValue;
    
                // Append elements to item label
                itemLabel.appendChild(checkbox);
                itemLabel.appendChild(customCheckboxLabel);
                itemLabel.appendChild(textLabel);
    
                // Append item label to wrapper div
                wrapperDiv.appendChild(itemLabel);

                    if(!checklistMap[day]){
                        checklistMap[day] = document.createElement('ul');

                        const container = document.getElementById('day' + day);
                        container.appendChild(checklistMap[day]);    
                    }

                    if(checklistMap[day]){
                        checklistMap[day].appendChild(wrapperDiv);
                    }

                const payload = {
                    newDatabaseItem: {
                        text: inputValue,
                        day: day, 
                        userID: newPerson.getPersonUserID
                    }
                }

                addingDatabaseItems(payload);

                inputBox.value = '';
                    
                }
            });
        }

        if(submitButton){
            submitButton.addEventListener('click', function(event) {

                addItemPlus.classList.toggle('hidden');
                addItemCancel.classList.toggle('hidden');

                if(inputSection){
                    inputSection.classList.toggle('flex');
                    inputSection.classList.toggle('hidden');
                }

                newItemCount++;

                const inputValue = inputBox.value;

                const wrapperDiv = document.createElement('div');
                wrapperDiv.className = 'checkbox-wrapper-52';

                // Create the label that wraps everything
                const itemLabel = document.createElement('label');
                itemLabel.className = 'item';

                // Create the hidden checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `todo-${newItemCount}`; // Assuming each item has a unique ID
                checkbox.className = 'hidden';

                // Create the custom checkbox
                const customCheckboxLabel = document.createElement('label');
                customCheckboxLabel.htmlFor = `todo-${newItemCount}`;
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
                textLabel.htmlFor = `todo-${newItemCount}`;
                textLabel.className = 'cbx-lbl';
                textLabel.textContent = inputValue;

                // Append elements to item label
                itemLabel.appendChild(checkbox);
                itemLabel.appendChild(customCheckboxLabel);
                itemLabel.appendChild(textLabel);

                // Append item label to wrapper div
                wrapperDiv.appendChild(itemLabel);

                if(!checklistMap[day]){
                    checklistMap[day] = document.createElement('ul');

                    const container = document.getElementById('day' + day);
                    container.appendChild(checklistMap[day]);
                }

                if(checklistMap[day]){
                    checklistMap[day].appendChild(wrapperDiv);
                }

                const payload = {
                    newDatabaseItem: {
                        text: inputValue,
                        day: day, 
                        userID: newPerson.getPersonUserID
                    }
                }

                addingDatabaseItems(payload);

                inputBox.value = '';
                
            });
        } 
    }
        if (document.readyState === "complete") {
            const targetElement1 = document.getElementById('loader');
            const targetElement2 = document.getElementById('main'); // Adjust the selector as needed
            if (targetElement1) {
                targetElement1.classList.remove('flex');
                targetElement1.classList.add('hidden');
            }
            if (targetElement2) {
                targetElement2.classList.remove('hidden');
            }
        }
    }


    


function initializePage(){
    userAuthentication().then(() => 
    requestDatabaseItems()).then(() =>
    document.addEventListener('DOMContentLoaded', populateToDoListItems(), initializeEventListners()))
}

initializePage();

//Edit, update, delete Handler here