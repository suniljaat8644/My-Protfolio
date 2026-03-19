// 1. Initialize AOS (Animations)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// 2. Typing Effect Logic
const textElement = document.getElementById("typing-text");
const phrases = ["C++ Developer", "DSA Enthusiast", "Problem Solver", "Web Explorer"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    if(!textElement) return;
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

// 3. Master Mouse Events (Cursor, Avatar Tilt, and Eyes)
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const eyes = document.querySelectorAll('.eye');
const avatar = document.querySelector('.avatar-bg');
const eyesWrapper = document.querySelector('.eyes-wrapper');

document.addEventListener('mousemove', (e) => {
    // A. Move Cursor
    if(cursor && follower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }

    // B. Avatar Head Tilt
    const xRatio = (e.clientX / window.innerWidth) - 0.5;
    const yRatio = (e.clientY / window.innerHeight) - 0.5;
    
    if(avatar && eyesWrapper) {
        const tilt = `rotateX(${yRatio * -15}deg) rotateY(${xRatio * 15}deg)`;
        avatar.style.transform = tilt;
        eyesWrapper.style.transform = `translate(-50%, -50%) ${tilt}`;
    }

    // C. Move Eyes
    eyes.forEach(eye => {
        const pupil = eye.querySelector('.pupil');
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = 8;
        
        pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
    });
});

// 4. Smooth Scrolling & Hover Effects
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

document.querySelectorAll('button, a').forEach(item => {
    item.addEventListener('mouseenter', () => follower.style.transform = 'translate(-50%, -50%) scale(2.5)');
    item.addEventListener('mouseleave', () => follower.style.transform = 'translate(-50%, -50%) scale(1)');
});

// Start Typing
document.addEventListener("DOMContentLoaded", type);
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});
const scrollTopBtn = document.getElementById("scrollTop");

window.onscroll = function() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

scrollTopBtn.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};