document.addEventListener('DOMContentLoaded', function() {
    console.log("Header script loaded");
    initHeader();
});

document.addEventListener('headerLoaded', function() {
    console.log("Header loaded event triggered");
    initHeader();
});

function initHeader() {
    // Create the overlay element if it doesn't exist yet
    if (!document.querySelector('.nav-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }
    
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.querySelector('.nav-overlay');
    
    if (!navToggle || !mainNav || !overlay) {
        console.error("Required navigation elements not found");
        return;
    }

    // --- Add Link Adjustment Logic ---
    const currentPagePath = window.location.pathname;
    // More robust check for main page (handles root, index.html, or empty path)
    const isMainPage = currentPagePath === '/' || currentPagePath.endsWith('/index.html') || currentPagePath.split('/').pop() === '';

    if (!isMainPage) {
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Update links pointing to page sections (#about, #speakers, etc.)
            if (href && href.startsWith('#')) {
                link.setAttribute('href', `../index.html${href}`);
            }
        });
        // Also update the Register button if it's a link to a section
        const registerBtn = mainNav.querySelector('.register-btn');
        if (registerBtn) {
            const regHref = registerBtn.getAttribute('href');
             if (regHref && regHref.startsWith('#')) {
                registerBtn.setAttribute('href', `../index.html${regHref}`);
            }
        }
        // Update the logo link to point to the main index page
        const logoLink = document.querySelector('.logo a');
        if (logoLink) {
            logoLink.setAttribute('href', '../index.html');
        }
    }
    // --- End Link Adjustment Logic ---
    
    // Toggle mobile navigation
    navToggle.addEventListener('click', function() {
        console.log("Nav toggle clicked");
        if (mainNav.classList.contains('active')) {
            closeNav();
        } else {
            openNav();
        }
    });
    
    // Close nav when clicking overlay
    overlay.addEventListener('click', function() {
        closeNav();
    });
    
    // Close nav with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            closeNav();
        }
    });
    
    // Close menu when clicking nav links & handle cross-page scrolling
    const allNavLinks = document.querySelectorAll('.nav-link'); // Use a different variable name
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = link.getAttribute('href');
            const isSectionLink = href && href.includes('#');

            // Always close nav if it's active (for mobile)
            if (mainNav.classList.contains('active')) {
                closeNav();
            }

            // Handle navigation from non-main pages to sections on the main page
            if (!isMainPage && isSectionLink && href.startsWith('../index.html#')) {
                event.preventDefault(); // Stop default navigation
                const hash = href.substring(href.indexOf('#')); // Get #section
                sessionStorage.setItem('scrollToSection', hash); // Store hash
                window.location.href = '../index.html'; // Navigate to main page
            }
            // Allow default behavior for other links (external, non-section, or already on main page)
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    function openNav() {
        console.log("Opening navigation");
        navToggle.classList.add('active');
        mainNav.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('nav-open');
    }
    
    function closeNav() {
        console.log("Closing navigation");
        navToggle.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
    
    // Setup active nav links based on sections in view (Only run on main page)
    if (isMainPage) {
        setupActiveNavLinks();
        // Check session storage for scroll target after page load
        handleScrollToSection();
    } else {
        // Optionally remove 'active' class from all links if not on main page
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        // Maybe highlight 'Home' if needed, or leave none active
    }
}

// Function to handle scrolling after navigating back to the main page
function handleScrollToSection() {
    const sectionHash = sessionStorage.getItem('scrollToSection');
    if (sectionHash) {
        sessionStorage.removeItem('scrollToSection'); // Clear the stored hash
        // Use setTimeout to ensure the DOM is fully ready, especially dynamic content
        setTimeout(() => {
            const targetElement = document.querySelector(sectionHash);
            if (targetElement) {
                // Adjust scroll position to account for fixed header height and add extra offset
                const headerOffset = document.querySelector('.header')?.offsetHeight || 70; // Get header height or use default
                const additionalOffset = 30; // Pixels to scroll further down past the element top
                const elementPosition = targetElement.getBoundingClientRect().top;
                // Subtract headerOffset to clear the header, add additionalOffset to scroll further down
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset + additionalOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                console.log(`Scrolled to ${sectionHash} with additional offset`);
            } else {
                console.warn(`Target element ${sectionHash} not found for scrolling.`);
            }
        }, 300); // Adjust delay if necessary (e.g., if components load slowly)
    }
}

function setupActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return; // Exit if no sections/links

    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        const headerOffset = document.querySelector('.header')?.offsetHeight || 70; // Get header height
        let activeSectionFound = false;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            // Adjust sectionTop calculation to account for header height
            const sectionTop = section.offsetTop - headerOffset - 20; // Added a small buffer
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // Check if the link's href ends with the sectionId (more robust)
                    if (link.getAttribute('href') && link.getAttribute('href').endsWith(`#${sectionId}`)) {
                        link.classList.add('active');
                        activeSectionFound = true;
                    }
                });
            }
        });

        // If no section is active (e.g., at the very top or bottom), maybe deactivate all or activate 'Home'
        if (!activeSectionFound) {
             navLinks.forEach(link => link.classList.remove('active'));
             // Optionally activate 'Home' if at the top
             if (scrollY < sections[0].offsetTop - headerOffset - 20) {
                 const homeLink = document.querySelector('.nav-link[href$="#hero"]');
                 if (homeLink) homeLink.classList.add('active');
             }
        }
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Initial highlight
    highlightNavLink();
}

// Ensure initHeader runs even if loaded after DOMContentLoaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Check if header is already in the DOM (e.g., on static pages)
    if (document.getElementById('nav-toggle')) {
        initHeader();
    }
}