// បន្ថែម async ដើម្បីធានាថាវាចាំទិន្នន័យពី Firebase
async function loadVideos() {
    // ត្រួតពិនិត្យថា Firebase ដើររួចរាល់ឬនៅ
    if (!window.dbFunctions) {
        setTimeout(loadVideos, 500); // បើមិនទាន់ដើរ ចាំ ០.៥ វិនាទីទៀត
        return;
    }

    const { getDocs, collection, query, orderBy } = window.dbFunctions;
    const q = query(collection(window.db, "videos"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const container = document.getElementById('videoContainer');
    if(!container) return; 
    container.innerHTML = ""; 

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const videoHTML = `
            <div class="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg cursor-pointer" 
                 onclick="window.location.href='player.html?url=${encodeURIComponent(data.videoUrl)}'">
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

// កែប្រែមុខងារបង្ហោះ (បន្ថែម videoUrl)
async function postVideo() {
    const title = document.getElementById('videoTitle').value;
    const img = document.getElementById('videoImg').value;
    const videoUrl = document.getElementById('videoUrl').value; // បន្ថែម input នេះក្នុង HTML ផង

    if (!title || !img || !videoUrl) return alert("សូមបំពេញឱ្យគ្រប់!");

    const { addDoc, collection } = window.dbFunctions;

    try {
        await addDoc(collection(window.db, "videos"), {
            title: title,
            img: img,
            videoUrl: videoUrl,
            createdAt: Date.now()
        });
        alert("បង្ហោះជោគជ័យ!");
        location.reload(); // ធ្វើឱ្យទំព័រដើរឡើងវិញដើម្បីបង្ហាញទិន្នន័យថ្មី
    } catch (e) {
        alert("មានបញ្ហា! សូមពិនិត្យមើល Console");
    }
}
