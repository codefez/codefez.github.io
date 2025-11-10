// JavaScript to open a modal based on the URL hash fragment
document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the hash fragment (e.g., '#defensive-design-modal')
    const hashId = window.location.hash;

    // 2. Check if a hash exists and is longer than just '#'
    if (hashId && hashId.length > 1) {
        // 3. Find the element (the modal container) with that ID
        const modal = document.querySelector(hashId);

        if (modal) {
            // 4. Open the modal.
            // NOTE: You might need to adjust this line based on your existing modal's CSS/JS logic.
            // If your modals use a specific class to be visible (e.g., 'is-open'), change the line below:
            
            // Example for simple display change:
            modal.style.display = 'block';
            
            // Example if you use classes (e.g., removing a 'hidden' class):
            // modal.classList.remove('hidden');
            
            // Focus on the modal for accessibility
            modal.setAttribute('tabindex', '-1');
            modal.focus();

            console.log(`Successfully opened modal with ID: ${hashId}`);
        } else {
            console.log(`No modal found for ID: ${hashId}`);
        }
    }
});