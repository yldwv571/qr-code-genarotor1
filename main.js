document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const generateBtn = document.getElementById('generate-btn');
    const qrcodeContainer = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('download-btn');

    const inputs = {
        name: document.getElementById('name'),
        phone: document.getElementById('phone'),
        email: document.getElementById('email'),
        website: document.getElementById('website'),
        job: document.getElementById('job')
    };

    const qrColorInput = document.getElementById('qr-color');
    const bgColorInput = document.getElementById('bg-color');

    let currentQR = null;

    // Dark / Light Mode funksiyasi
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        themeToggleBtn.innerHTML = isDark 
            ? '<i class="fa-solid fa-sun"></i> <span>Light</span>' 
            : '<i class="fa-solid fa-moon"></i> <span>Dark</span>';
    });

    // QR Kodni yasash funksiyasi
    function createQRCode() {
        qrcodeContainer.innerHTML = '';

        const combinedData = 
            `Ism: ${inputs.name.value.trim()}\n` +
            `Nomer: ${inputs.phone.value.trim()}\n` +
            `Email: ${inputs.email.value.trim()}\n` +
            `Web sayt: ${inputs.website.value.trim()}\n` +
            `Kasb: ${inputs.job.value.trim()}`;

        qrcodeContainer.style.backgroundColor = bgColorInput.value;

        currentQR = new QRCode(qrcodeContainer, {
            text: combinedData,
            width: 190,
            height: 190,
            colorDark: qrColorInput.value,
            colorLight: bgColorInput.value,
            correctLevel: QRCode.CorrectLevel.H
        });

        qrcodeContainer.style.display = 'block';

        setTimeout(() => {
            const qrImage = qrcodeContainer.querySelector('img');
            const qrCanvas = qrcodeContainer.querySelector('canvas');
            
            if (qrImage && qrImage.src) {
                downloadBtn.href = qrImage.src;
            } else if (qrCanvas) {
                downloadBtn.href = qrCanvas.toDataURL("image/png");
            }
            downloadBtn.download = 'My_QR_Code.png';
            downloadBtn.style.display = 'flex';
        }, 150);
    }

    // Rang tanlanganda real vaqtda qayta chizish
    [qrColorInput, bgColorInput].forEach(picker => {
        picker.addEventListener('input', () => {
            if (currentQR) {
                createQRCode();
            }
        });
    });

    // Tugma bosilganda tugmaning o'zi 360 darajaga aylanadi
    generateBtn.addEventListener('click', () => {
        let isValid = true;

        for (let key in inputs) {
            let input = inputs[key];
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
                setTimeout(() => input.classList.remove('error'), 400);
            }
        }

        if (!isValid) {
            alert("Iltimos, barcha bo'sh qatorlarni to'ldiring!");
            return;
        }

        // Tugmaga 360 daraja aylanish klassini qo'shamiz
        generateBtn.classList.add('spin-btn');

        // Aylanish tugagach (0.6 soniya) QR kod hosil bo'ladi va tugma o'z holiga qaytadi
        setTimeout(() => {
            createQRCode();
            generateBtn.classList.remove('spin-btn');
        }, 600);
    });
});