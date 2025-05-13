document.addEventListener('DOMContentLoaded', () => {
    // Function to initialize all about section features
    function initializeAboutSection() {
        // Video Modal Functionality
        const imagePlayBtn = document.getElementById('imagePlayButton');
        const closeModalBtn = document.getElementById('closeVideoModalBtn');
        const videoModal = document.getElementById('videoModal');
        const aboutVideo = document.getElementById('aboutVideo');

        if (imagePlayBtn && closeModalBtn && videoModal && aboutVideo) {
            imagePlayBtn.addEventListener('click', () => {
                videoModal.style.display = 'flex'; // Show modal
                setTimeout(() => videoModal.classList.add('active'), 10); // Trigger transition
            });

            closeModalBtn.addEventListener('click', () => {
                videoModal.classList.remove('active');
                setTimeout(() => videoModal.style.display = 'none', 300); // Hide after transition
                aboutVideo.pause();
                aboutVideo.classList.remove('playing');
            });

            videoModal.addEventListener('click', (event) => {
                if (event.target === videoModal) {
                    closeModalBtn.click();
                }
            });
            
            // Configure video element directly
            if (aboutVideo) {
                aboutVideo.preload = 'metadata';
                aboutVideo.controls = true; // Ensure native controls are enabled
            }
        }
    }

    // Check if about content is already loaded or wait for event
    if (document.getElementById('imagePlayButton')) { 
        initializeAboutSection();
    } else {
        document.addEventListener('aboutLoaded', initializeAboutSection);
    }
});
