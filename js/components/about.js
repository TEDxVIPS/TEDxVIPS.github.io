document.addEventListener('DOMContentLoaded', () => {
    // Initialize about section functionality
    const playButton = document.getElementById('playButton');
    const aboutVideo = document.getElementById('aboutVideo');
    
    if(playButton && aboutVideo) {
        // Setup video playback
        setupVideoPlayback(playButton, aboutVideo);
    } else {
        // Try again when the about content is dynamically loaded
        document.addEventListener('aboutLoaded', () => {
            const playBtn = document.getElementById('playButton');
            const video = document.getElementById('aboutVideo');
            if(playBtn && video) {
                setupVideoPlayback(playBtn, video);
            }
        });
    }
});

function setupVideoPlayback(playButton, video) {
    // Preload video metadata but don't start loading video content until play is clicked
    video.preload = 'metadata';
    
    // Track fullscreen state
    let isFullscreen = false;
    
    // Enable native controls for better fullscreen experience
    video.controls = true;
    
    // Initially hide native controls until playing starts
    video.style.controlsList = "nodownload";
    
    // Monitor fullscreen changes
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    function handleFullscreenChange() {
        isFullscreen = !!document.fullscreenElement || 
                      !!document.webkitFullscreenElement || 
                      !!document.mozFullScreenElement || 
                      !!document.msFullscreenElement;
        
        if (isFullscreen) {
            // In fullscreen mode, ensure controls are visible and our custom play button is hidden
            video.controls = true;
            playButton.style.display = 'none';
        } else {
            // When exiting fullscreen
            if (video.paused) {
                playButton.style.display = 'flex';
            } else {
                playButton.style.display = 'none';
            }
        }
    }
    
    // Custom play button functionality
    playButton.addEventListener('click', () => {
        playVideo();
    });
    
    // Double-click on video to toggle fullscreen
    video.addEventListener('dblclick', toggleFullScreen);
    
    function playVideo() {
        video.play()
            .then(() => {
                // Hide custom play button when video starts playing
                playButton.style.display = 'none';
                video.classList.add('playing');
            })
            .catch(error => {
                console.error('Error playing video:', error);
            });
    }
    
    function toggleFullScreen() {
        if (!isFullscreen) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    
    // When video is paused (but not ended)
    video.addEventListener('pause', () => {
        if (!video.ended && !isFullscreen) {
            playButton.style.display = 'flex';
            video.classList.remove('playing');
        }
    });
    
    // When video ends
    video.addEventListener('ended', () => {
        // Only show custom play button when not in fullscreen
        if (!isFullscreen) {
            playButton.style.display = 'flex';
        }
        video.classList.remove('playing');
    });
}
