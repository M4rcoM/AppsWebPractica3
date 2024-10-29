// Esta escena carga todos los recursos

// js/scenes/PreloadScene.js

class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    }

    preload() {
        console.log('PreloadScene: Cargando assets...');
        // Carga de imágenes
        this.load.image('background', 'assets/imagenes/background.png');
        this.load.image('player', 'assets/imagenes/player.png');
        this.load.image('enemy', 'assets/imagenes/enemy.png');
        this.load.image('obstacle', 'assets/imagenes/obstacle.png');
        this.load.image('goal', 'assets/imagenes/goal.png');
        this.load.image('gameover', 'assets/imagenes/gameover.png');
        this.load.image('restart_button', 'assets/imagenes/restart_button.png');

        // Carga de audio
        this.load.audio('bg_music', ['assets/audio/background_music.mp3', 'assets/audio/background_music.mp3']);
        this.load.audio('move_sound', 'assets/audio/move_sound.mp3');
        this.load.audio('collision_sound', 'assets/audio/collision_sound.mp3');
        this.load.audio('goal_sound', 'assets/audio/goal_sound.mp3');
        this.load.audio('button_click', 'assets/audio/button_click.mp3');
    }

    create() {
        console.log('PreloadScene: Assets cargados. Iniciando GameScene...');
        this.scene.start('Game');
    }
}
