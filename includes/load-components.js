// Detect if we're on homepage or subpage
const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html';
const isSubpage = !isHomepage;

// Get current page name
const currentPage = window.location.pathname.split('/').filter(Boolean)[0] || 'index';

// Initialize navigation (header is now inline in HTML)
function initNavigation() {
    try {
        // Initialize hamburger menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }

        // Set active nav item
        const navItems = {
            'index': 'nav-home',
            'organisatie': 'nav-organisatie',
            'missie': 'nav-missie',
            'aanmelding': 'nav-aanmelding',
            'werkwijze': 'nav-werkwijze',
            'ouderpagina': 'nav-ouderpagina',
            'contact': 'nav-contact'
        };

        if (navItems[currentPage]) {
            document.getElementById(navItems[currentPage])?.classList.add('active');
        }
    } catch (e) {
        console.error('Failed to initialize navigation:', e);
    }
}

// Load footer
async function loadFooter() {
    const footerPath = isSubpage ? '../includes/footer.html' : 'includes/footer.html';
    try {
        const response = await fetch(footerPath);
        const html = await response.text();
        document.body.insertAdjacentHTML('beforeend', html);
        // Trigger fade-in animation after footer is loaded
        document.body.classList.add('loaded');
    } catch (e) {
        console.error('Failed to load footer:', e);
        document.body.classList.add('loaded');
    }
}

// Initialize navigation and load footer
initNavigation();
loadFooter();
