// --- UI GÜNCELLEME FONKSİYONLARI ---
function updateUI() {
    document.getElementById('score-val').innerText = Math.floor(GameState.score);
    document.getElementById('health-bar').style.width = GameState.health + '%';

    let pText = "";
    if (GameState.shieldTime > 0) pText += "🛡️ SHIELD ";
    if (GameState.magnetTime > 0) pText += "🧲 MAGNET";
    document.getElementById('powerup-status').innerText = pText;

    // YENİ: Boss UI Güncellemesi
    if (GameState.isBossBattle && GameState.bossActive) {
        document.getElementById('boss-ui').classList.remove('hidden');
        let hpPct = (GameState.bossHealth / GameState.bossMaxHealth) * 100;
        document.getElementById('boss-health-bar').style.width = Math.max(0, hpPct) + '%';
        // Seviyeyi başlıkta göster
        document.getElementById('boss-ui').querySelector('div').innerText = `SECTOR GUARDIAN Level ${GameState.bossLevel}`;
    } else {
        document.getElementById('boss-ui').classList.add('hidden');
    }
}

// YENİ: Boss Uyarı Ekranı Fonksiyonları
window.showBossWarning = function () {
    document.getElementById('warning-overlay').classList.remove('hidden');
}

window.hideBossWarning = function () {
    document.getElementById('warning-overlay').classList.add('hidden');
}

// UI Butonlarına Bağlı Fonksiyonlar
window.startGame = function () {
    AudioSys.init();

    let doStart = function () {
        // UI Geçişleri
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-over-screen').classList.add('hidden');
        document.getElementById('game-hud').classList.remove('hidden');
        document.getElementById('hi-score-val').innerText = Math.floor(GameState.highScore);
        document.getElementById('boss-ui').classList.add('hidden');
        document.getElementById('warning-overlay').classList.add('hidden');

        // Değişkenleri Sıfırla
        GameState.score = 0;
        GameState.health = 100;
        GameState.speedMult = 1;
        GameState.shieldTime = 0;
        GameState.magnetTime = 0;
        GameState.weaponLevel = 0; // Silah sıfırla
        GameState.isPlaying = true;
        GameState.isPaused = false;

        // YENİ: Boss Değişkenlerini Sıfırla
        GameState.isBossBattle = false;
        GameState.bossActive = false;
        GameState.nextBossScore = 2500;
        GameState.bossLevel = 1;

        // Sahneyi yeniden başlat
        game.scene.scenes[0].scene.restart();
    };

    let isFirstStart = !document.getElementById('start-screen').classList.contains('hidden');

    // Sadece "Restart" durumunda (ilk açılışta değil) ve Yandex SDK aktifse reklam göster
    if (!isFirstStart && window.ysdk && window.ysdk.adv) {
        window.ysdk.adv.showFullscreenAdv({
            callbacks: {
                onOpen: () => {
                    if(window.yandexPauseGame) window.yandexPauseGame();
                },
                onClose: (wasShown) => {
                    // reklam kapandığında veya gösterilemediğinde oyunu başlat
                    doStart();
                },
                onError: (error) => {
                    // hata durumunda oyunu başlat
                    doStart();
                }
            }
        });
    } else {
        doStart();
    }
}

// Pause İşlevi
window.togglePause = function () {
    if (!GameState.isPlaying) return; // Oyun oynanmıyorsa işlem yapma

    GameState.isPaused = !GameState.isPaused;
    const pauseScreen = document.getElementById('pause-screen');
    const pauseBtn = document.getElementById('pause-btn');
    const scene = game.scene.scenes[0];

    if (GameState.isPaused) {
        // Oyunu Durdur
        scene.physics.pause();
        // Ayrıca sahnede varsa diğer timerleri de durdurabiliriz
        scene.time.paused = true;
        pauseScreen.classList.remove('hidden');
        pauseBtn.innerText = "▶";
    } else {
        // Oyuna Devam Et
        scene.physics.resume();
        scene.time.paused = false;
        pauseScreen.classList.add('hidden');
        pauseBtn.innerText = "II";
    }
}

window.endGame = function () {
    GameState.isPlaying = false;
    game.scene.scenes[0].physics.pause(); // Fiziği durdur

    // Yüksek Skor Kaydı
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        localStorage.setItem('phaserNeonHiScore', GameState.highScore);
        
        // Yandex için skor kaydı (opsiyonel)
        if (window.ysdk) {
            // Eğer Leaderboard kullanılacaksa buraya ekleme yapılabilir
        }
    }

    // UI Geçişleri
    document.getElementById('game-hud').classList.add('hidden');
    document.getElementById('boss-ui').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('final-score-val').innerText = Math.floor(GameState.score);
}

