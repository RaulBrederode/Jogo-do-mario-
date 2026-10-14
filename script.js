const raul = document.querySelector('.raul');
const pipe = document.querySelector('.pipe');

// Elementos das telas
const startScreen = document.getElementById('start-screen');
const aboutScreen = document.getElementById('about-screen');
const gameOverScreen = document.getElementById('game-over-screen');

// Botões
const startBtn = document.getElementById('start-btn');
const aboutBtn = document.getElementById('about-btn');
const backBtn = document.getElementById('back-btn');
const restartBtn = document.getElementById('restart-btn');

let gameLoop = null;
let isPlaying = false;

// Função de Pulo
const jump = () => {
    if (!isPlaying) return;
    
    if (!raul.classList.contains('jump')) {
        raul.classList.add('jump');

        setTimeout(() => {
            raul.classList.remove('jump');
        }, 1000);
    }
}

// Iniciar o Jogo
const startGame = () => {
    // Esconde as telas
    startScreen.classList.add('hidden');
    aboutScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    // Reseta estado do Raul
    raul.src = 'raul correndo.gif';
    raul.style.width = '100px';
    raul.style.marginLeft = '0px';
    raul.style.bottom = '0px';
    raul.style.animation = '';

    // Reseta e ativa o pipe
    pipe.style.animation = '';
    pipe.style.left = '';
    pipe.classList.add('running');

    isPlaying = true;

    // Loop de colisão
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const raulPosition = +window.getComputedStyle(raul).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && raulPosition < 65) {
            // Para a animação do cano e do Raul na posição exata
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            raul.style.animation = 'none';
            raul.style.bottom = `${raulPosition}px`;

            raul.src = 'game-over.png';
            raul.style.width = '100px';
            raul.style.marginLeft = '20px';

            clearInterval(gameLoop);
            isPlaying = false;

            // Exibe a tela de Game Over após um pequeno atraso
            setTimeout(() => {
                gameOverScreen.classList.remove('hidden');
            }, 500);
        }
    }, 10);
}

// Eventos de clique dos botões
startBtn.addEventListener('click', startGame);

aboutBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    aboutScreen.classList.remove('hidden');
});

backBtn.addEventListener('click', () => {
    aboutScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
});

restartBtn.addEventListener('click', startGame);

// Controle do Pulo
document.addEventListener('keydown', (e) => {
    // Permite pulo com qualquer tecla ou barra de espaço
    jump();
});
