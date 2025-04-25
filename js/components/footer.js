document.addEventListener('footerLoaded', () => {
    // Update the year dynamically once the footer HTML is loaded
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Add smooth hover effects to social links (targeting the SVG links)
    const socialLinks = document.querySelectorAll('.footer-bottom .social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'all 0.3s ease';
        });
    });
});

// Ensure the event listener is added after the main DOM content is loaded
// This is a fallback in case the custom event fires before this script runs
document.addEventListener('DOMContentLoaded', () => {
    // Check if the footer content is already loaded (e.g., if main.js ran first)
    const yearSpan = document.getElementById('current-year');
    if (yearSpan && !yearSpan.textContent) {
        yearSpan.textContent = new Date().getFullYear();
    }
});