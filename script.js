// រង់ចាំរហូតដល់វេបសាយដើរពេញសិន ទើបឱ្យកូដនេះដំណើរការ
document.addEventListener("DOMContentLoaded", function() {
    
    // បង្ហាញសារនេះនៅក្នុង Console របស់ Browser
    console.log("វេបសាយ TV Video Khmer ដំណើរការបានជោគជ័យ!");
    
    // មុខងារ៖ ពេលចុចលើអក្សរ Logo វានឹងលោតសារស្វាគមន៍
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', function() {
        alert("សូមស្វាគមន៍មកកាន់ TV Video Khmer! រីករាយការទស្សនា។");
    });

});
