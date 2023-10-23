document.addEventListener("DOMContentLoaded", function() {
    // Your code here
    document.getElementById('darkModeToggle').addEventListener('click', function() {
        const body = document.body;
    
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
        } else {
            body.classList.add('dark');
        }
    });

    // function addItem(checklist, itemCount) {
    //     const newItem = document.createElement('li'); // Create a new li element
    //     newItem.textContent = `Item ${itemCount + 1}`; // Add text to the new item
    //     checklist.appendChild(newItem); // Append the new item to the checklist
    // }

    // const addItemButtonMonday = document.getElementById('addItemButtonMonday');
    //     addItemButtonMonday.addEventListener('click', (event) => {
    //         event.stopPropagation(); // Prevents the click from bubbling up to parent elements

    //         const checklistMonday = document.getElementById('checklistMonday');
    //         addItem(checklistMonday, checklistMonday.children.length); // Pass the list and current item count
    //     });
    
});

document.addEventListener('alpine:init', () => {
    Alpine.data('checklistComponent', () => ({
        items: [],
        newItemText: '',
        addItem() {
            if (this.newItemText.trim() === '') {
                alert('Please enter the item text.');
                return;
            }
        
            this.items.push({ text: this.newItemText });
            this.newItemText = ''; // clear the input field after adding the item
        },
    }));
});


    

