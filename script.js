const videoContainer = document.getElementById('video-container');
const settingsModal = document.getElementById('settings-modal');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// ១. ទាញយកទិន្នន័យពី LocalStorage (បើមាន)
let myContent = JSON.parse(localStorage.getItem('myVideos')) || [
    { title: "ស្វាគមន៍មកកាន់ TV ថ្មី", thumb: "https://via.placeholder.com/300x169", type: "video" }
];

// ២. មុខងារបង្ហាញមាតិកា
function renderContent(filter = "") {
    videoContainer.innerHTML = "";
    const filtered = myContent.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()));
    
    filtered.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <img src="${item.thumb}" class="thumb">
            <div class="info">
                <h3>${item.title}</h3>
                <p style="font-size: 11px; opacity: 0.6;">${item.type.toUpperCase()}</p>
            </div>
        `;
        videoContainer.appendChild(card);
    });
}

// ៣. មុខងារបង្ហោះ (Admin Upload)
document.getElementById('btn-upload').addEventListener('click', () => {
    const title = document.getElementById('post-title').value;
    const thumb = document.getElementById('post-link').value;
    const type = document.getElementById('post-type').value;

    if(title && thumb) {
        myContent.unshift({ title, thumb, type });
        localStorage.setItem('myVideos', JSON.stringify(myContent));
        renderContent();
        settingsModal.style.display = "none";
        alert("បង្ហោះជោគជ័យ!");
    } else {
        alert("សូមបំពេញព័ត៌មានឱ្យគ្រប់!");
    }
});

// ៤. មុខងារ Dark Mode (រក្សាទុកក្នុង Memory)
if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
    if(darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// ៥. មុខងារស្វែងរក (Search)
document.getElementById('search-input').addEventListener('input', (e) => {
    renderContent(e.target.value);
});

// ៦. បើក/បិទ Settings
document.getElementById('open-settings').onclick = () => settingsModal.style.display = "block";
document.getElementById('close-settings').onclick = () => settingsModal.style.display = "none";
window.onclick = (e) => { if(e.target == settingsModal) settingsModal.style.display = "none"; }

// បង្ហាញទិន្នន័យដំបូង
renderContent();
