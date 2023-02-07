// Aqui teremos a programação do Flappy Bird :D

const jogo = {

    inicializa(){
        jogo.flappyBird = criaflappyBird();
        jogo.planoDeFundo = criaFundo();
        jogo.chao = criaChao();
        jogo.canos = criaCanos();
        jogo.placar = criaPlacar();
    },
}

const sprites = new Image();
sprites.src = './sprites.png';
 
//ÁUDIOS//

const som_punch = new Audio();
som_punch.src = './Som/punch.wav';
 
let animation_frame = 0;

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');
 
//FUNDO//
 
    function criaFundo(){
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
                contexto.drawImage(
                    sprites,
                    fundo.spriteX, fundo.spriteY,
                    fundo.largura, fundo.altura,
                    fundo.x+fundo.largura, fundo.y,
                    fundo.largura, fundo.altura
                );
                contexto.drawImage(
                    sprites,
                    fundo.spriteX, fundo.spriteY,
                    fundo.largura, fundo.altura,
                    fundo.x+fundo.largura+fundo.largura, fundo.y,
                    fundo.largura, fundo.altura
                );
            },
            atualiza(){
                fundo.x = fundo.x - 0.1;
                fundo.x = fundo.x % (fundo.largura / 1);
            }
        }
    return fundo;
}

//CHÃO//

    function criaChao(){
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
                contexto.drawImage(
                    sprites,
                    chao.spriteX, chao.spriteY,
                    chao.largura, chao.altura,
                    chao.x+chao.largura, chao.y,
                    chao.largura, chao.altura,
                );




            },
            atualiza() {
                chao.x = chao.x - 2;
                chao.x = chao.x % (chao.largura / 2);
            }
        }
    return;
    }

//PASSARINHO//
 
function fazColisao(){
    if(jogo.flappyBird.y + jogo.flappyBird.altura >= 380){
        return true;
    }
}

function criaflappyBird(){
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 35,
        altura: 25,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = -flappyBird.pulo;
        },
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


        movimentos: [
            { spriteX: 0, spriteY: 0, }, //asa pra cima
            { spriteX: 0, spriteY: 26, }, //asa no meio
            { spriteX: 0, spriteY: 52, }, // asa pra baixo
            { spriteX: 0, spriteY: 26, }, //asa no meio
        ],
        frameAtual: 0,
        atualizaFrame(){
            if((animation_frame % 10) === 0){
            flappyBird.frameAtual = flappyBird.frameAtual + 1;
            flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
            flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
            flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
            }
        },


        atualiza(){
            if(fazColisao()){
                som_punch.play();
                telaAtiva = TelaGameOver;
                return;
            }
            flappyBird.velocidade += flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
            flappyBird.atualizaFrame();
        }
    }
return flappyBird;
}

//CANOS//


    function fazColisaoObstaculo(par){
        if((jogo.flappyBird.x +jogo.flappyBird.largura) >= par.x){
            const alturaCabecaFlappy = jogo.flappyBird.y;
            const alturaPeFlappy = jogo.flappyBird.y + jogo.flappyBird.altura;
            const bocaCanoCeuY = par.y + jogo.canos.altura;
            const bocaCanoChaoY = par.y + jogo.canos.altura + jogo.canos.espacamentoEntreCanos;
            if(alturaCabecaFlappy <= bocaCanoCeuY)
                return true;


            if(alturaPeFlappy >= bocaCanoChaoY){
                return true;
            }
    }


    return false;
}

    function criaCanos(){
        const canos = {
            largura: 52,
            altura: 400,
            ceu: {
                spriteX: 52,
                spriteY: 169,
                x: 120,
                y: -150,
            },
            chao: {
                spriteX: 0,
                spriteY: 169
            },
            pares: [],
            espacamentoEntreCanos: 120,
            desenha() {
                const espacamentoEntreCanos = 120;
                for(i=0;i<canos.pares.length;i++){
                    canos.ceu.x = canos.pares[i].x;
                    canos.ceu.y = canos.pares[i].y;
            


                // [cano do céu]
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canos.ceu.x, canos.ceu.y,
                    canos.largura, canos.altura,
                )
                // [cano do chão]
                const canoChaoX = canos.ceu.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + canos.ceu.y;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )
            }
            },
        
            atualiza() {
                for(i=0;i<canos.pares.length;i++){
                    const par = canos.pares[i];
                    par.x = par.x - 2;


                    if(par.x + canos.largura <- 0){
                        canos.pares.shift();
                    }


                    if(fazColisaoObstaculo(par)){
                        som_punch.play();
                        telaAtiva = TelaGameOver;
                        return;
                    }
                }

        const passou100Frams = (animation_frame % 100 === 0);
        if(passou100Frams) {
            const novoPar = {
                x: canvas.width,
                y: -150 * (Math.random() + 1),
            }
            canos.pares.push(novoPar);
        }
    }
    }
    return canos;
}

//PLACAR//

    function criaPlacar(){
        const placar = {
            pontos: 0,
            desenha(){
                contexto.font = '35px "VT323"';
                contexto.textAlign = 'right';
                contexto.fillStyle = 'white';
                contexto.fillText("Pontuação: "+ placar.pontos, 25, 35);
            },
            atualiza(){
                const intervaloDeFrames = 20;
                const passouOIntervao = animation_frame % intervaloDeFrames === 0;

                if(passouOIntervao) {
                    placar.pontos = placar.pontos + 1;
                }
            }
        }
    return placar;
    }

//GAME OVER//

    const gameOver = {
        spriteX: 134,
        spriteY: 153,
        largura: 226,
        altura: 200,
        x: 50,
        y: 70,
        desenha() {
            contexto.drawImage(
                sprites,
                gameOver.spriteX, gameOver.spriteY,
                gameOver.largura, gameOver.altura,
                gameOver.x, gameOver.y,
                gameOver.largura, gameOver.altura
            );
        }
    }

    const TelaGameOver = {
        desenha() {
            gameOver.desenha();
        },
        click(){
            inicializa();
            telaAtiva = TelaJogo;
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
            jogo.fundo.desenha();
            jogo.chao.desenha();
            jogo.flappyBird.desenha();
            inicio.desenha();
        },
        click(){
            telaAtiva = TelaJogo;
        }
    }
 
    const TelaJogo = {
        desenha() {
            jogo.fundo.desenha();
            jogo.fundo.atualiza();
            jogo.canos.desenha();
            jogo.canos.atualiza();
            jogo.chao.desenha();
            jogo.chao.atualiza();
            jogo.placar.desenha();
            jogo.placar.atualiza();
            jogo.flappyBird.desenha();
            jogo.flappyBird.atualiza();
           
        },
        click(){
            flappyBird.pula();
        }
    }
 
    var telaAtiva = TelaInicio;
 
    function mudaTelaAtiva(){
        telaAtiva.click();
    }
 
    window.addEventListener('click', mudaTelaAtiva);

function loop() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)
    telaAtiva.desenha();
    requestAnimationFrame(loop);
    animation_frame = animation_frame  + 1;
}
 
inicializa();
loop();