// document.addEventListener('alpine:init', () => {
//     Alpine.data('checklistComponent', (day) => ({
//         day: day,
//         items: [],
//         newItemindex: '',
//         addItem() {
//             if (this.newItemindex.trim() === '') {
//                 alert('Please enter the item index.');
//                 return;
//             }
    
//             this.items.push({ index: this.newItemindex });
//             this.newItemindex = ''; // clear the input field after adding the item
//         },
//     }));  
// });
// Now you can use getToDoListItems function here


function weekDays() {
    
    return {
        days: [
            {index: 1, day: 'Monday'},

            {index: 2, day: 'Tuesday'},

            {index: 3, day: 'Wednesday'},

            {index: 4, day: 'Thursday'},

            {index: 5, day: 'Friday'},

            {index: 6, day: 'Saturday'},

            {index: 7, day: 'Sunday'},
        ]
    };
}




    

