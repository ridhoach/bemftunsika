/* js/app.js */

// Logika Routing SPA Sederhana
function navigateTo(pageId) {
    // Sembunyikan semua section
    const pages = document.querySelectorAll('.page-view');
    pages.forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('block');
    });
    
    // Tampilkan section yang dituju
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('block');
    }
    
    // Scroll otomatis ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Tutup menu mobile jika sedang terbuka
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

// Interaksi Toggle Menu Mobile
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
}

// Efek Scroll pada Navbar
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('nav-scrolled', 'py-2');
            navbar.classList.remove('py-6'); 
        } else {
            navbar.classList.remove('nav-scrolled', 'py-2');
            navbar.classList.add('py-6');
        }
    });
}