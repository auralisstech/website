// ===== Dynamic Text Rotation =====
const dynamicTextElement = document.getElementById('dynamicText');
const phrases = ['Outcome', 'Productivity', 'Uptime'];
let currentPhraseIndex = 0;

const mobileHighlight = document.querySelector('.mobile-highlight');

function rotateText() {
    // Fade out effect
    dynamicTextElement.style.opacity = '0';
    dynamicTextElement.style.transform = 'translateY(10px)';

    // Animate Highlight on Mobile
    if (mobileHighlight && window.innerWidth <= 768) {
        mobileHighlight.style.opacity = '0';
        mobileHighlight.style.transform = 'translateY(10px)';
    }

    setTimeout(() => {
        // Update text
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        dynamicTextElement.textContent = phrases[currentPhraseIndex];

        // Fade in effect
        dynamicTextElement.style.opacity = '1';
        dynamicTextElement.style.transform = 'translateY(0)';

        if (mobileHighlight) {
            // Always restore to avoid stuck state if resized
            mobileHighlight.style.opacity = '1';
            mobileHighlight.style.transform = 'translateY(0)';
        }
    }, 300);
}

// Rotate text every 3 seconds
setInterval(rotateText, 3000);

// ===== Login Button Handler =====
const mainLoginBtn = document.getElementById('mainLoginBtn');

if (mainLoginBtn) {
    mainLoginBtn.addEventListener('click', () => {
        // Add a simple animation feedback
        mainLoginBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            mainLoginBtn.style.transform = '';
        }, 150);

        const backendUrl = 'https://auraliss.duckdns.org:9095/login';
        const notReachedPage = 'https://auraliss.duckdns.org:9095/login';
        
        // Timeout for the check (e.g., 5 seconds)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        fetch(backendUrl, { mode: 'no-cors', method: 'HEAD', signal: controller.signal })
            .then(() => {
                // Server is reachable
                clearTimeout(timeoutId);
                window.location.href = backendUrl;
            })
            .catch((error) => {
                // Network error or timeout
                console.error('Backend not reached:', error);
                clearTimeout(timeoutId);
                window.location.href = notReachedPage;
            });
    });
}

// ===== Smooth Scroll for Internal Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===== Add subtle parallax effect to coming soon text =====
const comingSoonElement = document.getElementById('comingSoon');
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;

    if (comingSoonElement) {
        comingSoonElement.style.transform = `translateY(${rate}px)`;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ===== Add dynamic text transition styling =====
dynamicTextElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

// ===== Preload check for logos =====
window.addEventListener('load', () => {
    const logoIcon = document.getElementById('logoIcon');
    const logoText = document.getElementById('logoText');

    // If logo icon fails to load, create a text fallback
    if (logoIcon) {
        logoIcon.addEventListener('error', () => {
            const logoContainer = document.querySelector('.logo-container');
            logoContainer.innerHTML = '<h1 style="font-size: 2rem; font-weight: 800; background: linear-gradient(90deg, #00B8D9, #0091D4, #FF7F32); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">AURALISS</h1>';
        });
    }

    // If text logo fails, hide it gracefully
    if (logoText) {
        logoText.addEventListener('error', () => {
            logoText.style.display = 'none';
        });
    }
});

// ===== Console Easter Egg =====
console.log('%c🚀 Auraliss - Intelligent Automation',
    'font-size: 20px; font-weight: bold; color: #0091D4; text-shadow: 2px 2px 4px rgba(0,145,212,0.3);');
console.log('%cEngineered for Excellence',
    'font-size: 14px; color: #8C8C8C;');
console.log('%cInterested in joining our team? Reach out to us!',
    'font-size: 12px; color: #FF7F32;');

