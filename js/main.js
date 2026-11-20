// --- OYUN BAŞLATMA VE YÖNETİM ---
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: document.body,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: MainScene,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let game = new Phaser.Game(config);
