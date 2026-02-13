// Gán sự kiện cho các nút sau khi trang web đã tải xong
document.addEventListener('DOMContentLoaded', function() {
    
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    // Sự kiện cho nút CÓ
    btnYes.addEventListener('click', acceptLove);

    // Sự kiện cho nút KHÔNG (dùng cả mouseover cho PC và touchstart cho Mobile)
    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('touchstart', moveButton);
    btnNo.addEventListener('click', moveButton);
});

function acceptLove() {
    // 1. Phát nhạc
    const audio = document.getElementById("love-song");
    if (audio) {
        audio.play().catch(error => {
            console.log("Trình duyệt chặn phát nhạc tự động: ", error);
            // Một số trình duyệt yêu cầu tương tác mạnh hơn để phát nhạc
        });
    }

    // 2. Hiện màn hình chúc mừng
    document.getElementById('success-message').style.display = 'flex';
    
    // 3. Rung điện thoại (nếu có)
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
    
    // 4. Tạo hiệu ứng mưa tim
    setInterval(createHeart, 100);
}

function moveButton(e) {
    // Ngăn chặn hành vi mặc định (đặc biệt là trên mobile để không bị focus)
    if(e) e.preventDefault();

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Kích thước nút và vùng an toàn
    const btnWidth = 100; 
    const btnHeight = 50; 

    // Tính toán vị trí mới
    // Math.random() * (max - min) + min
    const newLeft = Math.random() * (width - btnWidth - 40) + 20;
    const newTop = Math.random() * (height - btnHeight - 100) + 50;

    const btnNo = document.getElementById('btn-no');
    
    btnNo.style.position = 'fixed'; 
    btnNo.style.left = newLeft + 'px';
    btnNo.style.top = newTop + 'px';
    
    // Reset transform để vị trí chính xác
    btnNo.style.transform = 'none';
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    
    const icons = ['❤️', '💖', '🌸', '💗', '🥰'];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px'; 
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    document.body.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 5000);
}