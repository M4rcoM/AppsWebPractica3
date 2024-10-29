// Escena principal del juego
// js/scenes/GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
        this.isPlayerInvulnerable = false; // Para gestionar la invulnerabilidad temporal
    }

    create() {
        console.log('GameScene: Creando juego...');
        
        // Inicializar score y level desde el registry o asignar valores predeterminados
        this.score = this.registry.get('score');
        this.level = this.registry.get('level');

        if (this.score === undefined) {
            this.score = 0;
            this.registry.set('score', this.score);
            console.log('GameScene: Score inicializado a 0');
        } else {
            console.log('GameScene: Score recuperado del registry:', this.score);
        }

        if (this.level === undefined) {
            this.level = 1;
            this.registry.set('level', this.level);
            console.log('GameScene: Level inicializado a 1');
        } else {
            console.log('GameScene: Level recuperado del registry:', this.level);
        }
        
        // Añadir fondo
        const background = this.add.image(400, 300, 'background');
        background.setOrigin(0.5, 0.5);
        console.log('GameScene: Fondo añadido.');

        // Añadir al jugador
        this.player = this.physics.add.sprite(100, 300, 'player');
        this.player.setCollideWorldBounds(true);

        // Añadir controles
        this.cursors = this.input.keyboard.createCursorKeys();

        // Añadir grupo de obstáculos
        this.obstacles = this.physics.add.staticGroup();
        this.createObstacles();

        // Añadir enemigos
        this.enemies = this.physics.add.group();
        this.createEnemies();

        // Añadir meta
        this.goal = this.physics.add.sprite(750, 300, 'goal');
        this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);

        // Añadir colisiones
        this.physics.add.collider(this.player, this.obstacles);
        this.physics.add.collider(this.player, this.enemies, this.hitEnemy, null, this);

        // Añadir escena de UI
        this.scene.launch('UIScene');

        // Añadir música de fondo
        this.bgMusic = this.sound.add('bg_music', { volume: 0.3, loop: true });
        this.bgMusic.play();

         // Inicializar el sonido de movimiento
         this.moveSound = this.sound.add('move_sound', { volume: 0.5, loop: true });

         // Inicializar el sonido de colision
         this.collisionSound = this.sound.add('collision_sound', { volume: 0.5});
    }

    update() {
        // Movimiento del jugador
        this.player.setVelocity(0);

        let moving = false;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            moving = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            moving = true;
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
            moving = true;
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
            moving = true;
        }
        // Gestionar el sonido de movimiento
        if (moving && !this.isMoving) {
            // El jugador ha empezado a moverse
            this.moveSound.play();
            this.isMoving = true;
            console.log('GameScene: Sonido de movimiento iniciado');
        } else if (!moving && this.isMoving) {
            // El jugador ha dejado de moverse
            this.moveSound.stop();
            this.isMoving = false;
            console.log('GameScene: Sonido de movimiento detenido');
        }
    }

    createObstacles() {
        // Crear obstáculos estáticos
        const obstaclePositions = [
            { x: 400, y: 300 },
            { x: 200, y: 150 },
            { x: 600, y: 450 },
            // Añade más posiciones según sea necesario
        ];

        obstaclePositions.forEach(pos => {
            this.obstacles.create(pos.x, pos.y, 'obstacle');
        });
    }

    createEnemies() {
        // Crear enemigos en movimiento
        const enemyPositions = [
            { x: 500, y: 200 },
            { x: 300, y: 400 },
            // Añade más posiciones según sea necesario
        ];

        enemyPositions.forEach(pos => {
            const enemy = this.enemies.create(pos.x, pos.y, 'enemy');
            enemy.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
            enemy.setCollideWorldBounds(true);
            enemy.setBounce(1);
        });
    }

    hitEnemy(player, enemy) {
        if (this.isPlayerInvulnerable) return; // Evita múltiples decrementos

        console.log('hitEnemy llamado');
        this.score -= 10;
        this.registry.set('score', this.score); // Actualizar el registry
        console.log('GameScene: Score actualizado a', this.score);
        this.events.emit('updateScore', this.score);

        this.collisionSound.play();

        // Reiniciar posición del jugador
        this.player.setPosition(100, 300);

        // Hacer al jugador invulnerable por 1 segundo
        this.isPlayerInvulnerable = true;
        this.time.delayedCall(1000, () => {
            this.isPlayerInvulnerable = false;
        }, [], this);
    }

    reachGoal(player, goal) {
        console.log('reachGoal llamado');
        this.level += 1;
        this.score += 100;
        this.moveSound.stop();
        this.registry.set('score', this.score);   // Actualizar el registry
        this.registry.set('level', this.level);   // Actualizar el registry
        console.log('GameScene: Score actualizado a', this.score);
        console.log('GameScene: Level actualizado a', this.level);
        this.events.emit('updateScore', this.score);
        this.events.emit('updateLevel', this.level);

        // Reproducir efecto de sonido de meta alcanzada
        console.log('GameScene: Reproduciendo goal_sound');
        this.sound.play('goal_sound', { volume: 0.5 });
        console.log('GameScene: goal_sound reproducido');

        if (this.level > 3) {
            // Finalizar el juego
            this.bgMusic.stop();
            
            this.scene.stop('Game');
            this.scene.stop('UIScene');
            this.scene.start('GameOver', { score: this.score });
        } else {
            // Reiniciar para el siguiente nivel
            this.bgMusic.stop();
            this.scene.restart();
        }
    }
}
