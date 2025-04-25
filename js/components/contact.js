// This file contains JavaScript for the contact section, managing form submissions or interactions.

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    emailjs.init("YOUR_USER_ID");
    
    // Form submission handler
    const contactForm = document.getElementById('contact-form');
    const messageContainer = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get the submit button and show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const submitBtnText = submitBtn.querySelector('span');
            const submitBtnIcon = submitBtn.querySelector('i');
            
            // Update button to loading state
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Sending...';
            submitBtnIcon.className = 'fas fa-spinner fa-spin';
            
            // Prepare data for EmailJS
            const templateParams = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                subject: contactForm.subject ? contactForm.subject.value : 'Contact Form Message',
                message: contactForm.message.value
            };
            
            // Send email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully!', response.status, response.text);
                    showMessage('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('Failed to send email:', error);
                    showMessage('Unable to send your message. Please try again later.', 'error');
                })
                .finally(function() {
                    // Restore button to original state
                    submitBtn.disabled = false;
                    submitBtnText.textContent = 'Send Message';
                    submitBtnIcon.className = 'fas fa-paper-plane';
                });
        });
    }
    
    // Helper function to show status messages
    function showMessage(message, type) {
        if (!messageContainer) return;
        
        messageContainer.textContent = message;
        messageContainer.className = `form-message ${type}`;
        messageContainer.style.display = 'block';
        
        // Add subtle animation
        messageContainer.style.animation = 'fadeIn 0.5s';
        
        // Automatically hide after 6 seconds
        setTimeout(() => {
            messageContainer.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => {
                messageContainer.style.display = 'none';
            }, 500);
        }, 6000);
    }
    
    // Add input focus effects
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        const label = input.previousElementSibling;
        
        // Add animation when input is focused
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        // Remove animation when input loses focus
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});