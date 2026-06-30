// Detect if we're on homepage or subpage
const isHomepage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
const isSubpage = window.location.pathname.includes('/pages/');

// Set correct paths based on location
const paths = {
    home: isHomepage ? 'index.html' : '../index.html',
    logo: isHomepage ? 'logo_transparant.svg' : '../logo_transparant.svg',
    organisatie: isHomepage ? 'pages/organisatie.html' : 'organisatie.html',
    missie: isHomepage ? 'pages/missie.html' : 'missie.html',
    aanmelding: isHomepage ? 'pages/aanmelding.html' : 'aanmelding.html',
    werkwijze: isHomepage ? 'pages/werkwijze.html' : 'werkwijze.html',
    ouderpagina: isHomepage ? 'pages/ouderpagina.html' : 'ouderpagina.html',
    contact: isHomepage ? 'pages/contact.html' : 'contact.html',
    cookie: isHomepage ? 'pages/cookie-policy.html' : 'cookie-policy.html'
};

// Inline header HTML
const headerHTML = `    <!-- Header & Navigation -->
    <header class="header">
        <div class="container">
            <a href="PLACEHOLDER_HOME" style="text-decoration: none; color: inherit;">
                <div class="logo">
                    <img src="PLACEHOLDER_LOGO" alt="Bengelenbak Logo" class="logo-img">
                    <div>
                        <h1>De Bengelenbak</h1>
                        <p class="tagline">Peuterspeelzaal</p>
                    </div>
                </div>
            </a>
            <button class="hamburger" id="hamburger" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="nav" id="nav-menu">
                <a href="PLACEHOLDER_HOME" id="nav-home">Home</a>
                <a href="PLACEHOLDER_PAGE_organisatie" id="nav-organisatie">Organisatie</a>
                <a href="PLACEHOLDER_PAGE_missie" id="nav-missie">Missie en visie</a>
                <a href="PLACEHOLDER_PAGE_aanmelding" id="nav-aanmelding">Aanmelding & plaatsing</a>
                <a href="PLACEHOLDER_PAGE_werkwijze" id="nav-werkwijze">Werkwijze</a>
                <a href="PLACEHOLDER_PAGE_ouderpagina" id="nav-ouderpagina">Ouderpagina</a>
                <a href="PLACEHOLDER_PAGE_contact" id="nav-contact">Contact</a>
            </nav>
        </div>
    </header>`;

// Get current page name
const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

// Load header
function loadHeader() {
    try {
        // Replace placeholders in inline header
        let html = headerHTML.replace(/PLACEHOLDER_HOME/g, paths.home)
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
        // Trigger fade-in animation after footer is loaded
        document.body.classList.add('loaded');
    } catch (e) {
        console.error('Failed to load footer:', e);
        document.body.classList.add('loaded');
    }
}

// Load both components
loadHeader();
loadFooter();
