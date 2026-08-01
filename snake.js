let gameInterval = null;
let timerInterval = null;

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const snakeScoreEl = document.getElementById("score");
const snakeTimeEl = document.getElementById("time");

const startOverlay = document.getElementById("start-overlay");
const gameoverOverlay = document.getElementById("gameover-overlay");
const settingsOverlay = document.getElementById("settings-overlay");

const finalScoreSpan = document.getElementById("final-score");
const finalTimeSpan = document.getElementById("final-time");
const pauseScoreSpan = document.getElementById("pause-score");
const pauseTimeSpan = document.getElementById("pause-time");

const btnStart = document.getElementById("btn-start");
const btnRestart = document.getElementById("btn-restart");
const btnSettings = document.getElementById("btn-settings");
const btnResume = document.getElementById("btn-resume");
const btnPauseRestart = document.getElementById("btn-pause-restart");

const toggleBgm = document.getElementById("toggle-bgm");
const toggleSfx = document.getElementById("toggle-sfx");

const box = 30;
const cols = 40;
const rows = 16;

let snake = [];
let food = {};
let currentDirection = "";
let timeRemaining = 60;
let score = 0;
let isPlaying = false;
let isPaused = false;

// Audio variables
let audioCtx = null;
let bgmInterval = null;
let isBgmEnabled = true;
let isSfxEnabled = true;
let currentBgmNoteIndex = 0;

const bgmNotes = [
  261.63, 293.66, 329.63, 349.23, 392.00, 349.23, 329.63, 293.66,
  329.63, 349.23, 392.00, 440.00, 493.88, 440.00, 392.00, 349.23
];

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playBgmStep() {
  if (!isBgmEnabled || isPaused || !isPlaying || !audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = "triangle";
  osc.frequency.setValueAtTime(bgmNotes[currentBgmNoteIndex], audioCtx.currentTime);
  
  gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.28);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
  
  currentBgmNoteIndex = (currentBgmNoteIndex + 1) % bgmNotes.length;
}

function startBgm() {
  stopBgm();
  if (isBgmEnabled && isPlaying && !isPaused) {
    initAudio();
    bgmInterval = setInterval(playBgmStep, 300);
  }
}

