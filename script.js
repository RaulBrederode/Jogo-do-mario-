const raul = document.querySelector('.raul');
const pipe = document.querySelector('.pipe');

const jump = () => {
    raul.classList.add('jump');

    setTimeout(() => {
        raul.classList.remove('jump');
    }, 1000);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioposition = +window.getComputedStyle(raul).bottom.replace('px', '');

    console.log(marioposition);

    if (pipePosition <= 120 && pipePosition > 0 && marioposition < 65) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        raul.style.animation = 'none';
        raul.style.bottom = `${marioposition}px`;

        raul.src = 'game-over.png'; 
        raul.style.width = '100px';
        raul.style.marginLeft = '20px';
        
        clearInterval(loop);
    }
}, 10); 
document.addEventListener('keydown', jump);

