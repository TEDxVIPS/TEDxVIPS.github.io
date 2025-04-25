document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(registrationForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            console.log('Registration submitted:', formDataObj);
            
            // Show success message
            alert('Registration successful! Thank you for registering for TEDx College Conference.');
            
            // Reset form
            registrationForm.reset();
        });
    }
});
