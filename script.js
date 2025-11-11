// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'slideUp 0.8s ease-out forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields!', 'error');
                return;
            }
            
            // Show friendly message about feature not being implemented yet
            showNotification('I haven\'t added this feature yet, but you can reach me at atadoruk68@gmail.com! 😊', 'info');
            this.reset();
        });
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.text-block, .interest-card, .portfolio-item, .timeline-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.stars, .particles');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('stars') ? 0.5 : 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add floating particles animation
    function createFloatingParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(0, 212, 255, 0.6)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createFloatingParticles();
    
    // Add cursor trail effect
    let mouseX = 0, mouseY = 0;
    let trail = [];
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.push({x: mouseX, y: mouseY, time: Date.now()});
        
        // Keep only recent trail points
        trail = trail.filter(point => Date.now() - point.time < 1000);
        
        // Update trail elements
        updateTrail();
    });
    
    function updateTrail() {
        // Remove existing trail elements
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
        
        // Create new trail elements
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'cursor-trail';
            trailElement.style.position = 'fixed';
            trailElement.style.left = point.x + 'px';
            trailElement.style.top = point.y + 'px';
            trailElement.style.width = '4px';
            trailElement.style.height = '4px';
            trailElement.style.background = 'rgba(0, 212, 255, 0.3)';
            trailElement.style.borderRadius = '50%';
            trailElement.style.pointerEvents = 'none';
            trailElement.style.zIndex = '9999';
            trailElement.style.transform = 'translate(-50%, -50%)';
            trailElement.style.opacity = (index / trail.length) * 0.5;
            
            document.body.appendChild(trailElement);
            
            // Remove trail element after animation
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.parentNode.removeChild(trailElement);
                }
            }, 1000);
        });
    }
    
    // Add loading screen
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.style.position = 'fixed';
        loader.style.top = '0';
        loader.style.left = '0';
        loader.style.width = '100%';
        loader.style.height = '100%';
        loader.style.background = 'var(--dark-bg)';
        loader.style.display = 'flex';
        loader.style.alignItems = 'center';
        loader.style.justifyContent = 'center';
        loader.style.zIndex = '10000';
        loader.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 50px; height: 50px; border: 3px solid rgba(0, 212, 255, 0.3); border-top: 3px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <p style="color: var(--text-primary); font-family: 'Orbitron', monospace;">Loading...</p>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Add spin animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });
});

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = 'var(--border-radius)';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10001';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease-out';
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4ecdc4, #44a08d)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #00d4ff, #4ecdc4)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add theme toggle (bonus feature)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Add theme toggle button (optional)
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.left = '20px';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.border = 'none';
    themeToggle.style.background = 'var(--primary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.fontSize = '1.2rem';
    themeToggle.onclick = toggleTheme;
    
    document.body.appendChild(themeToggle);
}

// Uncomment to add theme toggle
// addThemeToggle();

