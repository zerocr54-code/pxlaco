// Buraya yeni dosya ekledikçe tırnak içinde ekle. Uzantısı neyse onu yaz (mp4, jpg, gif vb.)
// DOSYA LİSTESİ: Klasördeki isimlerle BİREBİR aynı olmalı
const trList = ["Geldiler_Abi.mp4"];
const enList = ["Aglayan_Zenci.mp4"];

const LOCK_HOURS = 15;

function init() {
    let now = new Date().getTime();
    let exp = localStorage.getItem('pxla_exp');
    let savedFile = localStorage.getItem('pxla_file');

    if (!exp || now > exp) {
        let userLang = navigator.language || navigator.userLanguage;
        let folder = userLang.includes('tr') ? 'TR' : 'EN';
        let currentList = folder === 'TR' ? trList : enList;

        if (currentList.length === 0) return;

        let randomIndex = Math.floor(Math.random() * currentList.length);
        let selectedFile = currentList[randomIndex];

        // Klasör yolunu oluştur (Baştaki / işaretine dikkat)
        let newFile = "Memes/" + folder + "/" + selectedFile;
        let newExp = now + (LOCK_HOURS * 60 * 60 * 1000);

        localStorage.setItem('pxla_exp', newExp);
        localStorage.setItem('pxla_file', newFile);
        render(newFile, newExp);
    } else {
        render(savedFile, exp);
    }
}

function render(src, exp) {
    const container = document.getElementById('media-container');
    const isVideo = src.toLowerCase().endsWith('.mp4');

    container.innerHTML = isVideo
        ? `<video src="${src}" autoplay loop muted playsinline></video>`
        : `<img src="${src}" alt="PXLACO Meme">`;


    const timerUpdate = setInterval(() => {
        let diff = exp - new Date().getTime();
        if (diff <= 0) {
            clearInterval(timerUpdate);
            localStorage.removeItem('pxla_exp');
            location.reload();
        }
        let h = Math.floor(diff / 3600000);
        let m = Math.floor((diff % 3600000) / 60000);
        let s = Math.floor((diff % 60000) / 1000);
        document.getElementById('timer').innerText =
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }, 1000);
}

init();
