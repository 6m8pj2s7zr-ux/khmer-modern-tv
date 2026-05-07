// មុខងារបើក/បិទ Settings
function toggleSettings() {
    document.getElementById('settingsModal').classList.toggle('hidden');
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
        alert("ជម្រាបសួរ Owner!");
        document.getElementById('ownerLoginModal').classList.add('hidden');
        document.getElementById('ownerPanel').classList.remove('hidden');
    } else {
        alert("លេខកូដមិនត្រឹមត្រូវ!");
    }
}

// --- ផ្នែក Firebase Logic ---

// មុខងារទាញយកវីដេអូពី Firebase មកបង្ហាញពេលបើកវេបសាយដំបូង
async function loadVideos() {
    const { getDocs, collection, query, orderBy } = window.dbFunctions;
    const q = query(collection(window.db, "videos"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const container = document.getElementById('videoContainer');
    container.innerHTML = ""; // លុបចោលរបស់ចាស់

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const videoHTML = `
            <div class="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg">
                <img src="${data.img}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h4 class="font-bold mb-2">${data.title}</h4>
                    <p class="text-gray-400 text-xs">Owner Posted • ${new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        container.innerHTML += videoHTML;
    });
}

// មុខងារបង្ហោះវីដេអូទៅ Firebase
async function postVideo() {
    const title = document.getElementById('videoTitle').value;
    const img = document.getElementById('videoImg').value;

    if (!title || !img) return alert("សូមបំពេញឱ្យគ្រប់!");

    const { addDoc, collection } = window.dbFunctions;

    try {
        await addDoc(collection(window.db, "videos"), {
            title: title,
            img: img,
            createdAt: Date.now()
        });
        alert("បង្ហោះជោគជ័យ! វីដេអូនឹងរក្សាទុកជារៀងរហូត។");
        
        // លុបអក្សរក្នុងប្រអប់ និងទាញទិន្នន័យថ្មីមកបង្ហាញ
        document.getElementById('videoTitle').value = "";
        document.getElementById('videoImg').value = "";
        loadVideos(); 
    } catch (e) {
        console.error("Error adding document: ", e);
        alert("មានបញ្ហា! សូមពិនិត្យមើល Firebase Console របស់បង។");
    }
}

// បើកវេបសាយភ្លាម ទាញវីដេអូមកបង្ហាញភ្លាម
window.onload = loadVideos;