// Experience Modal System
const experienceData = [
    {
        icon: 'fas fa-briefcase',
        title: 'Game Programmer',
        company: 'Dinomore Games',
        period: 'June 2025 - Continuing',
        overview: 'I develop and lead game projects aimed for release on Steam, PlayStation 4/5, and Nintendo Switch. As a Unity programmer, I primarily work with Unity engine, though I also have experience with Unreal Engine. My work spans from gameplay and UI programming to platform-specific integrations, ensuring each title meets both creative and technical standards.',
        responsibilities: [
            'Unity-based game development and project leadership',
            'Gameplay and UI programming',
            'Platform-specific integrations (Steam, PlayStation 4/5, Nintendo Switch)',
            'Unreal Engine project contributions when needed',
            'Code review and quality assurance',
            'Team coordination and technical standards'
        ],
        achievements: [
            'Leading multiple game projects for console and PC platforms',
            'Successfully integrated platform-specific features',
            'Maintained high code quality standards across projects',
            'Contributed to both Unity and Unreal Engine projects'
        ],
        technologies: ['Unity', 'Unreal Engine', 'Blueprints', 'C++', 'Git', 'Team Leadership'],
        projects: [
            {
                name: 'Kamikaze Strike: FPV Drone',
                description: 'First-person view kamikaze drone action game. Demo available on Steam.'
            },
            {
                name: 'Fire Crew Simulator',
                description: 'Realistic firefighting simulation game. Coming 2026.'
            }
        ]
    },
    {
        icon: 'fas fa-code',
        title: 'Game Programmer',
        company: 'Erik Games',
        period: 'August 2024 - May 2025',
        overview: 'I contributed to the development of multiple games for Steam and PlayStation 4/5, including released simulator titles and several story-driven console projects. As a Unity programmer, I primarily worked with Unity engine, though I also have experience with Unreal Engine. My work covered gameplay systems, narrative mechanics, and overall production flow.',
        responsibilities: [
            'Unity-based game development for console and PC',
            'Gameplay systems and mechanics programming',
            'Narrative mechanics implementation',
            'Unreal Engine project contributions when needed',
            'Production flow and agile development',
            'Cross-platform optimization'
        ],
        achievements: [
            'Contributed to multiple released games on Steam and PlayStation 4/5',
            'Successfully developed gameplay systems for simulator titles',
            'Worked on story-driven console projects',
            'Maintained efficient production workflows'
        ],
        technologies: ['Unity', 'Unreal Engine', 'Blueprints', 'Perforce', 'Agile Development'],
        projects: [
            {
                name: 'Suika Animal Kingdom',
                description: 'Puzzle game released on PlayStation 4. Merge animals across multiple themes.'
            },
            {
                name: 'Helichapter X',
                description: 'Helicopter delivery game released on PlayStation 4.'
            },
            {
                name: 'Brain in Retro Space',
                description: 'Retro space game released on PlayStation 4 with positive reviews.'
            }
        ]
    },
    {
        icon: 'fas fa-mobile-alt',
        title: 'Cryptography Researcher',
        company: 'LambdaClass',
        period: 'September 2023 - February 2024',
        overview: 'Focused on algorithm design and linear algebra. Strengthened my problem-solving and system-design skills, which now support my technical work in game development.',
        responsibilities: [
            'Algorithm design and implementation',
            'Linear algebra research and applications',
            'Mathematical modeling',
            'Problem-solving and system design',
            'Research documentation and analysis'
        ],
        achievements: [
            'Developed expertise in algorithm design',
            'Strengthened mathematical and analytical skills',
            'Applied linear algebra to complex problems',
            'Enhanced problem-solving capabilities for game development'
        ],
        technologies: ['Algorithm Design', 'Mathematical Modeling', 'Linear Algebra'],
        projects: [
            {
                name: 'Cryptography Research Projects',
                description: 'Research projects focused on algorithm design and mathematical modeling.'
            }
        ]
    },
    {
        icon: 'fas fa-user-tie',
        title: 'Intern Game Programmer',
        company: 'gamegine games',
        period: 'June 2023 - September 2023',
        overview: 'Started my journey with Unreal Engine during this internship, creating a top-down shooter game using Blueprints. Gained hands-on experience in core gameplay logic and visual scripting.',
        responsibilities: [
            'Unreal Engine game development',
            'Blueprint visual scripting',
            'Top-down shooter game creation',
            'Core gameplay logic implementation',
            'Game design and mechanics'
        ],
        achievements: [
            'Successfully created a top-down shooter game',
            'Learned Unreal Engine and Blueprints',
            'Gained hands-on experience in game development',
            'Developed core gameplay programming skills'
        ],
        technologies: ['Unreal Engine', 'Blueprints', 'Game Design'],
        projects: [
            {
                name: 'Top-Down Shooter Game',
                description: 'Created a top-down shooter game using Unreal Engine Blueprints during the internship.'
            }
        ]
    }
];

