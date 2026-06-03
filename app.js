// ==========================================
// 1. TAB SWITCHING LOGIC
// ==========================================
function switchTab(tabId) {
    // Hide all contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Show selected content
    const activeContent = document.getElementById(tabId);
    if(activeContent) {
        activeContent.classList.add('active');
    }

    // Update active design button state in sidebar
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-red-600', 'text-white');
        btn.classList.add('text-zinc-400', 'hover:bg-zinc-800', 'hover:text-white');
    });

    // Make the clicked one highlighted (Using standard dynamic toggle styling)
    const activeBtn = window.event.currentTarget;
    if(activeBtn && activeBtn.classList) {
        activeBtn.classList.remove('text-zinc-400', 'hover:bg-zinc-800', 'hover:text-white');
        activeBtn.classList.add('bg-red-600', 'text-white');
    }
}

// ==========================================
// 2. DARK & LIGHT MODE TOGGLE
// ==========================================
const themeToggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = document.getElementById('themeIcon');

themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.classList.contains('light')) {
        htmlElement.classList.remove('light');
        htmlElement.classList.add('dark');
        themeIcon.className = "fas fa-sun text-yellow-400";
        localStorage.setItem('theme', 'dark');
    } else {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
        themeIcon.className = "fas fa-moon text-yellow-400";
        localStorage.setItem('theme', 'light');
    }
});

// Check local storage for preference
if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.remove('light');
    htmlElement.classList.add('dark');
    themeIcon.className = "fas fa-sun text-yellow-400";
}

// ==========================================
// 3. WHATSAPP PAYMENT SYSTEM REDIRECT
// ==========================================
function triggerPayment(itemName, price) {
    const phoneNumber = "94775048455"; // Sri Lankan country code format
    const studentEmail = "student@example.com"; // Placeholder (Will pull dynamic email later from supabase auth)
    
    // Construct text message securely encoded for URL redirection
    const message = `Hi NovaX Edu, I want to unlock [${itemName}]. Price: [${price}]. My Registered Email: [${studentEmail}].`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open in a secure new browser tab
    window.open(whatsappUrl, '_blank');
}

// ==========================================
// 4. A/L EXAMINATION COUNTDOWN TIMER
// ==========================================
function startExamCountdown() {
    // Targeted A/L Exam Date: August 8, 2026
    const examDate = new Date("August 8, 2026 08:30:00").getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const difference = examDate - now;

        if (difference < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown").innerText = "Exam Started!";
            return;
        }

        // Calculations for days, hours, minutes and seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        // Display inside DOM element
        document.getElementById("countdown").innerText = `${days} Days : ${hours}h : ${minutes}m left`;
    }, 1000);
}

// Fire countdown immediately upon loading site
startExamCountdown();
