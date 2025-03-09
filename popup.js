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

// 📌 팝업 데이터 (각각 개별 팝업으로 순차적으로 표시)
const popupData = [
    {
        title: "대전 갑천 힐스테이트",
        image: "src/images/background.jpg",
        description: "도산대로점 오픈",
    },
    {
        title: "강남점 오픈!",
        image: "src/images/background.jpg",
        description: "강남점 신규 오픈!",
    },
    {
        title: "신촌점 오픈!",
        image: "src/images/background.jpg",
        description: "신촌점 신규 오픈!",
    },
    {
        title: "서초점 오픈!",
        image: "src/images/background.jpg",
        description: "서초점 신규 오픈!",
    },
    {
        title: "오픈 예정!",
        image: "src/images/logo.png",
        description: `
            <ul>
                <li>E1대구상동점</li>
                <li>용산 이촌점</li>
                <li>인천 서구 원당점</li>
                <li>안산 서부점</li>
                <li>광릉수목원점</li>
            </ul>
        `,
    }
];

// 📌 현재 표시할 팝업 인덱스
let currentPopupIndex = 0;
let allPopupsClosed = false; // 🔥 X 버튼 클릭 시 모든 팝업이 닫힘

// 📌 팝업 생성 함수
function createPopup(index) {
    if (index >= popupData.length || allPopupsClosed) return; // 모든 팝업이 닫혔거나 끝나면 종료

    const data = popupData[index];

    const popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");

    popupOverlay.innerHTML = `
    <div class="popup-box">
        <span class="popup-close">&times;</span>
        <div class="popup-header">
            <img src="src/images/logo.png" alt="WELL WASHING Logo" class="popup-logo">
        </div>
        <div class="popup-body">
            <h2>${data.title}</h2>
            <img src="${data.image}" alt="${data.description}">
            <p>${data.description}</p>
        </div>
        <label class="popup-hide">
            <input type="checkbox" id="hidePopup"> 하루 동안 보지 않기
        </label>
    </div>
    `;

    document.body.appendChild(popupOverlay);

    const closeBtn = popupOverlay.querySelector(".popup-close");
    const hidePopupCheckbox = popupOverlay.querySelector("#hidePopup");

    // 📌 X 버튼을 누르면 현재 팝업 닫기 (하지만 다시 방문하면 뜸)
    closeBtn.addEventListener("click", function () {
        popupOverlay.remove();

        if (hidePopupCheckbox.checked) {
            setCookie("popup_shown", "true", 1); // 🔥 하루 동안 팝업 표시 안 함
        } else {
            // 🔥 다음 팝업 실행
            currentPopupIndex++;
            setTimeout(() => createPopup(currentPopupIndex), 500);
        }
    });

    // 📌 하루 동안 보지 않기 체크박스 클릭 시 모든 팝업 차단
    hidePopupCheckbox.addEventListener("change", function () {
        if (hidePopupCheckbox.checked) {
            setCookie("popup_shown", "true", 1); // 🔥 모든 팝업 1일 차단
            document.querySelectorAll(".popup-overlay").forEach(popup => popup.remove());
            allPopupsClosed = true;
        }
    });
}

// 📌 페이지 로드 후 실행 (헤더/푸터 로드 후! 페이드인 효과 추가)
function startPopup() {
    if (!getCookie("popup_shown")) {
        setTimeout(() => {
            createPopup(currentPopupIndex);
        }, 1000); // 1초 후 첫 팝업 실행
    }
}

// 📌 실행 시점 조정: index.html의 헤더와 푸터가 로드된 후 실행
window.addEventListener("load", () => {
    setTimeout(() => startPopup(), 2000); // 2초 후 팝업 실행 (페이지가 완전히 뜬 후)
});
