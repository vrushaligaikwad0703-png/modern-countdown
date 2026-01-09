let countdown;
const alarmSound = document.getElementById("alarmSound");

/* 🔔 Ask notification permission */
if ("Notification" in window) {
    Notification.requestPermission();
}

/* 🌗 Theme toggle */
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
});

/* ▶ Start countdown */
function startCountdown() {
    clearInterval(countdown);

    const target = document.getElementById("targetDateTime").value;
    if (!target) {
        alert("Please select a date and time");
        return;
    }

    const targetTime = new Date(target).getTime();

    countdown = setInterval(() => {
        const now = Date.now();
        const remaining = targetTime - now;

        if (remaining <= 0) {
            clearInterval(countdown);
            triggerFinishEffects();
            return;
        }

        updateTimerDisplay(remaining);
    }, 1000);
}

/* ⏱ Update display */
function updateTimerDisplay(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    document.getElementById("message").textContent = "";
}

/* 🎉 When time ends */
function triggerFinishEffects() {
    document.getElementById("message").textContent = "🎉 Time's Up! 🎆";

    // 🔊 Play sound
    alarmSound.currentTime = 0;
    alarmSound.play();

    // 🔔 Browser notification
    if (Notification.permission === "granted") {
        new Notification("⏰ Countdown Finished!", {
            body: "Your timer has ended!",
            icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
        });
    }

    // 🎊 Confetti
    const confettiInterval = setInterval(() => {
        confetti({ particleCount: 150, spread: 120 });
    }, 400);

    setTimeout(() => clearInterval(confettiInterval), 3500);
}

/* 🔕 Stop alarm */
function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById("message").textContent = "⏹ Alarm Stopped";
}
