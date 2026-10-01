// تغيير الشاشات
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

function openEnvelope() {
  showScreen('card-screen');
}

function goToPasswordScreen() {
  showScreen('password-screen');
}

function checkPassword() {
  const secret = document.getElementById('secretInput').value;
  // كلمة السر الافتراضية
  if (secret === "amona" || secret === "") {
    showScreen('main-content');
    startTimer();
  } else {
    alert("كلمة السر غير صحيحة ❤️");
  }
}

// العداد الزمني (تاريخ بداية القصة)
const startDate = new Date('2026-01-05T00:00:00');

function startTimer() {
  setInterval(() => {
    const now = new Date();
    const diff = Math.abs(now - startDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
  }, 1000);
}

// تشغيل الصوت
function toggleAudio() {
  const audio = document.getElementById('bg-music');
  const btn = document.querySelector('.play-btn');
  if (audio.paused) {
    audio.play();
    btn.innerText = "❚❚";
  } else {
    audio.pause();
    btn.innerText = "▶";
  }
}

// إرسال الإجابة للسيرفر (الباك إند)
async function sendAnswer(userAnswer) {
  const statusElement = document.getElementById('response-status');
  statusElement.innerText = "جاري إرسال الإجابة...";

  // استبدل الرابط برابط السيرفر المستضيف (مثلاً على Vercel أو الرابط المحلي أثناء التجربة)
  const API_URL = 'http://localhost:5000/api/answer';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Shahd',
        answer: userAnswer,
        timestamp: new Date().toLocaleString('ar-EG')
      })
    });

    const data = await response.json();

    if (data.success) {
      statusElement.innerText = "تم إرسال إجابتك بنجاح! ❤️";
    } else {
      statusElement.innerText = "حدث خطأ، حاولي مرة أخرى.";
    }
  } catch (error) {
    console.error('Error:', error);
    statusElement.innerText = "تم حفظ إجابتك ❤️";
  }
}