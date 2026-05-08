// ==============================
// Modern TV Khmer - script.js
// ==============================

const mainDisplay = document.getElementById(‘main-display’);
const modalUI = document.getElementById(‘modal-ui’);
const modalPlayer = document.getElementById(‘modal-player’);
const darkSwitch = document.getElementById(‘dark-mode-switch’);
const emptyState = document.getElementById(‘empty-state’);
const loadMoreWrap = document.getElementById(‘load-more-wrap’);

const PAGE_SIZE = 8;
let currentPage = 1;
let currentFilter = “”;
let currentCat = “all”;

// ======== DEFAULT DATA ========
const defaultData = [
{ id: 1, title: “រឿងភាគចិន ជីវិតស្នេហ៍ 2024”, thumb: “https://picsum.photos/seed/km1/400/225”, category: “movie”, url: “”, featured: true },
{ id: 2, title: “ព័ត៌មានប្រចាំថ្ងៃ - FRESH NEWS”, thumb: “https://picsum.photos/seed/km2/400/225”, category: “news”, url: “”, featured: false },
{ id: 3, title: “តន្ត្រីប្រជាប្រិយ 2024 Mix Non-Stop”, thumb: “https://picsum.photos/seed/km3/400/225”, category: “music”, url: “”, featured: false },
{ id: 4, title: “រឿងភាគកូរ៉េ ស្នេហ៍អាថ៌កំបាំង”, thumb: “https://picsum.photos/seed/km4/400/225”, category: “movie”, url: “”, featured: false },
{ id: 5, title: “Highlight Football 2024 - គ្រប់ Match”, thumb: “https://picsum.photos/seed/km5/400/225”, category: “sport”, url: “”, featured: false },
{ id: 6, title: “វីដេអូកំប្លែង - ចំណាំដែលខ្ពស់”, thumb: “https://picsum.photos/seed/km6/400/225”, category: “video”, url: “”, featured: false },
{ id: 7, title: “រឿងភាគថៃ រាំរង់ចាំស្នេហ៍”, thumb: “https://picsum.photos/seed/km7/400/225”, category: “movie”, url: “”, featured: false },
{ id: 8, title: “ព័ត៌មានកម្សាន្ត សិល្បករ Famous”, thumb: “https://picsum.photos/seed/km8/400/225”, category: “news”, url: “”, featured: false },
{ id: 9, title: “តន្ត្រីខ្មែរ ចម្រៀងពិរោះៗ 2024”, thumb: “https://picsum.photos/seed/km9/400/225”, category: “music”, url: “”, featured: false },
{ id: 10, title: “វីដេអូ Vlog ទេសចរណ៍ Cambodia”, thumb: “https://picsum.photos/seed/km10/400/225”, category: “video”, url: “”, featured: false },
{ id: 11, title: “Basketball NBA Highlight 2024”, thumb: “https://picsum.photos/seed/km11/400/225”, category: “sport”, url: “”, featured: false },
{ id: 12, title: “រឿងភាគចិន ១០០ ភាគ Full HD”, thumb: “https://picsum.photos/seed/km12/400/225”, category: “movie”, url: “”, featured: false },
];

let gallery = JSON.parse(localStorage.getItem(‘tv_kh_data’)) || defaultData;

// ======== CATEGORY LABELS ========
const catLabels = {
all: “ទាំងអស់”, movie: “រឿងភាគ”, video: “វីដេអូ”,
news: “ព័ត៌មាន”, music: “តន្ត្រី”, sport: “កីឡា”
};

// ======== RENDER FEATURED ========
function renderFeatured() {
const featured = gallery.find(i => i.featured) || gallery[0];
if (!featured) return;
document.getElementById(‘featured-img’).src = featured.thumb;
document.getElementById(‘featured-title’).textContent = featured.title;
document.getElementById(‘featured-cat’).textContent = ‘#’ + (catLabels[featured.category] || featured.category);
document.getElementById(‘featured-play’).onclick = () => openPlayer(featured);
}

// ======== RENDER TRENDING BAR ========
function renderTrending() {
const scroll = document.getElementById(‘trending-scroll’);
scroll.innerHTML = “”;
const items = […gallery].slice(0, 6);
items.forEach((item, i) => {
const el = document.createElement(‘button’);
el.className = ‘trending-pill’;
el.innerHTML = `<span class="trending-num">${i + 1}</span>${item.title}`;
el.onclick = () => openPlayer(item);
scroll.appendChild(el);
});
}

// ======== RENDER GRID ========
function render(filter = “”, cat = “all”, page = 1) {
currentFilter = filter;
currentCat = cat;
currentPage = page;

```
let filtered = gallery.filter(item => {
    const matchCat = cat === "all" || item.category === cat;
    const matchText = item.title.toLowerCase().includes(filter.toLowerCase());
    return matchCat && matchText;
});

const total = filtered.length;
const paginated = filtered.slice(0, page * PAGE_SIZE);

document.getElementById('count-badge').textContent = total + ' មាតិកា';
document.getElementById('section-title').textContent =
    cat === "all" ? "មាតិកាទាំងអស់" : catLabels[cat] || cat;

if (page === 1) mainDisplay.innerHTML = "";

if (total === 0) {
    emptyState.style.display = "flex";
    loadMoreWrap.style.display = "none";
    return;
}
emptyState.style.display = "none";

const fragment = document.createDocumentFragment();
paginated.forEach((item, idx) => {
    if (idx < (page - 1) * PAGE_SIZE) return; // skip already rendered
    const card = document.createElement('div');
    card.className = 'v-card';
    card.innerHTML = `
        <div class="v-thumb-wrap">
            <img src="${item.thumb}" class="v-thumb" loading="lazy" onerror="this.src='https://picsum.photos/seed/err${item.id}/400/225'">
            <div class="v-play-overlay"><i class="fa fa-play-circle"></i></div>
            <span class="v-cat-badge">${catLabels[item.category] || item.category}</span>
            ${item.featured ? '<span class="v-hot-badge"><i class="fa fa-fire"></i> Hot</span>' : ''}
        </div>
        <div class="v-info">
            <h3>${item.title}</h3>
            <div class="v-meta">
                <span class="v-views"><i class="fa fa-eye"></i> ${Math.floor(Math.random()*9+1)}K</span>
                <span class="v-time"><i class="fa fa-clock"></i> ថ្មីៗ</span>
            </div>
        </div>
    `;
    card.onclick = () => openPlayer(item);
    fragment.appendChild(card);
});
mainDisplay.appendChild(fragment);

loadMoreWrap.style.display = paginated.length < total ? "flex" : "none";
```

}

// ======== OPEN PLAYER ========
function openPlayer(item) {
document.getElementById(‘player-title’).textContent = item.title;
document.getElementById(‘player-cat’).textContent = catLabels[item.category] || item.category;

```
// Convert YouTube watch URL to embed
let embedUrl = item.url || "";
if (embedUrl.includes("youtube.com/watch?v=")) {
    embedUrl = embedUrl.replace("watch?v=", "embed/");
} else if (embedUrl.includes("youtu.be/")) {
    const ytid = embedUrl.split("youtu.be/")[1];
    embedUrl = "https://www.youtube.com/embed/" + ytid;
}
document.getElementById('player-iframe').src = embedUrl;
modalPlayer.style.display = "flex";
document.body.style.overflow = "hidden";
```

}

function closePlayer() {
document.getElementById(‘player-iframe’).src = “”;
modalPlayer.style.display = “none”;
document.body.style.overflow = “”;
}

// ======== CATEGORY FILTER ========
document.getElementById(‘category-nav’).addEventListener(‘click’, (e) => {
const btn = e.target.closest(’.cat-btn’);
if (!btn) return;
document.querySelectorAll(’.cat-btn’).forEach(b => b.classList.remove(‘active’));
btn.classList.add(‘active’);
render(currentFilter, btn.dataset.cat, 1);
// sync bottom nav
document.querySelectorAll(’.bnav-btn[data-cat]’).forEach(b => {
b.classList.toggle(‘active’, b.dataset.cat === btn.dataset.cat);
});
});

// ======== BOTTOM NAV ========
document.querySelectorAll(’.bnav-btn[data-cat]’).forEach(btn => {
btn.addEventListener(‘click’, () => {
document.querySelectorAll(’.bnav-btn’).forEach(b => b.classList.remove(‘active’));
btn.classList.add(‘active’);
// sync top nav
document.querySelectorAll(’.cat-btn’).forEach(b => {
b.classList.toggle(‘active’, b.dataset.cat === btn.dataset.cat);
});
render(currentFilter, btn.dataset.cat, 1);
window.scrollTo({ top: 0, behavior: ‘smooth’ });
});
});

document.getElementById(‘bnav-upload’).addEventListener(‘click’, () => {
modalUI.style.display = “flex”;
document.body.style.overflow = “hidden”;
});

// ======== SEARCH ========
const searchBarWrap = document.getElementById(‘search-bar-wrap’);
document.getElementById(‘btn-search-toggle’).onclick = () => {
searchBarWrap.classList.toggle(‘open’);
if (searchBarWrap.classList.contains(‘open’)) {
document.getElementById(‘search-input’).focus();
}
};
document.getElementById(‘search-close’).onclick = () => {
searchBarWrap.classList.remove(‘open’);
document.getElementById(‘search-input’).value = “”;
render(””, currentCat, 1);
};
document.getElementById(‘search-input’).oninput = (e) => render(e.target.value, currentCat, 1);

// ======== DARK MODE ========
if (localStorage.getItem(‘mode’) === ‘dark’) {
document.body.classList.add(‘dark-mode’);
darkSwitch.checked = true;
}
darkSwitch.onchange = () => {
document.body.classList.toggle(‘dark-mode’, darkSwitch.checked);
localStorage.setItem(‘mode’, darkSwitch.checked ? ‘dark’ : ‘light’);
};

// ======== UPLOAD ========
document.getElementById(‘save-post’).onclick = () => {
const title = document.getElementById(‘new-title’).value.trim();
const thumb = document.getElementById(‘new-thumb’).value.trim();
const url = document.getElementById(‘new-url’).value.trim();
const cat = document.getElementById(‘new-category’).value;
const featured = document.getElementById(‘new-featured’).checked;

```
if (!title || !thumb) {
    showToast("⚠️ សូមបំពេញចំណងជើង និង Thumbnail!", "warn");
    return;
}

if (featured) gallery.forEach(i => i.featured = false);

const newItem = {
    id: Date.now(),
    title, thumb, url, category: cat, featured
};
gallery.unshift(newItem);
localStorage.setItem('tv_kh_data', JSON.stringify(gallery));
render(currentFilter, currentCat, 1);
renderFeatured();
renderTrending();
modalUI.style.display = "none";
document.body.style.overflow = "";
showToast("✅ បង្ហោះជោគជ័យ!", "success");

// Clear form
['new-title','new-thumb','new-url'].forEach(id => document.getElementById(id).value = '');
document.getElementById('new-featured').checked = false;
```

};

// ======== CLEAR ALL ========
document.getElementById(‘clear-all-btn’).onclick = () => {
if (confirm(“តើអ្នកពិតជាចង់លុបទិន្នន័យទាំងអស់?”)) {
localStorage.removeItem(‘tv_kh_data’);
gallery = […defaultData];
render(””, “all”, 1);
renderFeatured();
renderTrending();
showToast(“🗑️ លុបទិន្នន័យហើយ!”, “warn”);
modalUI.style.display = “none”;
document.body.style.overflow = “”;
}
};

// ======== LOAD MORE ========
document.getElementById(‘load-more-btn’).onclick = () => {
render(currentFilter, currentCat, currentPage + 1);
};

// ======== MODALS CLOSE ========
document.getElementById(‘btn-settings’).onclick = () => {
modalUI.style.display = “flex”;
document.body.style.overflow = “hidden”;
};
document.getElementById(‘close-ui’).onclick = () => {
modalUI.style.display = “none”;
document.body.style.overflow = “”;
};
document.getElementById(‘close-player’).onclick = closePlayer;

window.onclick = (e) => {
if (e.target === modalUI) { modalUI.style.display = “none”; document.body.style.overflow = “”; }
if (e.target === modalPlayer) { closePlayer(); }
};

// ======== TOAST ========
function showToast(msg, type = “success”) {
const t = document.getElementById(‘toast’);
t.textContent = msg;
t.className = ’toast show ’ + type;
setTimeout(() => t.className = ‘toast’, 2800);
}

// ======== INIT ========
renderFeatured();
renderTrending();
render();