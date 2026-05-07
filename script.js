// រង់ចាំរហូតដល់វេបសាយលោតចប់សិន មុនដំណើរការកូដ
document.addEventListener("DOMContentLoaded", () => {
    
    // ចាប់យកប្រអប់វីដេអូទាំងអស់
    const videoCards = document.querySelectorAll('.bg-gray-800.rounded-xl');

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            // នៅពេលចុច វាអាចលោតទៅទំព័រថ្មី ឬបង្ហាញវីដេអូ
            alert("កំពុងបើកដំណើរការវីដេអូនេះ...!");
            // ឧទាហរណ៍៖ window.location.href = "play.html";
        });
    });

});
