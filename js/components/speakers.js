const speakers = [
    {
        name: "Priya Agarwal",
        title: "Digital Health Pioneer",
        bio: "Transforming healthcare accessibility through innovative technology solutions for underserved communities.",
        image: "assets/images/speakers/priya-agarwal.jpg",
        featured: false,
        topics: ["technology", "society"],
        socialLinks: {
            twitter: "https://twitter.com/priyaagarwal",
            linkedin: "https://linkedin.com/in/priyaagarwal"
        }
    },
    {
        name: "James Wilson",
        title: "Sustainable Architecture Expert",
        bio: "Creating revolutionary building designs that minimize environmental impact while maximizing functionality and beauty.",
        image: "", // Empty to use placeholder
        featured: false,
        topics: ["environment"],
        socialLinks: {
            twitter: "https://twitter.com/jameswilson",
            linkedin: "https://linkedin.com/in/jameswilson"
        }
    },
    {
        name: "Elena Rodriguez",
        title: "Quantum Computing Researcher",
        bio: "Breaking new ground in quantum computing applications that could revolutionize medicine, encryption, and artificial intelligence.",
        image: "assets/images/speakers/elena-rodriguez.jpg",
        featured: false,
        topics: ["technology"],
        socialLinks: {
            twitter: "https://twitter.com/elenarodriguez",
            linkedin: "https://linkedin.com/in/elenarodriguez"
        }
    },
    {
        name: "Aisha Khan",
        title: "Renewable Energy Advocate",
        bio: "Championing the transition to clean energy sources through policy reform and community-based initiatives.",
        image: "assets/images/speakers/aisha-khan.jpg", // Example image path
        featured: false,
        topics: ["environment", "society"],
        socialLinks: {
            linkedin: "https://linkedin.com/in/aishakhan"
        }
    },
    {
        name: "Ben Carter",
        title: "Creative Technologist",
        bio: "Exploring the intersection of art, design, and technology to create immersive and interactive experiences.",
        image: "", // Use placeholder
        featured: false,
        topics: ["technology"],
        socialLinks: {
            twitter: "https://twitter.com/bencarter",
        }
    },
    // --- New Speaker Added Below ---
    {
        name: "Dr. Lena Petrova",
        title: "Neuroscience Communicator",
        bio: "Making complex brain science accessible and engaging, exploring topics like memory, learning, and cognitive biases.",
        image: "assets/images/speakers/lena-petrova.jpg", // Example image path
        featured: false,
        topics: ["society"],
        socialLinks: {
            linkedin: "https://linkedin.com/in/lenapetrova",
            twitter: "https://twitter.com/drlenapetrova"
        }
    }
];

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('speakers-container')) {
        displaySpeakers('all');
        setupFilters();
    } else {
        document.addEventListener('speakersLoaded', () => {
            displaySpeakers('all');
            setupFilters();
        });
    }
});

function displaySpeakers(filter) {
    const speakersContainer = document.getElementById('speakers-container');
    if (!speakersContainer) return;
    
    speakersContainer.innerHTML = '';
    
    const filteredSpeakers = filter === 'all' 
        ? speakers 
        : speakers.filter(speaker => speaker.topics.includes(filter));
    
    // Default placeholder URL
    const placeholderImageUrl = 'https://i.pinimg.com/736x/22/4b/a8/224ba8c273f1b3a18eb6514b77cb10f0.jpg';
    // Special placeholder for James and Marcus
    const malePlaceholderUrl = 'https://avatars.pfptown.com/789/anime-pfp-1030.png';

    filteredSpeakers.forEach(speaker => {
        const speakerCard = document.createElement('div');
        speakerCard.className = `speaker-card ${speaker.featured ? 'featured' : ''}`;
        
        // Choose placeholder based on speaker name
        let imagePath = speaker.image;
        if (!imagePath) {
            if (speaker.name === "James Wilson" || speaker.name === "Marcus Johnson") {
                imagePath = malePlaceholderUrl;
            } else {
                imagePath = placeholderImageUrl;
            }
        }
        
        speakerCard.innerHTML = `
            <div class="speaker-image-container">
                <img src="${imagePath}" alt="${speaker.name}" class="speaker-image" onerror="this.onerror=null; this.src='${placeholderImageUrl}';">
            </div>
            <div class="speaker-details">
                <h3 class="speaker-name">${speaker.name}</h3>
                <p class="speaker-title">${speaker.title}</p>
                <p class="speaker-bio">${speaker.bio}</p>
                <div class="speaker-social">
                    ${speaker.socialLinks.twitter ? `<a href="${speaker.socialLinks.twitter}" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>` : ''}
                    ${speaker.socialLinks.linkedin ? `<a href="${speaker.socialLinks.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>` : ''}
                </div>
            </div>
        `;
        
        speakersContainer.appendChild(speakerCard);
    });
    
    if (filteredSpeakers.length === 0) {
        speakersContainer.innerHTML = `
            <div class="no-results">
                <p>No speakers found for this topic.</p>
            </div>
        `;
    }
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            displaySpeakers(filter);
        });
    });
}

document.addEventListener('speakersLoaded', () => {
    const speakersContainer = document.getElementById('speakers-container');
    if (speakersContainer && speakersContainer.children.length === 0) {
        displaySpeakers('all');
        setupFilters();
    }
});