function stopBgm() {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

function playEatSfx() {
  if (!isSfxEnabled || !audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = "sine";
  const now = audioCtx.currentTime;
  
  osc.frequency.setValueAtTime(523.25, now); // C5
  osc.frequency.setValueAtTime(783.99, now + 0.08); // G5
  osc.frequency.setValueAtTime(1046.50, now + 0.16); // C6
  
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
  
  osc.start();
  osc.stop(now + 0.3);
}

// Event Listeners
btnStart.addEventListener("click", startGame);
btnRestart.addEventListener("click", reloadGame);
document.addEventListener("keydown", handleDirectionInput);

btnSettings.addEventListener("click", openSettings);
btnResume.addEventListener("click", resumeGame);
btnPauseRestart.addEventListener("click", resetGameFromSettings);

toggleBgm.addEventListener("change", (e) => {
  isBgmEnabled = e.target.checked;
  if (!isBgmEnabled) stopBgm();
  else if (isPlaying && !isPaused) startBgm();
});

toggleSfx.addEventListener("change", (e) => {
  isSfxEnabled = e.target.checked;
});

function openSettings() {
  if (!gameoverOverlay.classList.contains("hidden")) return;
  
  if (isPlaying && !isPaused) {
    pauseGame();
  }
  
  const settingsTitleEl = document.getElementById("settings-title");
  const settingsStatsEl = document.getElementById("settings-stats");
  
  if (isPlaying) {
    settingsTitleEl.textContent = "GAME PAUSED";
    settingsStatsEl.classList.remove("hidden");
    pauseScoreSpan.textContent = score;
    pauseTimeSpan.textContent = timeRemaining;
  } else {
    settingsTitleEl.textContent = "SETTINGS";
    settingsStatsEl.classList.add("hidden");
  }
  
  settingsOverlay.classList.remove("hidden");
}

function resetGameFromSettings() {
  settingsOverlay.classList.add("hidden");
  isPaused = false;
  reloadGame();
}

function pauseGame() {
  if (!isPlaying || isPaused) return;
  isPaused = true;
  settingsOverlay.classList.remove("hidden");
  stopBgm();
}

function resumeGame() {
  if (!isPlaying || !isPaused) {
    settingsOverlay.classList.add("hidden");
    return;
  }
  isPaused = false;
  settingsOverlay.classList.add("hidden");
  if (isBgmEnabled) startBgm();
}

function handleDirectionInput(e) {
  if (!isPlaying || isPaused) return;
  const key = e.key.toLowerCase();
  
  if ((e.key === "ArrowLeft" || key === "a") && currentDirection !== "RIGHT") {
    currentDirection = "LEFT";
  } else if ((e.key === "ArrowUp" || key === "w") && currentDirection !== "DOWN") {
    currentDirection = "UP";
  } else if ((e.key === "ArrowRight" || key === "d") && currentDirection !== "LEFT") {
    currentDirection = "RIGHT";
  } else if ((e.key === "ArrowDown" || key === "s") && currentDirection !== "UP") {
    currentDirection = "DOWN";
  }
}

// Cari posisi acak untuk makanan yang tidak menimpa ular
function generateFood() {
  let newFood;
  let onSnake = true;
  
  while (onSnake) {
    newFood = {
      x: Math.floor(Math.random() * cols) * box,
      y: Math.floor(Math.random() * rows) * box
    };
    
    onSnake = false;
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === newFood.x && snake[i].y === newFood.y) {
        onSnake = true;
        break;
      }
    }
  }
  return newFood;
}

// Cek tabrakan ekor
function checkCollision(head, body) {
  for (let i = 0; i < body.length; i++) {
    if (head.x === body[i].x && head.y === body[i].y) return true;
  }
  return false;
}

function initGame() {
  snake = [];
  snake[0] = {
    x: 9 * box,
    y: 8 * box
  };
  
  food = generateFood();
  currentDirection = ""; // Ular diam sampai tombol arah ditekan
  score = 0;
  timeRemaining = 60;
  
  snakeScoreEl.textContent = score;
  snakeTimeEl.textContent = timeRemaining;
}

