const videoDisplay = document.getElementById('video-display');
const modal = document.getElementById('modal-settings');
const darkToggle = document.getElementById('dark-toggle');

// ១. ប្រព័ន្ធទិន្នន័យ (ទាញចេញពីម៉ាស៊ីនទូរស័ព្ទលោកផ្ទាល់)
let myGallery = JSON.parse(localStorage.getItem('khmer_tv_data')) || [
    { title: "រឿងភាគថ្មីៗប្រចាំសប្តាហ៍", thumb: "https://picsum.photos/400/225?random=1", type: "movie" },
    { title: "ព័ត៌មានកម្សាន្តទាន់ហេតុការណ៍", thumb: "https://picsum.photos/400/225?random=2", type: "news" }
];

// ២. មុខងារបង្ហាញ Card វីដេអូ
function loadContent(searchText = "") {
    videoDisplay.innerHTML = "";
    const filtered = myGallery.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${item.thumb}" class="card-img" loading="lazy">
            <div class="card-body">
                <h4>${item.title}</h4>
                <small style="opacity: 0.6; font-size: 10px;">#${item.type}</small>
            </div>
        `;
        videoDisplay.appendChild(div);
    });
}

// ៣. មុខងារបង្ហោះថ្មី (Admin Save)
document.getElementById('btn-save-post').addEventListener('click', () => {
    const title = document.getElementById('add-title').value;
    const thumb = document.getElementById('add-thumb').value;
    const type = document.getElementById('add-type').value;

    if (title && thumb) {
        myGallery.unshift({ title, thumb, type });
        localStorage.setItem('khmer_tv_data', JSON.stringify(myGallery)); // រក្សាទុក
        loadContent();
        modal.style.display = "none";
        alert("ជោគជ័យ! មាតិកាថ្មីត្រូវបានបង្ហោះ។");
    } else {
        alert("សូមបំពេញចំណងជើង និងរូបភាព!");
    }
});

// ៤. មុខងារ Dark Mode (ចងចាំជានិច្ច)
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    darkToggle.checked = true;
}

darkToggle.addEventListener('change', () => {
    if (darkToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// ៥. មុខងារស្វែងរក (Search)
document.getElementById('search-input').addEventListener('input', (e) => {
    loadContent(e.target.value);
});

// ៦. បើក/បិទ Modal
document.getElementById('open-settings').onclick = () => modal.style.display = "block";
document.getElementById('close-modal').onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

// ដំណើរការដំបូង
loadContent();
