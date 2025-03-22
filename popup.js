// 📌 쿠키 저장 함수
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + ";" + expires + "; path=/";
}

// 📌 쿠키 조회 함수
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 📌 팝업 데이터
const popupData = [
    {
        title: "대전 갑천 트리플시티 힐스테이트",
        image: "src/images/open_pictures/daejeon_gabcjeon.png",
        description: "대전 갑천 트리플시티 힐스테이트 오픈",
    },
    {
        title: "인천 송도 레이크시티 힐스테이트 3차",
        image: "src/images/open_pictures/songdo_lake_3.png",
        description: "인천 송도 레이크시티 힐스테이트 3차 오픈!",
    },
    {
        title: "인천 학익동 시티오씨엘 1차",
        image: "src/images/open_pictures/hakik1.png",
        description: "인천 학익동 시티오씨엘 1차 오픈!",
    },
    {
        title: "인천 학익동 시티오씨엘 3차",
        image: "src/images/open_pictures/hakik3.png",
        description: "인천 학익동 시티오씨엘 3차 오픈!",
    },
    {
        title: "서울 관악구 힐스테이트 관악 쎈트씨엘",
        image: "src/images/open_pictures/gwanak1.png",
        description: "서울 관악구 힐스테이트 관악 쎈트씨엘 오픈!",
    },
    {
        title: "오픈 예정!",
        image: "src/images/logo.png",
        description: `
            <ul>
                <li>인천 송도 레이크시티 힐스테이트 4차</li>
            </ul>
        `,
    }
];

let currentPopupIndex = 0;
let allPopupsClosed = false;

// 📌 팝업 생성 함수
function createPopup(index) {
    if (index >= popupData.length || index < 0 || allPopupsClosed) return;

    const data = popupData[index];

    const popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");

    popupOverlay.innerHTML = `
    <div class="popup-box popup-fixed">
        <span class="popup-close">&times;</span>

        <div class="popup-header">
            <img src="src/images/logo.png" alt="WELL WASHING Logo" class="popup-logo">
        </div>

        <div class="popup-body">
            <h2>${data.title}</h2>
            <img src="${data.image}" alt="${data.title}">
            <div class="popup-description">${data.description}</div>

            <div class="popup-nav">
                <div class="popup-nav-item">
                    <button class="popup-prev" ${index === 0 ? 'disabled' : ''}>&lt;</button>
                    <span class="popup-nav-label">이전으로 가기</span>
                </div>
                <div class="popup-nav-item">
                    <button class="popup-next" ${index === popupData.length - 1 ? 'disabled' : ''}>&gt;</button>
                    <span class="popup-nav-label">다음으로 가기</span>
                </div>
            </div>
        </div>

        <label class="popup-hide">
            <input type="checkbox" id="hidePopup"> 하루 동안 보지 않기
        </label>
    </div>
`;


    document.body.appendChild(popupOverlay);

    const closeBtn = popupOverlay.querySelector(".popup-close");
    const hidePopupCheckbox = popupOverlay.querySelector("#hidePopup");
    const prevBtn = popupOverlay.querySelector(".popup-prev");
    const nextBtn = popupOverlay.querySelector(".popup-next");

    closeBtn.addEventListener("click", function () {
        popupOverlay.remove();
        if (hidePopupCheckbox.checked) {
            setCookie("popup_shown", true, 1);
        }
    });

    hidePopupCheckbox.addEventListener("change", function () {
        if (hidePopupCheckbox.checked) {
            setCookie("popup_shown", true, 1);
            document.querySelectorAll(".popup-overlay").forEach(popup => popup.remove());
            allPopupsClosed = true;
        }
    });

    // 📌 이전 팝업
    prevBtn?.addEventListener("click", function () {
        popupOverlay.remove();
        createPopup(index - 1);
    });

    // 📌 다음 팝업
    nextBtn?.addEventListener("click", function () {
        popupOverlay.remove();
        createPopup(index + 1);
    });
}

// 📌 팝업 시작 함수
function startPopup() {
    if (getCookie("popup_shown") !== "true") {
        setTimeout(() => {
            createPopup(currentPopupIndex);
        }, 1000);
    }
}

// 📌 실행 시점
window.addEventListener("load", () => {
    setTimeout(() => startPopup(), startPopup);
});
