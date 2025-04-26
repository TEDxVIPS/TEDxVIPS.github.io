document.addEventListener('DOMContentLoaded', function() {
    // Load all components in one page
    const componentPath = 'components/';
    
    // Core structure components
    loadComponent('header', componentPath);
    loadComponent('hero', componentPath);
    loadComponent('footer', componentPath);
    
    // Content sections
    loadComponent('about', componentPath);
    loadComponent('speakers', componentPath);
    loadComponent('sponsors', componentPath); // Add this line
    loadComponent('quotes', componentPath);
    loadComponent('register', componentPath);
});

function loadComponent(componentName, basePath) {
    const componentElement = document.getElementById(componentName);
    if (componentElement) {
        fetch(`${basePath}${componentName}.html`)
            .then(response => response.text())
            .then(data => {
                componentElement.innerHTML = data;
                // Trigger any scripts that need to run after the component loads
                const event = new CustomEvent(`${componentName}Loaded`);
                document.dispatchEvent(event);
            })
            .catch(error => console.error(`Error loading ${componentName} component:`, error));
    }
}