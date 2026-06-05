const yesBtn     = document.getElementById('yes-btn');
const noBtnCard  = document.getElementById('no-btn');       // The No inside the card
const noBtnFloat = document.getElementById('no-btn-float'); // The free-roaming No
const mainCard   = document.getElementById('main-card');
const successCard= document.getElementById('success-card');

/* ─────────────────────────────────────────────
   TELEPORTATION LOGIC
   The No button inside the card is replaced by
   a fixed-position clone that roams freely.
───────────────────────────────────────────── */

function getRandomPosition() {
    const pad   = 24;
    const btnW  = noBtnFloat.offsetWidth;
    const btnH  = noBtnFloat.offsetHeight;
    const maxX  = window.innerWidth  - btnW - pad;
    const maxY  = window.innerHeight - btnH - pad;
    return {
        x: Math.random() * (maxX - pad) + pad,
        y: Math.random() * (maxY - pad) + pad,
    };
}

function showFloatingNo() {
    // Place near original button first
    const cardRect = noBtnCard.getBoundingClientRect();
    noBtnFloat.style.left = cardRect.left + 'px';
    noBtnFloat.style.top  = cardRect.top  + 'px';
    noBtnFloat.classList.remove('hidden');

    // Hide the card's No so there's no duplicate but keep its space
    noBtnCard.classList.add('invisible');
}

function teleportNo() {
    const pos = getRandomPosition();
    noBtnFloat.style.transition = 'left 0.15s ease, top 0.15s ease';
    noBtnFloat.style.left = pos.x + 'px';
    noBtnFloat.style.top  = pos.y + 'px';
}

// On first click of card No — swap it to the floating version
noBtnCard.addEventListener('click', () => {
    showFloatingNo();
    teleportNo();
});

// Every subsequent click of the floating No — just teleport
noBtnFloat.addEventListener('click', teleportNo);

/* ─────────────────────────────────────────────
   YES BUTTON
───────────────────────────────────────────── */
yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    noBtnFloat.classList.add('hidden');
    successCard.classList.remove('hidden');
});

/* ─────────────────────────────────────────────
   FLOATING HEARTS BACKGROUND
───────────────────────────────────────────── */
const heartsContainer = document.getElementById('hearts-bg-container');
const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '🌹', '💝'];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    const duration = (Math.random() * 4 + 5).toFixed(2); // 5–9s
    const size     = (Math.random() * 18 + 12).toFixed(0); // 12–30px
    const leftPos  = (Math.random() * 98).toFixed(1);       // 0–98vw

    heart.style.left            = leftPos + 'vw';
    heart.style.fontSize        = size + 'px';
    heart.style.animationDuration = duration + 's';

    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), parseFloat(duration) * 1000);
}

setInterval(createHeart, 350);