function openExperienceModal(index) {
    const modal = document.getElementById('experienceModal');
    const data = experienceData[index];
    
    // Update modal content
    document.getElementById('modalIcon').className = data.icon;
    document.getElementById('modalJobTitle').textContent = data.title;
    document.getElementById('modalCompany').textContent = data.company;
    document.getElementById('modalPeriod').textContent = data.period;
    document.getElementById('modalOverview').textContent = data.overview;
    
    // Update responsibilities
    const responsibilitiesList = document.getElementById('modalResponsibilities');
    responsibilitiesList.innerHTML = '';
    data.responsibilities.forEach(responsibility => {
        const li = document.createElement('li');
        li.textContent = responsibility;
        responsibilitiesList.appendChild(li);
    });
    
    // Update achievements
    const achievementsList = document.getElementById('modalAchievements');
    achievementsList.innerHTML = '';
    data.achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = achievement;
        achievementsList.appendChild(li);
    });
    
    // Update technologies
    const technologiesContainer = document.getElementById('modalTechnologies');
    technologiesContainer.innerHTML = '';
    data.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-item';
        span.textContent = tech;
        technologiesContainer.appendChild(span);
    });
    
    // Update projects
    const projectsContainer = document.getElementById('modalProjects');
    projectsContainer.innerHTML = '';
    data.projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project-item';
        div.innerHTML = `
            <h5>${project.name}</h5>
            <p>${project.description}</p>
        `;
        projectsContainer.appendChild(div);
    });
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeExperienceModal() {
    const modal = document.getElementById('experienceModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('experienceModal');
    if (event.target === modal) {
        closeExperienceModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeExperienceModal();
        closeProjectModal();
    }
});

