document.addEventListener('DOMContentLoaded', function() {
    // 1. Gán sự kiện cho nút Yes/No
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    btnYes.addEventListener('click', acceptLove);
    
    // Nút No chạy trốn (xử lý cả chuột và cảm ứng)
    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('touchstart', moveButton);
    btnNo.addEventListener('click', moveButton);
});

/* --- XỬ LÝ BÀN PHÍM SỐ (KEYPAD) --- */

// Hàm thêm số khi bấm nút
function addDigit(digit) {
    const input = document.getElementById("password-input");
    // Giới hạn độ dài pass (ví dụ max 6 số) để không bị tràn
    if (input.value.length < 6) {
        input.value += digit;
    }
}

// Hàm xóa (nút C)
function clearInput() {
    document.getElementById("password-input").value = "";
    document.getElementById("error-message").style.display = "none";
}

// Hàm kiểm tra mật khẩu
function checkPassword() {
    // >>> SỬA MẬT KHẨU CỦA BẠN Ở ĐÂY <<<
    const CORRECT_PASS = "140125"; 
    
    const inputVal = document.getElementById("password-input").value;
    const errorMsg = document.getElementById("error-message");
    const passScreen = document.getElementById("password-screen");

    if (inputVal === CORRECT_PASS) {
        // Đúng pass: Ẩn màn hình khóa
        passScreen.style.opacity = "0"; 
        setTimeout(() => {
            passScreen.style.display = "none";
        }, 500);
    } else {
        // Sai pass: Báo lỗi
        errorMsg.style.display = "block";
        const inputField = document.getElementById("password-input");
        inputField.style.border = "2px solid red";
        
        // Tự động xóa sau 1 giây
        setTimeout(() => {
             inputField.style.border = "2px solid #ffccd5";
             inputField.value = "";
        }, 1000);
    }
}

/* --- XỬ LÝ KHI BẤM 'CÓ' --- */
function acceptLove() {
    // 1. Phát nhạc
    const audio = document.getElementById("love-song");
    if (audio) {
        audio.play().catch(error => {
            console.log("Trình duyệt chặn phát nhạc: ", error);
        });
    }

    // 2. Hiện màn hình lời chúc
    document.getElementById('success-message').style.display = 'flex';
    
    // 3. Rung điện thoại
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
    
    // 4. Mưa tim
    setInterval(createHeart, 100);
}

/* --- XỬ LÝ NÚT 'KHÔNG' CHẠY TRỐN --- */
function moveButton(e) {
    if(e) e.preventDefault(); // Ngăn focus trên mobile

    const width = window.innerWidth;
    const height = window.innerHeight;
    const btnWidth = 100; 
    const btnHeight = 50; 

    // Tính toán vị trí ngẫu nhiên an toàn
    const newLeft = Math.random() * (width - btnWidth - 40) + 20;
    const newTop = Math.random() * (height - btnHeight - 100) + 50;

    const btnNo = document.getElementById('btn-no');
    btnNo.style.position = 'fixed'; 
    btnNo.style.left = newLeft + 'px';
    btnNo.style.top = newTop + 'px';
    btnNo.style.transform = 'none';
}

/* --- TẠO HIỆU ỨNG MƯA TIM --- */
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    
    // Random icon: Tim, Hoa, Mặt cười
    const icons = ['❤️', '💖', '🌸', '💗', '🥰'];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px'; 
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}
