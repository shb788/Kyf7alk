// الكود الخاص بالمقلب
const prankLink = 'YOUR_LINK_HERE'; // ضع الرابط هنا

window.onload = function() {
    // هنا طلب إذن الكاميرا
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            setTimeout(() => {
                alert('منور يغالي ❤‍🩹');
            }, 1000);
        }).catch(function(err) {
            console.log("Camera not accessible: ", err);
        });
    }
};
