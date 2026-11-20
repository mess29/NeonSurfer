// --- GLOBAL OYUN DURUMU ---
const GameState = {
    score: 0,
    highScore: localStorage.getItem('phaserNeonHiScore') || 0,
    health: 100,
    baseSpeed: 300,
    speedMult: 1,
    shieldTime: 0,
    magnetTime: 0,
    weaponLevel: 0, // YENİ: Silah Seviyesi (Kalıcı yükseltmeler)
    isPlaying: false,
    isPaused: false,

    // YENİ: Boss Değişkenleri
    isBossBattle: false,
    bossActive: false,
    bossHealth: 0,
    bossMaxHealth: 500,
    nextBossScore: 2500, // İlk boss 2500 puanda gelecek
    bossLevel: 1 // YENİ: Boss seviyesi kademe için eklendi
};
