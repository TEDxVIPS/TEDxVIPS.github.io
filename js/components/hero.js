document.addEventListener('DOMContentLoaded', () => {
    console.log('Hero section initializing...');
    
    // Check if the hero element exists
    const heroContainer = document.querySelector('.hero');
    if (!heroContainer) return;
    
    // Initialize the video element
    initializeHeroVideo(heroContainer);
});

// Custom event listener for when the hero section is dynamically loaded
document.addEventListener('heroLoaded', () => {
    console.log('Hero loaded event triggered');
    const heroContainer = document.querySelector('.hero');
    if (heroContainer) {
        initializeHeroVideo(heroContainer);
    }
});

function initializeHeroVideo(heroContainer) {
    console.log('Initializing hero video');
    let videoElement = heroContainer.querySelector('video');
    
    if (!videoElement) {
        console.log('No video element found, creating one');
        videoElement = document.createElement('video');
        heroContainer.prepend(videoElement);
    }
    
    // Set video attributes
    videoElement.muted = true;
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.playsInline = true;
    videoElement.classList.add('hero-video');
    
    // Set poster image for initial display
    if (!videoElement.poster) {
        videoElement.poster = 'assets/images/hero-poster.jpg';
    }
    
    // Get source element
    let sourceElement = videoElement.querySelector('source');
    if (!sourceElement) {
        sourceElement = document.createElement('source');
        videoElement.appendChild(sourceElement);
    }
    
    // Get video path based on viewport size
    const videoPath = window.innerWidth <= 768 ? 
        'assets/video/hero-mobile.mp4' : 'assets/video/hero.mp4';
        
    // Set the actual source (from data-src if it exists)
    const existingDataSrc = sourceElement.getAttribute('data-src');
    sourceElement.src = existingDataSrc || videoPath;
    sourceElement.type = 'video/mp4';
    
    // Remove data-src to prevent double loading
    if (existingDataSrc) {
        sourceElement.removeAttribute('data-src');
    }
    
    // Make sure the video is explicitly visible
    videoElement.style.display = 'block';
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.objectFit = 'cover';
    
    // Load and play the video
    videoElement.load();
    
    // Track video progress
    videoElement.addEventListener('loadeddata', () => {
        console.log('Hero video loaded successfully');
        videoElement.play()
            .then(() => {
                console.log('Hero video playing');
                videoElement.setAttribute('data-loaded', 'true');
            })
            .catch(error => {
                console.error('Error playing video:', error);
            });
    });
    
    // Log any errors
    videoElement.addEventListener('error', (e) => {
        console.error('Video error:', e);
    });
}