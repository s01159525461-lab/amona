// 1. استيراد مكتبات Firebase من الـ CDN لتوسيع الموديول بسهولة
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 2. إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyAqxN5QUVNdzuochcnzf3mWT6Pr-mqqrys",
  authDomain: "amona1.firebaseapp.com",
  projectId: "amona1",
  storageBucket: "amona1.firebasestorage.app",
  messagingSenderId: "967793604359",
  appId: "1:967793604359:web:caa999dae10142c22377a2",
  measurementId: "G-RGX5T7N2J2",
  databaseURL: "https://amona1-default-rtdb.firebaseio.com" // رابط قاعدة البيانات الخاص بمشروعك
};

// 3. تهيئة الفايربيز وقاعدة البيانات
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 4. جعل الدوال متاحة على مستوى Window لاستدعائها من HTML
window.showScreen = function(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
};

window.openEnvelope = function() {
  window.showScreen('card-screen');
};

window.goToPasswordScreen = function() {
  window.showScreen('password-screen');
};

window.checkPassword = function() {
  const secret = document.getElementById('secretInput').value;
  if (secret === "amona" || secret === "") {
    window.showScreen('main-content');
    startTimer();
  } else {
    alert("كلمة السر غير صحيحة ❤️");
  }
};

// 5. العداد الزمني (تاريخ البداية)
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

// 6. تشغيل/إيقاف الأغنية
window.toggleAudio = function() {
  const audio = document.getElementById('bg-music');
  const btn = document.querySelector('.play-btn');
  if (audio.paused) {
    audio.play();
    btn.innerText = "❚❚";
  } else {
    audio.pause();
    btn.innerText = "▶";
  }
};

// 7. دالة إرسال الإجابة وحفظها في Firebase Realtime Database
window.sendAnswer = async function(userAnswer) {
  const statusElement = document.getElementById('response-status');
  statusElement.innerText = "جاري إرسال الإجابة...";

  try {
    const answersRef = ref(database, 'answers');
    const newAnswerRef = push(answersRef);
    
    await set(newAnswerRef, {
      name: 'Amona',
      answer: userAnswer,
      timestamp: new Date().toLocaleString('ar-EG')
    });

    statusElement.innerText = "تم إرسال إجابتك بنجاح! ❤️";
  } catch (error) {
    console.error('Firebase Error:', error);
    statusElement.innerText = "حدث خطأ أثناء الإرسال.";
  }
};