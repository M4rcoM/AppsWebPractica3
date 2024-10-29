// Fin del juego
// js/scenes/GameOverScene.js

class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.finalScore = data.score;
    }

    create() {
        console.log('GameOverScene: Creando pantalla de fin de juego...');
        
        // Fondo
        this.add.image(400, 300, 'gameover').setOrigin(0.5, 0.5);

        // Texto de fin de juego
        this.add.text(400, 200, 'Juego Terminado', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);

        // Texto de puntuación final
        this.add.text(400, 270, 'Puntuación Final: ' + this.finalScore, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Boton de reinicio con imagen
        const restartButton = this.add.image(400, 400, 'restart_button').setOrigin(0.5);
        
        // Escalar la imagen
        restartButton.setScale(0.7);

        // Hacer que la imagen sea interactiva
        restartButton.setInteractive({ useHandCursor: true });

        // Añadir efectos de hover
        restartButton.on('pointerover', () => {
            restartButton.setTint(0xffae00); // Cambia el color al pasar el cursor
            restartButton.setScale(0.55); // Aumenta ligeramente el tamaño
        });

        restartButton.on('pointerout', () => {
            restartButton.clearTint(); // Restablece el color original
            restartButton.setScale(0.5); // Restablece el tamaño original
        });

        // Botón para reiniciar el juego
        restartButton.on('pointerdown', () => {
            console.log('GameOverScene: Botón de reinicio clickeado');
           
            this.sound.play('button_click', { volume: 0.5 });
            console.log('GameOverScene: button_click reproducido');
  

            // Reiniciar completamente todo
            this.registry.set('score', 0);
            this.registry.set('level', 1);
            this.scene.start('Game');
        });

        console.log('GameOverScene: Botón de reinicio creado y configurado');
    }
}