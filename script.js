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

    
});

    

