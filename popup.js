function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + ";" + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function createPopup() {
    // if (getCookie("popup_shown")) return; // 쿠키가 있으면 팝업 표시 안 함1

    const popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");

    popupOverlay.innerHTML = `
    <div class="popup-box">
        <span class="popup-close">&times;</span>
        <div class="popup-slider">
            <!-- 첫 번째 슬라이드: 도산대로점 오픈 -->
            <div class="popup-slide active">
                <div class="popup-header">
                    <img src="src/images/logo.png" alt="WELL WASHING Logo" class="popup-logo">
                </div>
                <div class="popup-body">
                    <h2>대전 갑천 힐스테이트</h2>
                    <img src="src/images/background.jpg" alt="도산대로점 오픈">
                </div>
                <div class="popup-footer">1 / 5</div>
            </div>
            <!-- 두 번째 슬라이드 -->
            <div class="popup-slide">
                <div class="popup-header">
                    <img src="src/images/logo.png" alt="WELL WASHING Logo" class="popup-logo">
                </div>
                <div class="popup-body">
                    <h2>강남점 오픈!</h2>
                    <img src="src/images/src/images/background.jpg" alt="강남점 오픈">
                </div>
                <div class="popup-footer">2 / 5</div>
            </div>
            <!-- 세 번째 슬라이드 -->
            <div class="popup-slide">
                <div class="popup-header">
                    <img src="src/images/logo.png" alt="WELL WASHING Logo" class="popup-logo">
                </div>
                <div class="popup-body">
                    <h2>신촌점 오픈!</h2>
                    <img src="src/images/src/images/background.jpg" alt="신촌점 오픈">
                </div>
                <div class="popup-footer">3 / 5</div>
            </div>
            <!-- 네 번째 슬라이드 -->
            <div class="popup-slide">
                <div class="popup-header">
                    <img src="src/images/logo.png" alt="WELL WASHING Logo" class="popup-logo">
                </div>
                <div class="popup-body">
                    <h2>서초점 오픈!</h2>
                    <img src="src/images/src/images/background.jpg" alt="서초점 오픈">
                </div>
                <div class="popup-footer">4 / 5</div>
            </div>
            <!-- 마지막 슬라이드: 오픈 예정 지점 -->
            <div class="popup-slide">
                <div class="popup-header">
                    <img src="src/images/logo.png" alt="COME IN WASH Logo" class="popup-logo">
                </div>
                <div class="popup-body">
                    <h2>오픈 예정!</h2>
                    <ul>
                        <li>E1대구상동점</li>
                        <li>용산 이촌점</li>
                        <li>인천 서구 원당점</li>
                        <li>안산 서부점</li>
                        <li>광릉수목원점</li>
                    </ul>
                </div>
                <div class="popup-footer">5 / 5</div>
            </div>
        </div>
        <div class="popup-controls">
            <button class="prev-btn">&lt;</button>
            <button class="next-btn">&gt;</button>
        </div>
        <label class="popup-hide">
            <input type="checkbox" id="hidePopup"> 하루 동안 보지 않기
        </label>
    </div>
`;


    document.body.appendChild(popupOverlay);

    const closeBtn = document.querySelector(".popup-close");
    const hidePopupCheckbox = document.getElementById("hidePopup");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const slides = document.querySelectorAll(".popup-slide");
    let currentSlide = 0; // 처음에 첫 번째 슬라이드부터 시작

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    closeBtn.addEventListener("click", function () {
        popupOverlay.style.display = "none";
        if (hidePopupCheckbox.checked) {
            setCookie("popup_shown", "true", 1); // 1일 동안 유지
        }
    });

    showSlide(currentSlide); // 팝업이 열릴 때 1번 슬라이드부터 시작
}

window.addEventListener("load", createPopup);
