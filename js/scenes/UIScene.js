// Interfaz de usuario
// js/scenes/UIScene.js

class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create() {
        console.log('UIScene: Creando UI...');

        // Obtener valores iniciales desde el registry
        const currentScore = this.registry.get('score') || 0;
        const currentLevel = this.registry.get('level') || 1;

        // Crear texto para la puntuación
        this.scoreText = this.add.text(16, 16, 'Puntuación: ' + currentScore, {
            fontSize: '32px',
            fill: '#fff'
        });

        // Crear texto para el nivel
        this.levelText = this.add.text(16, 50, 'Nivel: ' + currentLevel, {
            fontSize: '32px',
            fill: '#fff'
        });

        // Referencia a la escena de juego
        const gameScene = this.scene.get('Game');

        // Escuchar eventos de actualización
        gameScene.events.on('updateScore', this.updateScore, this);
        gameScene.events.on('updateLevel', this.updateLevel, this);

        // Asegurar que UIScene no se reinicie con la escena de juego
        this.scene.bringToTop();
    }

    updateScore(score) {
        if (this.scoreText) {
            this.scoreText.setText('Puntuación: ' + score);
            console.log('UIScene: Actualizando score a', score);
        } else {
            console.warn('UIScene: scoreText no está definido.');
        }
    }

    updateLevel(level) {
        if (this.levelText) {
            this.levelText.setText('Nivel: ' + level);
            console.log('UIScene: Actualizando level a', level);
        } else {
            console.warn('UIScene: levelText no está definido.');
        }
    }
}

