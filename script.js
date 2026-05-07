// មុខងារបើក/បិទ Settings
function toggleSettings() {
    const modal = document.getElementById('settingsModal');
    modal.classList.toggle('hidden');
}

// មុខងារ Login សម្រាប់ Owner
function showOwnerLogin() {
    document.getElementById('ownerLoginModal').classList.remove('hidden');
}

function closeOwnerLogin() {
    document.getElementById('ownerLoginModal').classList.add('hidden');
}

function checkOwnerPass() {
    const pass = document.getElementById('ownerPass').value;
    if (pass === "Heng820221") {
        alert("ជម្រាបសួរ Owner! ការចូលបានជោគជ័យ។");
        document.getElementById('ownerLoginModal').classList.add('hidden');
        document.getElementById('ownerPanel').classList.remove('hidden');
    } else {
        alert("លេខកូដមិនត្រឹមត្រូវទេ!");
    }
}

// មុខងារបង្ហោះវីដេអូ (បណ្តោះអាសន្នលើ Browser)
function postVideo() {
    const title = document.getElementById('videoTitle').value;
    const img = document.getElementById('videoImg').value;

    if (title === "" || img === "") return alert("សូមបំពេញព័ត៌មានឱ្យអស់!");

    const container = document.getElementById('videoContainer');
    const newVideo = `
        <div class="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition duration-300">
            <img src="${img}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h4 class="font-bold mb-2">${title}</h4>
                <p class="text-gray-400 text-xs font-light">Owner Uploaded • Just now</p>
            </div>
        </div>
    `;
    container.innerHTML = newVideo + container.innerHTML;
    
    // Clear input
    document.getElementById('videoTitle').value = "";
    document.getElementById('videoImg').value = "";
    alert("បង្ហោះបានជោគជ័យ!");
}
