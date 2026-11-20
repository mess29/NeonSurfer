// --- PHASER ANA SAHNESİ ---
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Dışarıdan görsel yüklemek yerine Phaser Graphics ile kendi texture'larımızı çiziyoruz
        const g = this.make.graphics({ x: 0, y: 0, add: false });

        // 1. Oyuncu Karakteri (F16 Tarzı Uzay Gemisi)
        g.fillStyle(0xcccccc, 1);
        g.beginPath(); g.moveTo(25, 0); g.lineTo(32, 20); g.lineTo(30, 45); g.lineTo(20, 45); g.lineTo(18, 20); g.closePath(); g.fillPath();
        g.fillStyle(0x556677, 1);
        g.beginPath(); g.moveTo(25, 15); g.lineTo(50, 35); g.lineTo(30, 35); g.lineTo(20, 35); g.lineTo(0, 35); g.closePath(); g.fillPath();
        g.fillStyle(0x445566, 1);
        g.beginPath(); g.moveTo(25, 30); g.lineTo(38, 45); g.lineTo(12, 45); g.closePath(); g.fillPath();
        g.fillStyle(0x00d2ff, 1); g.fillEllipse(25, 20, 6, 15);
        g.fillStyle(0xff5500, 1); g.fillTriangle(20, 45, 30, 45, 25, 58);
        g.generateTexture('ship', 50, 60); g.clear();

        // 1.5. Düşman Gemisi (Sivri, Saldırgan) 
        g.fillStyle(0x440022, 1); g.beginPath(); g.moveTo(20, 40); g.lineTo(40, 0); g.lineTo(20, 10); g.lineTo(0, 0); g.closePath(); g.fillPath();
        g.fillStyle(0xff0055, 1); g.fillCircle(20, 15, 5);
        g.generateTexture('enemy_ship', 40, 40); g.clear();

        // 2. Kalkan Halesi (Enerji Küresi)
        g.fillStyle(0x0088ff, 0.2); g.fillCircle(30, 30, 28);
        g.lineStyle(2, 0x00ddff, 0.8); g.strokeCircle(30, 30, 28);
        g.generateTexture('shield_aura', 60, 60); g.clear();

        // 3. Meteor / Asteroid (Kaya)
        g.fillStyle(0x6b5b4b, 1); g.lineStyle(2, 0x4a3d30, 1);
        g.beginPath(); g.moveTo(10, 0); g.lineTo(35, 5); g.lineTo(40, 25); g.lineTo(25, 40); g.lineTo(5, 30); g.lineTo(0, 15); g.closePath(); g.fillPath(); g.strokePath();
        g.strokeCircle(12, 12, 3); g.strokeCircle(28, 25, 5);
        g.generateTexture('obstacle', 40, 40); g.clear();

        // 4. Lazer (Kırmızı Plazma)
        g.fillStyle(0xff1100, 1); g.fillRect(0, 0, 4, 15);
        g.fillStyle(0xffffff, 1); g.fillRect(1, 0, 2, 15);
        g.generateTexture('laser', 4, 15); g.clear();

        // 5. Puan (Parlayan Altın Yıldız)
        g.fillStyle(0xffdd00, 1); g.lineStyle(1, 0xffffff, 1);
        g.beginPath(); g.moveTo(15, 0); g.lineTo(18, 12); g.lineTo(30, 15); g.lineTo(18, 18); g.lineTo(15, 30); g.lineTo(12, 18); g.lineTo(0, 15); g.lineTo(12, 12); g.closePath(); g.fillPath(); g.strokePath();
        g.generateTexture('score_orb', 30, 30); g.clear();

        // 6. Güçlendiriciler
        g.lineStyle(4, 0x00d2ff, 1); g.strokeCircle(15, 15, 13); g.generateTexture('pw_shield', 30, 30); g.clear();

        // YENİ: Gravitasyon Modülü (Mıknatıs) - Mini Kara Delik
        g.fillStyle(0x050510, 1); g.fillCircle(15, 15, 12);
        g.lineStyle(2, 0xaa00ff, 0.8); g.strokeCircle(15, 15, 14);
        g.lineStyle(1, 0xffffff, 0.5); g.strokeCircle(15, 15, 8);
        g.generateTexture('pw_magnet', 30, 30); g.clear();

        // YENİ: Silah Kapsülü (Weapon Upgrade)
        g.fillStyle(0xffaa00, 1); g.fillRoundedRect(5, 5, 20, 20, 5);
        g.fillStyle(0xffffff, 1); g.fillRect(13, 8, 4, 14); // Silah Sembolü
        g.generateTexture('pw_weapon', 30, 30); g.clear();

        // YENİ: Ağır Plazma (Delici Silah 3. Seviye)
        g.fillStyle(0xff5500, 1); g.fillCircle(12, 12, 12);
        g.fillStyle(0xffffaa, 1); g.fillCircle(12, 12, 6);
        g.generateTexture('heavy_laser', 24, 24); g.clear();

        // 7. Parçacık
        g.fillStyle(0xffffff, 1); g.fillRect(0, 0, 4, 4); g.generateTexture('particle', 4, 4); g.clear();

        // 8. Uzay Arka Planı için Yıldız Dokusu (Parallax)
        g.fillStyle(0xffffff, 1);
        for (let i = 0; i < 80; i++) g.fillRect(Math.random() * 400, Math.random() * 400, Math.random() * 3, Math.random() * 3);
        g.generateTexture('stars', 400, 400); g.clear();

        // YENİ: 9. Boss Gemisi (Devasa, tehlikeli görünüm)
        g.fillStyle(0x330011, 1);
        g.beginPath(); g.moveTo(75, 0); g.lineTo(150, 40); g.lineTo(120, 100); g.lineTo(85, 120); g.lineTo(65, 120); g.lineTo(30, 100); g.lineTo(0, 40); g.closePath(); g.fillPath();
        // Kanatlar
        g.fillStyle(0x550011, 1);
        g.beginPath(); g.moveTo(75, 20); g.lineTo(130, 40); g.lineTo(100, 80); g.closePath(); g.fillPath();
        g.beginPath(); g.moveTo(75, 20); g.lineTo(20, 40); g.lineTo(50, 80); g.closePath(); g.fillPath();
        // Göz/Çekirdek
        g.fillStyle(0xff0000, 1); g.fillCircle(75, 60, 20);
        g.fillStyle(0xffaaaa, 1); g.fillCircle(75, 60, 8);
        g.generateTexture('boss', 150, 120); g.clear();

        // YENİ: 10. Boss Mermisi (Tehlikeli Turuncu Yuvarlak)
        g.fillStyle(0xff5500, 1); g.fillCircle(8, 8, 8);
        g.fillStyle(0xffffaa, 1); g.fillCircle(8, 8, 4);
        g.generateTexture('boss_bullet', 16, 16); g.clear();
    }

    create() {
        this.cameras.main.setBackgroundColor('#020205'); // Derin uzay siyahı
        this.bgSpeedMult = 1; // Arkaplan yıldız hızı çarpanı (Boss geldiğinde düşecek)

        // Derin Uzay Parallax Yıldız Katmanları (Grid yerine)
        this.bg1 = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'stars').setOrigin(0, 0).setAlpha(0.3).setTint(0x8888ff);
        this.bg2 = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'stars').setOrigin(0, 0).setAlpha(0.6).setTint(0xaaaaff);
        this.bg3 = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'stars').setOrigin(0, 0).setAlpha(0.9);

        // Gruplar (Fizik motoru nesne havuzları)
        this.lasers = this.physics.add.group();
        this.obstacles = this.physics.add.group();
        this.collectibles = this.physics.add.group();
        this.bossBullets = this.physics.add.group(); // YENİ: Boss mermileri

        // Oyuncu
        this.player = this.physics.add.sprite(this.scale.width / 2, this.scale.height - 100, 'ship');
        this.player.setCollideWorldBounds(true);
        this.player.setBlendMode(Phaser.BlendModes.ADD); // Neon parlama efekti

        // Kalkan
        this.shieldObj = this.add.sprite(0, 0, 'shield_aura');
        this.shieldObj.setBlendMode(Phaser.BlendModes.ADD);
        this.shieldObj.setVisible(false);

        // YENİ: Boss Değişkenleri
        this.boss = null;
        this.bossAttackTimer = null;
        this.sirenTimer = null;

        // Patlama Parçacık Yayıcısı (Emitter)
        this.particles = this.add.particles('particle');

        // Çarpışma Kuralları
        this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);
        this.physics.add.overlap(this.lasers, this.obstacles, this.laserHitObstacle, null, this);
        this.physics.add.overlap(this.player, this.collectibles, this.collectItem, null, this);
        this.physics.add.overlap(this.player, this.bossBullets, this.hitBossBullet, null, this); // YENİ: Boss Mermisi Çarpışması

        // --- KONTROLLER ---
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({ up: Phaser.Input.Keyboard.KeyCodes.W, down: Phaser.Input.Keyboard.KeyCodes.S, left: Phaser.Input.Keyboard.KeyCodes.A, right: Phaser.Input.Keyboard.KeyCodes.D });
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.on('keydown-P', () => { window.togglePause(); }); // YENİ: P tuşu ile duraklat
        this.isUsingKeyboard = false;

        this.input.on('pointermove', (pointer) => {
            if (!GameState.isPlaying || GameState.isPaused) return;
            this.isUsingKeyboard = false;
            let newX = Phaser.Math.Clamp(pointer.x, 20, this.scale.width - 20);
            let newY = Phaser.Math.Clamp(pointer.y, 20, this.scale.height - 20);
            this.player.setPosition(newX, newY);
            this.player.body.velocity.set(0, 0);
        });

        this.input.on('pointerdown', () => { if (GameState.isPlaying && !GameState.isPaused) this.fireLaser(); });

        // Zamanlayıcılar (Spawning) - Dinamik yoğunluk için loop yerine recursive delayedCall
        this.time.delayedCall(600, this.spawnObstacle, [], this);
        this.time.delayedCall(1500, this.spawnCollectible, [], this);
    }

    update(time, delta) {
        if (!GameState.isPlaying || GameState.isPaused) return;

        // Zorluk/Hız artışı (Yumuşatıldı)
        GameState.speedMult += 0.00003;
        const currentSpeed = GameState.baseSpeed * GameState.speedMult;

        // Puan artışı - sadece Boss Savaşı yoksa
        if (!GameState.isBossBattle) {
            GameState.score += 0.05 * GameState.speedMult;
        }

        // YENİ: Boss Tetikleyici
        if (GameState.score >= GameState.nextBossScore && !GameState.isBossBattle) {
            this.startBossPhase();
        }

        // Güçlendirici süreleri
        if (GameState.shieldTime > 0) {
            GameState.shieldTime -= delta;
            this.shieldObj.setVisible(true);
            this.shieldObj.x = this.player.x;
            this.shieldObj.y = this.player.y;
            this.shieldObj.rotation += 0.05;
        } else {
            this.shieldObj.setVisible(false);
        }

        if (GameState.magnetTime > 0) GameState.magnetTime -= delta;

        updateUI(); // HTML UI'ı güncelle

        // --- KLAVYE HAREKETİ ---
        let dx = 0; let dy = 0;
        if (this.cursors.left.isDown || this.wasd.left.isDown) dx = -1;
        else if (this.cursors.right.isDown || this.wasd.right.isDown) dx = 1;
        if (this.cursors.up.isDown || this.wasd.up.isDown) dy = -1;
        else if (this.cursors.down.isDown || this.wasd.down.isDown) dy = 1;

        if (dx !== 0 || dy !== 0) {
            this.isUsingKeyboard = true; const speed = 500;
            const length = Math.sqrt(dx * dx + dy * dy);
            this.player.setVelocity((dx / length) * speed, (dy / length) * speed);
        } else if (this.isUsingKeyboard) {
            this.player.setVelocity(0, 0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (GameState.isPlaying && !GameState.isPaused) this.fireLaser();
        }

        // Parallax Uzay Arka Plan Animasyonu (Boss için Hız Çarpanı eklendi)
        let effSpeed = currentSpeed * this.bgSpeedMult;
        this.bg1.tilePositionY -= (effSpeed * 0.1) * (delta / 1000);
        this.bg2.tilePositionY -= (effSpeed * 0.3) * (delta / 1000);
        this.bg3.tilePositionY -= (effSpeed * 0.6) * (delta / 1000);

        // Nesneleri Temizleme ve Mıknatıs Etkisi
        this.obstacles.getChildren().forEach(obs => {
            if (obs.y > this.scale.height + 50) obs.destroy();
            else obs.rotation += obs.rotSpeed;
        });

        this.collectibles.getChildren().forEach(item => {
            if (item.y > this.scale.height + 50) item.destroy();
            else {
                if (GameState.magnetTime > 0) {
                    const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, item.x, item.y);
                    // Magnet menzili ve çekimi arttı
                    if (dist < 350) this.physics.moveToObject(item, this.player, 500);
                }
            }
        });

        this.lasers.getChildren().forEach(laser => { if (laser.y < -50) laser.destroy(); });

        // Boss Mermilerini Temizle
        this.bossBullets.getChildren().forEach(b => {
            if (b.y > this.scale.height + 50 || b.y < -50 || b.x < -50 || b.x > this.scale.width + 50) {
                b.destroy();
            }
        });

        // YENİ: Aktif Boss Hareketi (Sürekli sağa sola süzülür)
        if (GameState.bossActive && this.boss && this.boss.active) {
            this.boss.x = this.scale.width / 2 + Math.sin(time / 800) * (this.scale.width / 2 - 80);
        }
    }

    // --- YENİ BOSS SİSTEMİ FONKSİYONLARI ---

    startBossPhase() {
        GameState.isBossBattle = true;
        GameState.bossActive = false;
        window.showBossWarning();

        // Ekrondaki düşmanları/meteorları sil
        this.obstacles.clear(true, true);

        // Yıldızları yavaşlat (Arena Modu hissi)
        this.tweens.add({ targets: this, bgSpeedMult: 0.1, duration: 3000 });

        let sirenCount = 0;
        this.sirenTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                AudioSys.play('siren');
                sirenCount++;
                if (sirenCount >= 3) {
                    window.hideBossWarning();
                    this.spawnBoss();
                }
            },
            repeat: 2
        });
    }

    spawnBoss() {
        if (!GameState.isPlaying) return;
        GameState.bossActive = true;
        // Seviyeye göre boss canı
        GameState.bossMaxHealth = 150 + (GameState.bossLevel * 100);
        GameState.bossHealth = GameState.bossMaxHealth;

        this.boss = this.physics.add.sprite(this.scale.width / 2, -100, 'boss');
        this.boss.setBlendMode(Phaser.BlendModes.ADD);
        this.boss.body.setSize(130, 100);

        // Atış aralığı ilerledikçe hızlanır
        let attackDelay = Math.max(500, 1500 - ((GameState.bossLevel - 1) * 300));

        this.tweens.add({
            targets: this.boss,
            y: 150,
            duration: 2500,
            ease: 'Power2',
            onComplete: () => {
                // Boss Ateş Etmeye Başla
                this.bossAttackTimer = this.time.addEvent({
                    delay: attackDelay, callback: this.bossAttack, callbackScope: this, loop: true
                });
            }
        });

        // Çarpışma: Oyuncu lazeri -> Boss
        this.physics.add.overlap(this.boss, this.lasers, this.laserHitBoss, null, this);
        // Çarpışma: Oyuncu gemisi -> Boss (Temas hasarı)
        this.physics.add.overlap(this.player, this.boss, this.playerHitBoss, null, this);
    }

    bossAttack() {
        if (!GameState.isPlaying || GameState.isPaused || !GameState.bossActive || !this.boss || !this.boss.active) return;

        AudioSys.play('boss_shoot');
        const rand = Math.random();

        let speedMult = 1 + (GameState.bossLevel * 0.1);

        if (GameState.bossLevel === 1) {
            // Seviye 1: Basit Atışlar (Sadece oyuncuya veya hafif yaylım)
            if (rand < 0.5) {
                // Sadece oyuncuya doğru 1 mermi
                const angle = Phaser.Math.Angle.Between(this.boss.x, this.boss.y, this.player.x, this.player.y);
                const bullet = this.bossBullets.create(this.boss.x, this.boss.y + 60, 'boss_bullet');
                bullet.setBlendMode(Phaser.BlendModes.ADD);
                this.physics.velocityFromRotation(angle, 350 * speedMult, bullet.body.velocity);
            } else {
                // Çok dar yaylım atış (3 mermi)
                const angles = [-15, 0, 15];
                angles.forEach(angle => {
                    const bullet = this.bossBullets.create(this.boss.x, this.boss.y + 60, 'boss_bullet');
                    bullet.setBlendMode(Phaser.BlendModes.ADD);
                    this.physics.velocityFromAngle(90 + angle, 300 * speedMult, bullet.body.velocity);
                });
            }
        } else if (GameState.bossLevel === 2) {
            // Seviye 2: Orta zorluk (daha sık atış ve geniş yaylım)
            if (rand < 0.4) {
                const angles = [-30, -10, 10, 30];
                angles.forEach(angle => {
                    const bullet = this.bossBullets.create(this.boss.x, this.boss.y + 60, 'boss_bullet');
                    bullet.setBlendMode(Phaser.BlendModes.ADD);
                    this.physics.velocityFromAngle(90 + angle, 350 * speedMult, bullet.body.velocity);
                });
            } else {
                const angle = Phaser.Math.Angle.Between(this.boss.x, this.boss.y, this.player.x, this.player.y);
                const b1 = this.bossBullets.create(this.boss.x, this.boss.y + 60, 'boss_bullet');
                b1.setBlendMode(Phaser.BlendModes.ADD);
                this.physics.velocityFromRotation(angle, 400 * speedMult, b1.body.velocity);
                this.time.delayedCall(200, () => {
                    if (!this.boss || !this.boss.active) return;
                    const a2 = Phaser.Math.Angle.Between(this.boss.x, this.boss.y, this.player.x, this.player.y);
                    const b2 = this.bossBullets.create(this.boss.x, this.boss.y + 60, 'boss_bullet');
                    b2.setBlendMode(Phaser.BlendModes.ADD);
                    this.physics.velocityFromRotation(a2, 400 * speedMult, b2.body.velocity);
                });
            }
        } else {
            // Seviye 3+: Zorlu
            if (rand < 0.3) {
                const angles = [-45, -20, 0, 20, 45];
                angles.forEach(angle => {
                    const bullet = this.bossBullets.create(this.boss.x, this.boss.y + 60, 'boss_bullet');
                    bullet.setBlendMode(Phaser.BlendModes.ADD);
                    this.physics.velocityFromAngle(90 + angle, 400 * speedMult, bullet.body.velocity);
                });
            } else if (rand < 0.6) {
                for (let i = 0; i < 3; i++) {
                    this.time.delayedCall(i * 150, () => {
                        if (!this.boss || !this.boss.active) return;
                        const a = Phaser.Math.Angle.Between(this.boss.x, this.boss.y, this.player.x, this.player.y);
                        const b = this.bossBullets.create(this.boss.x, this.boss.y + 60, 'boss_bullet');
                        b.setBlendMode(Phaser.BlendModes.ADD);
                        this.physics.velocityFromRotation(a, 500 * speedMult, b.body.velocity);
                    });
                }
            } else {
                for (let i = 0; i < 360; i += 30) {
                    const bullet = this.bossBullets.create(this.boss.x, this.boss.y, 'boss_bullet');
                    bullet.setBlendMode(Phaser.BlendModes.ADD);
                    this.physics.velocityFromAngle(i, 250 * speedMult, bullet.body.velocity);
                }
            }
        }
    }

    laserHitBoss(obj1, obj2) {
        // Obje sırasını dokudan doğrulayarak buluyoruz
        let bossObj = obj1.texture.key === 'boss' ? obj1 : obj2;
        let laserObj = obj1.texture.key === 'boss' ? obj2 : obj1;

        if (!laserObj.isPiercing) {
            laserObj.destroy();
        }

        AudioSys.play('boss_hit');
        this.createExplosion(laserObj.x, laserObj.y - 20, 0xff0000);

        // Ağır plazma ise hasarı biraz daha fazla vurabilir
        GameState.bossHealth -= laserObj.isPiercing ? 15 : 10;

        // Beyaz Yanıp Sönme Efekti
        if (this.boss && this.boss.active) {
            this.boss.setTintFill(0xffffff);
            this.time.delayedCall(50, () => {
                if (this.boss && this.boss.active) this.boss.clearTint();
            });
        }

        if (GameState.bossHealth <= 0 && GameState.bossActive) {
            this.defeatBoss();
        }
    }

    playerHitBoss(player, boss) {
        if (GameState.shieldTime <= 0) {
            GameState.health -= 2; // Saniyede yüksek hasar (Overlapped kaldığı sürece erir)
            if (GameState.health > 0) GameState.weaponLevel = 0; // Silahı sıfırla
            this.cameras.main.shake(100, 0.01);
            if (GameState.health <= 0) endGame();
        }
    }

    hitBossBullet(player, bullet) {
        bullet.destroy();
        this.createExplosion(player.x, player.y, 0xffaa00);
        AudioSys.play('explosion');

        if (GameState.shieldTime > 0) {
            GameState.score += 5; // Kalkanla savunma yaparsa puan kazanır
        } else {
            // Mermi Hasarı
            GameState.health -= 15;
            GameState.weaponLevel = 0; // YENİ: Hasar alınca silah sıfırlanır
            this.cameras.main.shake(200, 0.02);
            const flash = document.getElementById('damage-flash');
            flash.style.opacity = 0.8; setTimeout(() => flash.style.opacity = 0, 100);
            if (GameState.health <= 0) endGame();
        }
    }

    defeatBoss() {
        GameState.bossActive = false;
        AudioSys.play('boss_explosion');
        if (this.bossAttackTimer) this.bossAttackTimer.remove();

        const bx = this.boss.x; const by = this.boss.y;
        this.boss.destroy(); // Boss silinir

        // Devasa Patlama Sekansı
        this.cameras.main.shake(1000, 0.05);
        for (let i = 0; i < 15; i++) {
            this.time.delayedCall(i * 100, () => {
                this.createExplosion(bx + Phaser.Math.Between(-80, 80), by + Phaser.Math.Between(-60, 60), 0xffaa00);
            });
        }

        // Ödül Ganimetleri (Boss yok edilince garanti 4 güçlendirici düşer)
        this.time.delayedCall(800, () => {
            const drops = ['pw_shield', 'pw_magnet', 'score_orb', 'score_orb'];
            drops.forEach((type, idx) => {
                const item = this.collectibles.create(bx + (idx * 40 - 60), by, type);
                item.itemType = type; item.setVelocityY(150);
                if (type !== 'score_orb') item.setBlendMode(Phaser.BlendModes.ADD);
            });
        });

        // Oyunu Hızlandırıp Normal Mod'a Dön
        GameState.isBossBattle = false;

        // YENİ: Geometrik Zorluk Artışı
        let geometricDelay = 2500 * Math.pow(2, GameState.bossLevel);
        GameState.nextBossScore += geometricDelay;

        GameState.score += (500 * GameState.bossLevel); // Ekstra Boss Skoru seviyeye göre artar
        GameState.speedMult *= 1.1; // Oyun genel hızı artar
        GameState.bossLevel += 1; // YENİ: Bir sonraki boss için seviyeyi artır

        this.tweens.add({ targets: this, bgSpeedMult: 1, duration: 2000 });
    }

    // --- YARDIMCI FONKSİYONLAR VE SİLAH ---
    fireLaser() {
        AudioSys.play('shoot');

        if (GameState.weaponLevel === 0) {
            // Standart Tekli Lazer
            const laser = this.lasers.create(this.player.x, this.player.y - 30, 'laser');
            laser.setVelocityY(-800);
            laser.setBlendMode(Phaser.BlendModes.ADD);
        } else if (GameState.weaponLevel === 1) {
            // Çiftli Lazer (Parelel)
            const l1 = this.lasers.create(this.player.x - 12, this.player.y - 20, 'laser');
            const l2 = this.lasers.create(this.player.x + 12, this.player.y - 20, 'laser');
            l1.setVelocityY(-800); l2.setVelocityY(-800);
            l1.setBlendMode(Phaser.BlendModes.ADD); l2.setBlendMode(Phaser.BlendModes.ADD);
        } else if (GameState.weaponLevel === 2) {
            // V Şeklinde Üçlü Lazer
            const l1 = this.lasers.create(this.player.x, this.player.y - 30, 'laser');
            const l2 = this.lasers.create(this.player.x - 15, this.player.y - 20, 'laser');
            const l3 = this.lasers.create(this.player.x + 15, this.player.y - 20, 'laser');
            l1.setVelocityY(-800);
            l2.setVelocity(-200, -750); l2.rotation = -0.2;
            l3.setVelocity(200, -750); l3.rotation = 0.2;
            l1.setBlendMode(Phaser.BlendModes.ADD); l2.setBlendMode(Phaser.BlendModes.ADD); l3.setBlendMode(Phaser.BlendModes.ADD);
        } else {
            // Seviye 3+: Ağır, Yavaş ve Delici Plazma Topu
            const heavy = this.lasers.create(this.player.x, this.player.y - 40, 'heavy_laser');
            heavy.setVelocityY(-450); // Daha yavaş
            heavy.setBlendMode(Phaser.BlendModes.ADD);
            heavy.setScale(1.2);
            heavy.isPiercing = true; // YENİ: Kendi delici özelliğimizi tespit edebilmek için ekledik
        }
    }

    spawnObstacle() {
        if (!GameState.isPlaying) return;

        // YENİ: Meteor yoğunluğu hızla artar (min 150ms'ye kadar düşer)
        let nextDelay = Math.max(150, 600 / GameState.speedMult);
        this.time.delayedCall(nextDelay, this.spawnObstacle, [], this);

        if (GameState.isBossBattle) return; // Boss savaşında normal engel olmaz

        const x = Phaser.Math.Between(30, this.scale.width - 30);
        const isEnemy = Math.random() > 0.4; // %60 düşman (Düşman mekik yoğunluğu arttı)
        const texture = isEnemy ? 'enemy_ship' : 'obstacle';

        const obs = this.obstacles.create(x, -50, texture);
        obs.obstacleType = texture;
        const speedMultiplier = isEnemy ? 1.4 : 1.0; // Düşmanlar daha da hızlı

        // YENİ: Pürüzsüz Süzülme (Smooth Trajectory)
        let targetSpeed = GameState.baseSpeed * GameState.speedMult * speedMultiplier;
        obs.setVelocityY(targetSpeed * 0.3); // %30 hızla ekrana girerler
        obs.setAccelerationY(300); // Yumuşak bir ivmeyle hedef hıza tırmanırlar

        obs.rotSpeed = isEnemy ? 0 : Phaser.Math.FloatBetween(-0.02, 0.02);
        if (isEnemy) obs.setBlendMode(Phaser.BlendModes.ADD);
    }

    spawnCollectible() {
        if (!GameState.isPlaying) return;

        let nextDelay = Math.max(800, 1500 / GameState.speedMult);
        this.time.delayedCall(nextDelay, this.spawnCollectible, [], this);

        if (GameState.isBossBattle) return; // Boss savaşında rastgele ganimet düşmez

        const x = Phaser.Math.Between(30, this.scale.width - 30);
        const rand = Math.random();
        let type = 'score_orb';
        if (rand > 0.92) type = 'pw_shield';
        else if (rand > 0.84) type = 'pw_magnet';
        else if (rand > 0.75) type = 'pw_weapon'; // YENİ: Silah güçlendirici

        const item = this.collectibles.create(x, -50, type);
        item.itemType = type;
        item.setVelocityY(GameState.baseSpeed * GameState.speedMult * 0.8);
        if (type !== 'score_orb') item.setBlendMode(Phaser.BlendModes.ADD);
    }

    createExplosion(x, y, color) {
        const emitter = this.particles.createEmitter({
            x: x, y: y,
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            lifespan: 500,
            tint: color
        });
        this.time.delayedCall(500, () => emitter.remove());
    }

    laserHitObstacle(laser, obstacle) {
        const expColor = obstacle.obstacleType === 'enemy_ship' ? 0xff0055 : 0x6b5b4b;
        this.createExplosion(obstacle.x, obstacle.y, expColor);
        obstacle.destroy();
        GameState.score += obstacle.obstacleType === 'enemy_ship' ? 50 : 20;
        AudioSys.play('explosion');

        // YENİ: Delici plazma ise lazer yok olmaz, içinden geçer
        if (!laser.isPiercing) {
            laser.destroy();
        }
    }

    hitObstacle(player, obstacle) {
        const expColor = obstacle.obstacleType === 'enemy_ship' ? 0xff0055 : 0x6b5b4b;
        obstacle.destroy(); this.createExplosion(obstacle.x, obstacle.y, expColor);
        AudioSys.play('explosion');

        if (GameState.shieldTime > 0) {
            GameState.score += obstacle.obstacleType === 'enemy_ship' ? 25 : 10;
        } else {
            GameState.health -= 25;
            GameState.weaponLevel = 0; // YENİ: Hasar alınca silah gücü sıfırlanır
            this.cameras.main.shake(200, 0.02);
            const flash = document.getElementById('damage-flash');
            flash.style.opacity = 1; setTimeout(() => flash.style.opacity = 0, 150);
            if (GameState.health <= 0) endGame();
        }
    }

    collectItem(player, item) {
        const type = item.itemType;
        item.destroy(); AudioSys.play('collect');

        if (type === 'score_orb') {
            GameState.score += 50;
            GameState.health = Math.min(100, GameState.health + 5);
            this.createExplosion(item.x, item.y, 0x00ff88);
        } else if (type === 'pw_shield') {
            GameState.shieldTime = 8000;
            this.createExplosion(item.x, item.y, 0x00d2ff);
        } else if (type === 'pw_magnet') {
            GameState.magnetTime = 8000;
            this.createExplosion(item.x, item.y, 0xaa00ff);
        } else if (type === 'pw_weapon') {
            GameState.weaponLevel = Math.min(3, GameState.weaponLevel + 1);
            this.createExplosion(item.x, item.y, 0xffaa00);
            GameState.score += 25; // Bonus
            GameState.health = Math.min(100, GameState.health + 5);
        }
    }
}
