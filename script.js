const mainDisplay = document.getElementById('main-display');
const modalUI = document.getElementById('modal-ui');
const darkSwitch = document.getElementById('dark-mode-switch');

// ទាញទិន្នន័យពី LocalStorage
let gallery = JSON.parse(localStorage.getItem('tv_kh_data')) || [
    { title: "រឿងភាគថ្មីៗ កំពុងពេញនិយម", thumb: "https://picsum.photos/400/225?v=1", category: "movie" },
    { title: "ព័ត៌មានកម្សាន្តប្រចាំថ្ងៃ", thumb: "https://picsum.photos/400/225?v=2", category: "video" }
];

function render(filter = "") {
    mainDisplay.innerHTML = "";
    const filtered = gallery.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()));
    
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'v-card';
        card.innerHTML = `
            <img src="${item.thumb}" class="v-thumb">
            <div class="v-info">
                <h3>${item.title}</h3>
                <small style="opacity: 0.5;">#${item.category}</small>
            </div>
        `;
        mainDisplay.appendChild(card);
    });
}

// មុខងារបង្ហោះថ្មី
document.getElementById('save-post').onclick = () => {
    const title = document.getElementById('new-title').value;
    const thumb = document.getElementById('new-thumb').value;
    const cat = document.getElementById('new-category').value;

    if(title && thumb) {
        gallery.unshift({ title, thumb, category: cat });
        localStorage.setItem('tv_kh_data', JSON.stringify(gallery));
        render();
        modalUI.style.display = "none";
        alert("បង្ហោះជោគជ័យ!");
    } else {
        alert("សូមបំពេញព័ត៌មានឱ្យគ្រប់!");
    }
};

// មុខងារ Dark Mode
if(localStorage.getItem('mode') === 'dark') {
    document.body.classList.add('dark-mode');
    darkSwitch.checked = true;
}

darkSwitch.onchange = () => {
    if(darkSwitch.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('mode', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('mode', 'light');
    }
};

// មុខងារ Search & បើកបិទ UI
document.getElementById('search-input').oninput = (e) => render(e.target.value);
document.getElementById('btn-settings').onclick = () => modalUI.style.display = "block";
document.getElementById('close-ui').onclick = () => modalUI.style.display = "none";
window.onclick = (e) => { if(e.target == modalUI) modalUI.style.display = "none"; }

render();
