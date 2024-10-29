// Inicia el Juego y pasa a PreloadScene
// js/scenes/BootScene.js
class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    create() {
        this.scene.start('Preload');
    }
}