function draw() {
  // Bersihkan canvas & buat background papan catur retro gelap
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      ctx.fillStyle = (i + j) % 2 === 0 ? "#1e293b" : "#0f172a";
      ctx.fillRect(i * box, j * box, box, box);
    }
  }

  // Gambar Makanan (Apple style bulat & berkilau)
  const radius = box / 2;
  const foodX = food.x + radius;
  const foodY = food.y + radius;
  
  // Bayangan makanan
  ctx.beginPath();
  ctx.arc(foodX, foodY + 2, radius - 2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  ctx.fill();

  // Tubuh makanan
  ctx.beginPath();
  ctx.arc(foodX, foodY, radius - 2, 0, Math.PI * 2);
  ctx.fillStyle = "#ef4444";
  ctx.fill();
  
  // Efek kilau makanan
  ctx.beginPath();
  ctx.arc(foodX - 3, foodY - 3, 3, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fill();

  // Daun kecil
  ctx.beginPath();
  ctx.ellipse(foodX + 2, foodY - radius + 2, 3, 5, Math.PI / 4, 0, Math.PI * 2);
  ctx.fillStyle = "#10b981";
  ctx.fill();

  // Gambar Ular
  for (let i = 0; i < snake.length; i++) {
    const isHead = i === 0;
    
    // Gradien warna ular (kepala hijau emerald terang, ekor memudar agak gelap)
    const ratio = i / snake.length;
    ctx.fillStyle = isHead ? "#10b981" : `rgba(5, 150, 105, ${1 - ratio * 0.6})`;
    
    const x = snake[i].x;
    const y = snake[i].y;
    const padding = 2;
    const size = box - padding * 2;
    
    // Gambar round rect untuk badan/kepala ular
    drawRoundRect(x + padding, y + padding, size, size, isHead ? 8 : 4);

    // Detail mata jika kepala
    if (isHead) {
      ctx.fillStyle = "#ffffff";
      let eye1X, eye1Y, eye2X, eye2Y;
      
      // Posisi mata dinamis berdasarkan arah gerak
      if (currentDirection === "LEFT") {
        eye1X = x + 8; eye1Y = y + 8;
        eye2X = x + 8; eye2Y = y + 20;
      } else if (currentDirection === "UP") {
        eye1X = x + 8; eye1Y = y + 8;
        eye2X = x + 20; eye2Y = y + 8;
      } else if (currentDirection === "RIGHT") {
        eye1X = x + 20; eye1Y = y + 8;
        eye2X = x + 20; eye2Y = y + 20;
      } else { // DOWN atau diam
        eye1X = x + 8; eye1Y = y + 20;
        eye2X = x + 20; eye2Y = y + 20;
      }
      
      ctx.beginPath();
      ctx.arc(eye1X, eye1Y, 3, 0, Math.PI * 2);
      ctx.arc(eye2X, eye2Y, 3, 0, Math.PI * 2);
      ctx.fill();

      // Pupil hitam
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(eye1X, eye1Y, 1.5, 0, Math.PI * 2);
      ctx.arc(eye2X, eye2Y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Ular bergerak hanya jika pemain sudah memilih arah
  if (currentDirection !== "") {
    if (isPaused) return;
    
    // Start BGM on first move if not already playing
    if (isBgmEnabled && !bgmInterval) {
      startBgm();
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (currentDirection === "LEFT") snakeX -= box;
    else if (currentDirection === "UP") snakeY -= box;
    else if (currentDirection === "RIGHT") snakeX += box;
    else if (currentDirection === "DOWN") snakeY += box;

    const newHead = { x: snakeX, y: snakeY };

    // Deteksi tabrakan dinding atau ekor sendiri
    if (
      snakeX >= cols * box ||
      snakeX < 0 ||
      snakeY >= rows * box ||
      snakeY < 0 ||
      checkCollision(newHead, snake)
    ) {
      endGame();
      return;
    }

    // Deteksi makan
    if (snakeX === food.x && snakeY === food.y) {
      score++;
      snakeScoreEl.textContent = score;
      food = generateFood();
      playEatSfx();
    } else {
      snake.pop();
    }

    snake.unshift(newHead);
  }
}

// Helper untuk menggambar kotak berujung melengkung
function drawRoundRect(x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}

function startGame() {
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  initGame();
  initAudio();
  isPlaying = true;
  isPaused = false;
  
  startOverlay.classList.add("hidden");
  gameoverOverlay.classList.add("hidden");
  settingsOverlay.classList.add("hidden");
  
  stopBgm();
  
  // Game tick interval
  gameInterval = setInterval(draw, 100);
  
  // Timer interval
  timerInterval = setInterval(() => {
    // Timer berkurang hanya jika ular mulai bergerak dan game tidak di-pause
    if (currentDirection !== "" && !isPaused) {
      timeRemaining--;
      snakeTimeEl.textContent = timeRemaining;
      
      if (timeRemaining <= 0) {
        endGame();
      }
    }
  }, 1000);
}

function endGame() {
  isPlaying = false;
  isPaused = false;
  stopBgm();
  
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  finalScoreSpan.textContent = score;
  finalTimeSpan.textContent = timeRemaining;
  
  gameoverOverlay.classList.remove("hidden");
}

function reloadGame() {
  gameoverOverlay.classList.add("hidden");
  startGame();
}

// Sinkronkan UI dengan initial state js
toggleBgm.checked = isBgmEnabled;
toggleSfx.checked = isSfxEnabled;

// Gambar screen awal sekali saja
initGame();
draw();
