// Aqui teremos a programação do Flappy Bird :D

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

contexto.fillStyle = '#70c5ce';
contexto.fillRect(0,0, canvas.width, canvas.height)

//FUNDO//

    const fundo = {
        spriteX: 390,
        spriteY: 0,
        largura: 276,
        altura: 205,
        x: 0,
        y: 280,


        desenha(){
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.x, fundo.y,
            fundo.largura, fundo.altura
        );
        }
    }

    const fundo2 = {
        x: 276,

        desenha(){
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo2.x, fundo.y,
            fundo.largura, fundo.altura,
        )
        }
    }

//CHÃO//

    const chao = {
        spriteX: 0,
        spriteY: 600,
        largura: 224,
        altura: 112,
        x: 0,
        y: 370,

        desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );
        }
    }
    const chao2 = {
        x: 224,

        desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao2.x, chao.y,
            chao.largura, chao.altura,
        );
        }
    }

//PASSARINHO//

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,

    desenha() {
    contexto.drawImage(
        sprites,
        flappyBird.spriteX, flappyBird.spriteY,
        flappyBird.largura, flappyBird.altura,
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura
    );
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
    flappyBird.velocidade += flappyBird.gravidade;
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
    }
}

//TELA DE INÍCIO//

    const inicio = {
        spriteX: 130,
        spriteY: 0,
        largura: 180,
        altura: 152,
        x: 70,
        y: 70,
        
        desenha() {
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
        );
        }
    }

    const TelaInicio = {
        desenha(){
            fundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            inicio.desenha();
        },
        click(){
            telaAtiva = TelaJogo;
        }
    }

    const TelaJogo = {
        desenha() {
            fundo.desenha();
            chao.desenha();
            flappyBird.desenha();
        },
        click(){}
    }

    var telaAtiva = TelaInicio;

    function mudaTelaAtiva(){
        telaAtiva.click();
    }

    window.addEventListener('click', mudaTelaAtiva);

function loop() {
    flappyBird.desenha
    flappyBird.atualiza
    telaAtiva.desenha();
    fundo.desenha();
    fundo2.desenha();
    chao.desenha();
    chao2.desenha();

    requestAnimationFrame(loop);
}

loop();