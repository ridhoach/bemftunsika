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

// Logika Fetch API untuk Data Repositori
async function loadRepositori() {
    const container = document.getElementById('repositori-container');
    if (!container) return; // Hentikan jika elemen tidak ditemukan di halaman ini

    try {
        const response = await fetch('./data/repositori.json');
        if (!response.ok) throw new Error('Gagal memuat network response repositori');
        const data = await response.json();

        container.innerHTML = data.map(item => `
            <div class="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(11,19,43,0.1)] transition-all duration-300 group flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl ${item.warnaIcon} flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    <i class="fas ${item.icon}"></i>
                </div>
                <div class="flex-1">
                    <h4 class="font-bold text-slate-900 text-lg mb-1 group-hover:text-ftgold-500 transition-colors">${item.judul}</h4>
                    <p class="text-xs text-slate-500 mb-3">${item.kategori} • ${item.format} • ${item.ukuran}</p>
                    <a href="${item.link}" target="_blank" class="text-sm font-semibold text-ftnavy-700 hover:text-ftgold-500 flex items-center gap-2 transition-colors">
                        <i class="fas fa-download"></i> Unduh
                    </a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Gagal memuat data repositori:", error);
        container.innerHTML = '<p class="text-red-500 text-center col-span-full font-bold">Gagal memuat data repositori akademik. Pastikan repositori.json tersedia.</p>';
    }
}

// Logika Fetch API untuk Data Kabinet
async function loadKabinet() {
    const container = document.getElementById('kabinet-container');
    if (!container) return; // Hentikan jika elemen tidak ditemukan

    try {
        const response = await fetch('./data/kabinet.json');
        if (!response.ok) throw new Error('Gagal memuat network response kabinet');
        const data = await response.json();

        container.innerHTML = data.map(divisi => `
            <div class="mb-10">
                <h3 class="text-xl font-bold text-center text-ftnavy-900 mb-8 uppercase tracking-[0.2em]">
                    <i class="fas ${divisi.icon} text-ftgold-500 mr-2"></i> ${divisi.divisi}
                </h3>
                <div class="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                    ${divisi.anggota.map(person => `
                        <div class="group bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(244,162,97,0.15)] p-6 transition-all duration-300 hover:-translate-y-2 border border-slate-100 text-center w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)]">
                            <h4 class="text-lg font-bold text-slate-900 group-hover:text-ftgold-500 transition-colors leading-tight">${person.nama}</h4>
                            <div class="mt-3 flex flex-col gap-1 items-center">
                                <span class="text-xs text-slate-500 font-bold tracking-wider">${person.npm}</span>
                                <span class="text-xs text-ftnavy-700 font-medium bg-slate-100 px-3 py-1 rounded-full w-max">${person.jabatan}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Gagal memuat data kabinet:", error);
        container.innerHTML = '<p class="text-red-500 text-center col-span-full font-bold">Gagal memuat struktur organisasi. Pastikan kabinet.json tersedia.</p>';
    }
}

// Eksekusi semua fungsi inisialisasi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadRepositori();
    loadKabinet();
});