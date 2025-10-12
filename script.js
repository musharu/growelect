// ページの初期化処理
function initPage() {
    initHamburgerMenu();
    initHeroSlider();
}


/* ---------------------------
   ハンバーガーメニュー制御
--------------------------- */
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');

    if (!hamburger || !navMenu || !overlay) {
        console.warn("ハンバーガーメニューの要素が見つかりません。");
        return;
    }

    // ハンバーガーメニュー
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active'); 

        if (navMenu.classList.contains('active')) {
            // メニューを順番に表示
            const menuItems = navMenu.querySelectorAll('a');
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, 250 + (index * 150));
            });
        } else {
            // メニューを非表示
            const menuItems = navMenu.querySelectorAll('a');
            menuItems.forEach(item => {
                item.classList.remove('show');
            });
        }
    });

    // オーバーレイをクリックしたら閉じる
    overlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');

        const menuItems = navMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.classList.remove('show');
        });
    });
}


/* ---------------------------
   ヒーロースライダー制御
--------------------------- */
function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    const prev = document.querySelector(".hero-prev");
    const next = document.querySelector(".hero-next");
    const dotsContainer = document.querySelector(".hero-dots");

    if (!slides.length || !prev || !next || !dotsContainer) {
        console.warn("スライダー要素が見つかりません。");
        return;
    }

    let currentIndex = 0;

    // ドットを生成
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        if(index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll("button");

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        slides[index].classList.add("active");
        dots[index].classList.add("active");
    }

    function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    prev.addEventListener("click", () => goToSlide(currentIndex - 1));
    next.addEventListener("click", () => goToSlide(currentIndex + 1));
}


// スクリプトロード完了時に即初期化
initPage();