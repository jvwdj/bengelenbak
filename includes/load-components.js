// Detect if we're on homepage or subpage
const isHomepage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
const isSubpage = window.location.pathname.includes('/pages/');

// Set correct paths based on location
const paths = {
    home: isHomepage ? 'index.html' : '../index.html',
    logo: isHomepage ? 'logo bengelenbak.png' : '../logo bengelenbak.png',
    organisatie: isHomepage ? 'pages/organisatie.html' : 'organisatie.html',
    missie: isHomepage ? 'pages/missie.html' : 'missie.html',
    aanmelding: isHomepage ? 'pages/aanmelding.html' : 'aanmelding.html',
    werkwijze: isHomepage ? 'pages/werkwijze.html' : 'werkwijze.html',
    ouderpagina: isHomepage ? 'pages/ouderpagina.html' : 'ouderpagina.html',
    contact: isHomepage ? 'pages/contact.html' : 'contact.html',
    cookie: isHomepage ? 'pages/cookie-policy.html' : 'cookie-policy.html'
};

// Get current page name
const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

// Load header
async function loadHeader() {
    const headerPath = isSubpage ? '../includes/header.html' : 'includes/header.html';
    try {
        const response = await fetch(headerPath);
        let html = await response.text();

        // Replace placeholders
        html = html.replace(/PLACEHOLDER_HOME/g, paths.home)
                   .replace(/PLACEHOLDER_LOGO/g, paths.logo)
                   .replace(/PLACEHOLDER_PAGE_organisatie/g, paths.organisatie)
                   .replace(/PLACEHOLDER_PAGE_missie/g, paths.missie)
                   .replace(/PLACEHOLDER_PAGE_aanmelding/g, paths.aanmelding)
                   .replace(/PLACEHOLDER_PAGE_werkwijze/g, paths.werkwijze)
                   .replace(/PLACEHOLDER_PAGE_ouderpagina/g, paths.ouderpagina)
                   .replace(/PLACEHOLDER_PAGE_contact/g, paths.contact)
                   .replace(/PLACEHOLDER_PAGE_cookie/g, paths.cookie);

        document.body.insertAdjacentHTML('afterbegin', html);

        // Initialize hamburger menu
        setTimeout(() => {
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
        }, 0);

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
        console.error('Failed to load header:', e);
    }
}

// Load footer
async function loadFooter() {
    const footerPath = isSubpage ? '../includes/footer.html' : 'includes/footer.html';
    try {
        const response = await fetch(footerPath);
        const html = await response.text();
        document.body.insertAdjacentHTML('beforeend', html);
    } catch (e) {
        console.error('Failed to load footer:', e);
    }
}

// Load both components
loadHeader();
loadFooter();