// Project Modal System
const projectData = [
    {
        icon: 'fas fa-gamepad',
        title: 'Kamikaze Strike: FPV Drone',
        category: 'Action & Simulation',
        year: '2025',
        image: 'kamikazestrikefpvdrone.jpg',
        description: 'First-person view (FPV) kamikaze drone action game developed by Dinomore Games. Players infiltrate enemy lines in fast-paced missions, dodge bullets, evade radar and jammers, and destroy targets like tanks, soldiers, and enemy bases by crashing into them. With realistic flight physics, challenging missions, and explosive action, it offers an exciting experience for drone and action game enthusiasts.',
        downloads: 'Demo',
        rating: 'Coming Soon',
        platforms: '1',
        duration: 'In Development',
        technologies: ['Unreal Engine', 'Blueprints', 'C++', 'Steam', 'Windows'],
        features: [
            'First-person view (FPV) drone control',
            'Realistic flight physics and drone simulation',
            'Various drone types and customization options',
            'Different flight features and explosive payloads',
            'Challenging missions and enemy targets',
            'Radar and jammer evasion mechanics',
            'Fleet upgrade and customization system'
        ],
        process: 'Kamikaze Strike: FPV Drone is being developed by the Dinomore Games team using Unreal Engine. The game includes advanced physics engine and control systems to provide a realistic FPV drone flight experience. The demo version was released on September 30, 2025 on Steam platform, offering players two intense operations to experience the essence of drone warfare.',
        links: [
            { icon: 'fab fa-steam', text: 'View on Steam', url: 'https://store.steampowered.com/app/3902740/Kamikaze_Strike_FPV_Drone/', type: 'primary' },
            { icon: 'fas fa-download', text: 'Download Demo', url: 'https://store.steampowered.com/app/4036490/Kamikaze_Strike_FPV_Drone_Demo/', type: 'secondary' }
        ]
    },
    {
        icon: 'fas fa-fire',
        title: 'Fire Crew Simulator',
        category: 'Simulation',
        year: '2026',
        image: 'firecrewsimulator.jpg',
        description: 'In Fire Crew Simulator, a realistic firefighting simulation, you fight fires in challenging weather conditions using helicopters and fire trucks. Fill water tanks and carefully aim to protect cities, forests, and people. Unlock new vehicles and take on more challenging missions.',
        downloads: 'Coming Soon',
        rating: 'Q1 2026',
        platforms: '1',
        duration: 'In Development',
        technologies: ['Unreal Engine', 'Blueprints', 'C++', 'Steam', 'Windows'],
        features: [
            'Realistic firefighting simulation',
            'Helicopter and fire truck control',
            'Challenging weather conditions system',
            'Water tank management and targeting mechanics',
            'Firefighting in cities, forests, and various environments',
            'Vehicle unlock and upgrade system',
            'Various challenging missions and scenarios'
        ],
        process: 'Fire Crew Simulator is being developed by the Dinomore Games team using Unreal Engine. The game includes advanced physics engine, water simulation, and weather systems to provide a realistic firefighting experience. The game will be released on Steam platform in the first quarter of 2026.',
        links: [
            { icon: 'fab fa-steam', text: 'View on Steam', url: 'https://store.steampowered.com/app/4012160/Fire_Crew_Simulator/', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-hotel',
        title: 'Hotel Owner Simulator',
        category: 'Business Simulation',
        year: '2025',
        image: 'hotelownersimulator.jpg',
        description: 'In Hotel Owner Simulator, you grow your business starting from a small hotel. Design rooms, place walls to adjust sizes. Expand your empire by negotiating for higher prices. Build, design, and manage your hotel! Start from a guesthouse and work your way up to a luxury hotel.',
        downloads: 'Released',
        rating: 'May 2025',
        platforms: '1',
        duration: 'Released',
        technologies: ['Unreal Engine', 'Blueprints', 'C++', 'Steam', 'Windows'],
        features: [
            'Hotel construction and management system',
            'Room design and customization',
            'Wall placement and size adjustment',
            'Price negotiation and business management',
            'Growth from guesthouse to luxury hotel',
            'Detailed hotel management simulation',
            'Various customer types and needs'
        ],
        process: 'Hotel Owner Simulator is a realistic business simulation game developed using Unreal Engine. The game offers players the experience of building, designing, and managing hotels. The game was released on May 8, 2025 on Steam platform.',
        links: [
            { icon: 'fab fa-steam', text: 'View on Steam', url: 'https://store.steampowered.com/app/3158480/Hotel_Owner_Simulator/', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-puzzle-piece',
        title: 'Suika Animal Kingdom',
        category: 'Puzzle Game',
        year: '2024',
        image: 'suika.jpg',
        description: 'Suika Animal Kingdom is a puzzle game where players merge small animals to create larger species across themes like Forest, Beach, and Glacier. The objective is to strategically combine animals to achieve the highest score. The game features vibrant graphics and unique details for each theme, offering a captivating journey through nature.',
        downloads: 'Released',
        rating: 'Nov 2024',
        platforms: '1',
        duration: 'PlayStation 4',
        technologies: ['Unity', 'C#', 'PlayStation 4', 'Puzzle Mechanics'],
        features: [
            'Merge small animals to create larger species',
            'Multiple themes: Forest, Beach, and Glacier',
            'Strategic puzzle gameplay',
            'Vibrant graphics and unique details',
            'High score system',
            'Captivating journey through nature'
        ],
        process: 'Suika Animal Kingdom was developed by Erik Games using Unity engine. The game was released on November 9, 2024, for PlayStation 4. The development focused on creating engaging merge mechanics and beautiful visual themes.',
        links: [
            { icon: 'fab fa-playstation', text: 'PlayStation Store', url: 'https://store.playstation.com/en-us/product/UP5641-CUSA51619_00-SUIKAANIMALKINUS', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-helicopter',
        title: 'Helichapter X',
        category: 'Helicopter Delivery Game',
        year: '2024',
        image: 'helichapterx.jpg',
        description: 'In Helichapter X, players control a helicopter to deliver gifts to designated targets within a time frame. The game focuses on aerial delivery missions, requiring players to navigate through dynamic environments and avoid obstacles. It emphasizes piloting skills and precision without combat elements.',
        downloads: 'Released',
        rating: 'Feb 2024',
        platforms: '1',
        duration: 'PlayStation 4',
        technologies: ['Unity', 'C#', 'PlayStation 4', 'Flight Mechanics'],
        features: [
            'Helicopter piloting and control',
            'Aerial delivery missions',
            'Time-based challenges',
            'Dynamic environments',
            'Obstacle avoidance mechanics',
            'Precision-based gameplay'
        ],
        process: 'Helichapter X was developed by Erik Games using Unity engine. The game was released on February 16, 2024, for PlayStation 4. The development focused on creating realistic helicopter flight mechanics and engaging delivery missions.',
        links: [
            { icon: 'fab fa-playstation', text: 'PlayStation Store', url: 'https://store.playstation.com/en-us/product/UP5641-CUSA47126_00-0359483847861870', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-rocket',
        title: 'Brain in Retro Space',
        category: 'Retro Space Game',
        year: '',
        image: 'braininretrospace.jpg',
        description: 'Brain in Retro Space is a game developed by Erik Games with a retro atmosphere, engaging story, and superb graphics. The game has received positive user reviews, with an average score of 10.0 based on four ratings. Users have praised its retro atmosphere, engaging story, and superb graphics.',
        downloads: 'Released',
        rating: '10.0',
        platforms: '1',
        duration: 'PlayStation 4',
        technologies: ['Unity', 'C#', 'PlayStation 4', 'Retro Graphics'],
        features: [
            'Retro atmosphere and aesthetics',
            'Engaging story',
            'Superb graphics',
            'Challenging gameplay',
            'Positive user reviews',
            'Space-themed adventure'
        ],
        process: 'Brain in Retro Space was developed by Erik Games using Unity engine. The game was released for PlayStation 4. The development focused on creating a retro-inspired space adventure with engaging narrative and visual design.',
        links: [
            { icon: 'fab fa-playstation', text: 'PlayStation Store', url: 'https://www.metacritic.com/game/brain-in-retro-space/', type: 'primary' }
        ]
    }
];

function openProjectModal(index) {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    
    const data = projectData[index];
    if (!data) return;
    
    // Update modal content
    const iconEl = document.getElementById('projectModalIcon');
    const titleEl = document.getElementById('projectModalTitle');
    const categoryEl = document.getElementById('projectModalCategory');
    const yearEl = document.getElementById('projectModalYear');
    const descEl = document.getElementById('projectModalDescription');
    
    if (iconEl) iconEl.className = data.icon;
    if (titleEl) titleEl.textContent = data.title;
    if (categoryEl) categoryEl.textContent = data.category;
    if (yearEl) yearEl.textContent = data.year;
    if (descEl) descEl.textContent = data.description;
    
    // Update image if element exists
    const modalImage = document.getElementById('projectModalImage');
    if (modalImage) {
        modalImage.src = data.image;
        modalImage.alt = data.title;
    }
    
    // Update stats if elements exist
    const downloadsEl = document.getElementById('projectModalDownloads');
    const ratingEl = document.getElementById('projectModalRating');
    const platformsEl = document.getElementById('projectModalPlatforms');
    const durationEl = document.getElementById('projectModalDuration');
    
    if (downloadsEl) downloadsEl.textContent = data.downloads;
    if (ratingEl) ratingEl.textContent = data.rating;
    if (platformsEl) platformsEl.textContent = data.platforms;
    if (durationEl) durationEl.textContent = data.duration;
    
    // Update technologies
    const techContainer = document.getElementById('projectModalTech');
    if (techContainer) {
        techContainer.innerHTML = '';
        data.technologies.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-item';
            techTag.textContent = tech;
            techContainer.appendChild(techTag);
        });
    }
    
    // Update features
    const featuresContainer = document.getElementById('projectModalFeatures');
    if (featuresContainer) {
        featuresContainer.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresContainer.appendChild(li);
        });
    }
    
    // Update process
    const processEl = document.getElementById('projectModalProcess');
    if (processEl) processEl.textContent = data.process;
    
    // Update links
    const linksContainer = document.getElementById('projectModalLinks');
    if (linksContainer) {
        linksContainer.innerHTML = '';
        data.links.forEach(link => {
            const linkBtn = document.createElement('a');
            linkBtn.href = link.url;
            linkBtn.className = `project-link-btn ${link.type === 'secondary' ? 'secondary' : ''}`;
            linkBtn.innerHTML = `<i class="${link.icon}"></i> ${link.text}`;
            linksContainer.appendChild(linkBtn);
        });
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close project modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
});
