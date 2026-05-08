const videoContainer = document.getElementById('video-container');

// ទិន្នន័យវីដេអូសាកល្បង
const videos = [
    { title: "រឿងភាគថៃថ្មី ភាគបញ្ចប់", thumbnail: "https://via.placeholder.com/300x169", views: "10K views" },
    { title: "ព័ត៌មានទាន់ហេតុការណ៍ថ្ងៃនេះ", thumbnail: "https://via.placeholder.com/300x169", views: "5.4K views" },
    { title: "របៀបបង្កើតវេបសាយលើទូរស័ព្ទ", thumbnail: "https://via.placeholder.com/300x169", views: "2K views" },
    { title: "បទចម្រៀង Original Song ថ្មីៗ", thumbnail: "https://via.placeholder.com/300x169", views: "120K views" },
];

function displayVideos() {
    videoContainer.innerHTML = videos.map(video => `
        <div class="video-card">
            <div class="thumbnail">
                <img src="${video.thumbnail}" alt="Thumbnail">
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.views} • ១ ម៉ោងមុន</p>
            </div>
        </div>
    `).join('');
}

// ហៅមុខងារបង្ហាញវីដេអូពេលបើកវេបសាយ
displayVideos();
