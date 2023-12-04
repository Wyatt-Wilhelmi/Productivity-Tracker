// in your other file
import {Person} from './utils.js';
import { ToDoListItems } from './utils.js';

let newPerson = new Person();
let newToDoListItems = [];
const checklistMap = {};
// let buttonMap = {};
let newItemID = 0;

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

//https://sweet-panda-99d8a9.netlify.app
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
// https://sweet-panda-99d8a9.netlify.app http://localhost:8888
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

        const data = await response.json();

        newItemID = data.id;
        console.log(newItemID);

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

async function deletingDatabaseItems(payload){
    const url = 'https://sweet-panda-99d8a9.netlify.app/.netlify/functions/delete_db_item';

    try {
        const response = await postFetch(url, payload);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

let newButtonCount = 1;

function createButtonContainer(day, itemID, textLabel) {
    let buttonList = [];

    const containerDiv = document.createElement('div');
    containerDiv.className = 'button-container mx-1 max-w-fit dark:bg-gray-900 bg-stone-200 rounded-md';
    containerDiv.id = itemID;

    // Add the buttons as in your example

    
    // Button 1
    const button1 = document.createElement('button');
    button1.id = 'editButton' + newButtonCount;
    button1.className = 'p-2 m-0 hover:bg-gray-900 dark:hover:bg-stone-200 dark:hover:text-black dark:text-white hover:text-white text-black rounded-l-md';
    button1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>`;

    button1.addEventListener('click', function(event){
        const editInputBox = document.getElementById('editInputBox' + day);
        editInputBox.value =  textLabel.textContent;

        const editInputSection = document.getElementById('editInputSection' + day);

        const editSubmitButton = document.getElementById('editSubmitInput' + day);

        button1.addEventListener('keyup', function(event){
            if(event.key === 'Escape'){
                if(editInputSection){
                    editInputSection.classList.toggle('flex');
                    editInputSection.classList.toggle('hidden');
                }
        
                editInputBox.value = '';
            }
            
        })

        if(editInputSection){
            editInputSection.classList.toggle('hidden');
            editInputSection.classList.toggle('flex');
        }

        if (editInputBox) {
            editInputBox.addEventListener('keyup', function(event) {           
                // Your event handling logic here
                if(event.key === 'Escape'){
                    if(editInputSection){
                        editInputSection.classList.toggle('flex');
                        editInputSection.classList.toggle('hidden');
                    }

                    editInputBox.value = '';
                }
                if(event.key === 'Enter'){

                    if(editInputSection){
                        editInputSection.classList.toggle('flex');
                        editInputSection.classList.toggle('hidden');
                    }
                    
                    textLabel.textContent = editInputBox.value;
                    let listItemId = itemID;

                    const payload = {
                        updateDatabaseItem: {
                            'listItemId': listItemId,
                            'target': "text",
                            'value': editInputBox.value,
                        }
                    }

                    handleUpdatingDatabaseItems(payload);


                editInputBox.value = '';
                    
                }
            });
        }

        if(editSubmitButton){
            editSubmitButton.addEventListener('click', function(event) {

                if(editInputSection){
                    editInputSection.classList.toggle('flex');
                    editInputSection.classList.toggle('hidden');
                }

                if(editInputSection){
                    editInputSection.classList.toggle('flex');
                    editInputSection.classList.toggle('hidden');
                }
                
                textLabel.textContent = editInputBox.value;
                let listItemId = itemID;

                const payload = {
                    updateDatabaseItem: {
                        'listItemId': listItemId,
                        'target': "text",
                        'value': editInputBox.value,
                    }
                }

                handleUpdatingDatabaseItems(payload);


            editInputBox.value = '';
                
            });
        } 
        
    })

    
    // Set the attributes and innerHTML for button1 as in your example
    // ...

    // Button 2
    const button2 = document.createElement('button');
    button2.id = 'deleteButton' + newButtonCount;
    button2.className = 'p-2 m-0 hover:bg-gray-900 dark:hover:bg-stone-200 dark:hover:text-black dark:text-white hover:text-white text-black rounded-r-md';
    button2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>`;

    button2.addEventListener('click', function(event){
        let listItemId = itemID;
        let parentDiv = textLabel.closest('div');

        const payload = {
            updateDatabaseItem: {
                'listItemId': listItemId
            }
        }

        deletingDatabaseItems(payload);

        parentDiv.remove();
    });

    newButtonCount++;

    buttonList.push(button1.id, button2.id);

    containerDiv.appendChild(button1);
    containerDiv.appendChild(button2);

    return containerDiv;
}

// function isMobileDevice() {
//     if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
//         // true for mobile device
//         return true;
//       }else{
//         // false for not mobile device
//         return false;
//       }
// }

function populateToDoListItems(){

    for (const item of newToDoListItems) {
        // Create the main wrapper div
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'checkbox-wrapper-52 hover:bg-gray-50 hover:dark:bg-gray-600 pl-2 rounded-md';
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

        const buttonContainer = createButtonContainer(item.day,item._id,textLabel);

        // if (isMobileDevice()) {
        //     let timer;
        //     let buttonContainerDiv = document.getElementById(item._id);
    
        //     wrapperDiv.addEventListener('touchstart', (e) => {
        //         e.preventDefault(); // Prevents additional events like click
        //         // Start a timer
        //         timer = setTimeout(() => {
        //             // Action to be performed after holding for specified time
        //             buttonContainerDiv.className.toggle('block');
        //         }, 1000); // 2000 milliseconds = 2 seconds
        //     });
    
        //     wrapperDiv.addEventListener('touchend', () => {
        //         // Clear the timer if the touch is released
        //         clearTimeout(timer);
        //     });
        // }
        wrapperDiv.appendChild(buttonContainer);

        // Append the wrapper div to the correct day list
            if (!checklistMap[item.day]) {
                checklistMap[item.day] = document.createElement('div');
                checklistMap[item.day].className = 'flex flex-col';
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
            addItemButton.addEventListener('keyup', function(event) {
                // Your event handling logic here
                if(event.key === 'Escape'){
                    addItemPlus.classList.toggle('hidden');
                    addItemCancel.classList.toggle('hidden');               

                if (inputSection) {
                    inputSection.classList.toggle('hidden');
                    inputSection.classList.toggle('flex');
                }
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
            inputBox.addEventListener('keyup', async function(event) {           
                // Your event handling logic here
                if(event.key === 'Escape'){
                    if(inputSection){
                        inputSection.classList.toggle('flex');
                        inputSection.classList.toggle('hidden');
                    }

                    inputSection.value = '';
                }

                if(event.key === 'Enter'){

                addItemPlus.classList.toggle('hidden');
                addItemCancel.classList.toggle('hidden');

                    if(inputSection){
                        inputSection.classList.toggle('flex');
                        inputSection.classList.toggle('hidden');
                    }

                const inputValue = inputBox.value;
                
                const payload = {
                    newDatabaseItem: {
                        text: inputValue,
                        day: day, 
                        userID: newPerson.getPersonUserID
                    }
                }

                await addingDatabaseItems(payload);

                const wrapperDiv = document.createElement('div');
                wrapperDiv.className = 'checkbox-wrapper-52 self-start w-auto';
    
                // Create the label that wraps everything
                const itemLabel = document.createElement('label');
                itemLabel.className = 'item';
    
                // Create the hidden checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                 // Assuming each item has a unique ID
                checkbox.className = 'hidden';
    
                // Create the custom checkbox
                const customCheckboxLabel = document.createElement('label');
                
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
                
                textLabel.className = 'cbx-lbl';
                textLabel.textContent = inputValue;
    
                // Append elements to item label
                itemLabel.appendChild(checkbox);
                itemLabel.appendChild(customCheckboxLabel);
                itemLabel.appendChild(textLabel);
    
                // Append item label to wrapper div
                wrapperDiv.appendChild(itemLabel);

                checkbox.id = `todo-${newItemID}`
                customCheckboxLabel.htmlFor = `todo-${newItemID}`;
                textLabel.htmlFor = `todo-${newItemID}`;

                const buttonContainer = createButtonContainer(day,newItemID,textLabel);
                wrapperDiv.appendChild(buttonContainer);

                    if(!checklistMap[day]){
                        checklistMap[day] = document.createElement('div');
                        checklistMap[day].className = 'flex flex-col'

                        const container = document.getElementById('day' + day);
                        container.appendChild(checklistMap[day]);    
                    }

                    if(checklistMap[day]){
                        checklistMap[day].appendChild(wrapperDiv);
                    }

                

                inputBox.value = '';
                    
                }
            });
        }

        if(submitButton){
            submitButton.addEventListener('click', async function(event) {

                addItemPlus.classList.toggle('hidden');
                addItemCancel.classList.toggle('hidden');

                    if(inputSection){
                        inputSection.classList.toggle('flex');
                        inputSection.classList.toggle('hidden');
                    }

                const inputValue = inputBox.value;
                
                const payload = {
                    newDatabaseItem: {
                        text: inputValue,
                        day: day, 
                        userID: newPerson.getPersonUserID
                    }
                }

                await addingDatabaseItems(payload);

                const wrapperDiv = document.createElement('div');
                wrapperDiv.className = 'checkbox-wrapper-52 self-start w-auto';
    
                // Create the label that wraps everything
                const itemLabel = document.createElement('label');
                itemLabel.className = 'item';
    
                // Create the hidden checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                 // Assuming each item has a unique ID
                checkbox.className = 'hidden';
    
                // Create the custom checkbox
                const customCheckboxLabel = document.createElement('label');
                
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
                
                textLabel.className = 'cbx-lbl';
                textLabel.textContent = inputValue;
    
                // Append elements to item label
                itemLabel.appendChild(checkbox);
                itemLabel.appendChild(customCheckboxLabel);
                itemLabel.appendChild(textLabel);
    
                // Append item label to wrapper div
                wrapperDiv.appendChild(itemLabel);

                checkbox.id = `todo-${newItemID}`
                customCheckboxLabel.htmlFor = `todo-${newItemID}`;
                textLabel.htmlFor = `todo-${newItemID}`;

                const buttonContainer = createButtonContainer(day,newItemID,textLabel);
                wrapperDiv.appendChild(buttonContainer);

                    if(!checklistMap[day]){
                        checklistMap[day] = document.createElement('div');
                        checklistMap[day].className = 'flex flex-col'

                        const container = document.getElementById('day' + day);
                        container.appendChild(checklistMap[day]);    
                    }

                    if(checklistMap[day]){
                        checklistMap[day].appendChild(wrapperDiv);
                    }

                

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