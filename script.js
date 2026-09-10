const larguraTela = 700;
const alturaTela = 500;
const tamanhoBloco = 20;

let cobra = [
    [200, 200],
    [180, 200],
    [160, 200]
];

let comida = [400, 200];

let novoX = 20;
let novoY = 0;

let placar = 0;
let jogoAtivo = true;
let obstaculos = [];

const blocosCobra = document.getElementsByClassName("cobra");
const elementoComida = document.getElementById("comida");

function desenharCobra() {
    for (let i = 0; i < cobra.length; i++) {
        let tamanho = tamanhoBloco - i;

        if (tamanho < 6) {
            tamanho = 6;
        }

        let ajuste = (tamanhoBloco - tamanho) / 2;

        blocosCobra[i].style.left = cobra[i][0] + ajuste + "px";
        blocosCobra[i].style.top = cobra[i][1] + ajuste + "px";
        blocosCobra[i].style.width = tamanho + "px";
        blocosCobra[i].style.height = tamanho + "px";

        blocosCobra[i].className = "cobra";
    }

    blocosCobra[0].className = "cobra cabeca";
}

function desenharComida() {

    elementoComida.style.left = comida[0] + "px";
    elementoComida.style.top = comida[1] + "px";
}

function posicaoNaCobra(x, y) {
    for (let i = 0; i < cobra.length; i++) {
        if (cobra[i][0] == x && cobra[i][1] == y) {
            return true;
        }
    }
    return false;
}

function posicaoNosObstaculos(x, y) {
    for (let i = 0; i < obstaculos.length; i++) {
        for (let j = 0; j < obstaculos[i].length; j++) {
            if (obstaculos[i][j][0] == x && obstaculos[i][j][1] == y) {
                return true;
            }
        }
    }
    return false;
}

function novaComida() {
    let posicaoValida = false;
    let x;
    let y;

    while (!posicaoValida) {
        x = Math.floor(Math.random() * (larguraTela / tamanhoBloco)) * tamanhoBloco;
        y = Math.floor(Math.random() * (alturaTela / tamanhoBloco)) * tamanhoBloco;

        if (!posicaoNaCobra(x, y) && !posicaoNosObstaculos(x, y)) {
            posicaoValida = true;
        }
    }

    comida = [x, y];

}

function moverCobra() {

    if (!jogoAtivo) {
        return;
    }

    let novaCabeca = [
        cobra[0][0] + novoX,
        cobra[0][1] + novoY
    ];

    if (novaCabeca[0] >= larguraTela) {
        novaCabeca[0] = 0;
    } else if (novaCabeca[0] < 0) {
        novaCabeca[0] = larguraTela - tamanhoBloco;
    }

    if (novaCabeca[1] >= alturaTela) {
        novaCabeca[1] = 0;
    } else if (novaCabeca[1] < 0) {
        novaCabeca[1] = alturaTela - tamanhoBloco;
    }

    cobra.unshift(novaCabeca);

    let comeu = cobra[0][0] == comida[0] && cobra[0][1] == comida[1];

    if (!comeu) {
        cobra.pop();
    }

    if (verificarColisaoCorpo() || verificarColisaoObstaculo()) {
        jogoAtivo = false;
        document.getElementById("status").textContent = "GAME OVER!";
        desenharCobra();
        return;
    }

    if (comeu) {
        placar++;

        const novoBloco = document.createElement("div");
        novoBloco.className = "cobra";
        document.getElementById("tabuleiro").appendChild(novoBloco);

        novaComida();
        novoObstaculo();

        desenharComida();
        desenharObstaculos();
        mostrarPlacar();
    }

    desenharCobra();

    podeMudarDirecao = true;
}

function novoObstaculo() {
    let obstaculo;
    let posicaoValida = false;

    while (!posicaoValida) {
        let x = Math.floor(Math.random() * ((larguraTela - 40) / tamanhoBloco)) * tamanhoBloco;
        let y = Math.floor(Math.random() * ((alturaTela - 40) / tamanhoBloco)) * tamanhoBloco;

        let forma = Math.floor(Math.random() * 3);

        if (forma == 0) {
            obstaculo = [[x, y], [x + 20, y], [x + 40, y]];
        } else if (forma == 1) {
            obstaculo = [[x, y], [x, y + 20], [x, y + 40]];
        } else {
            obstaculo = [[x, y], [x + 20, y], [x, y + 20]];
        }

        posicaoValida = true;

        for (let i = 0; i < obstaculo.length; i++) {
            let blocoX = obstaculo[i][0];
            let blocoY = obstaculo[i][1];

            if (posicaoNaCobra(blocoX, blocoY) ||
                posicaoNosObstaculos(blocoX, blocoY) ||
                (blocoX == comida[0] && blocoY == comida[1])) {
                posicaoValida = false;
            }
        }
    }

    obstaculos.push(obstaculo);
}

function desenharObstaculos() {

    const tabuleiro = document.getElementById("tabuleiro");

    const antigos = document.getElementsByClassName("obstaculo");

    while (antigos.length > 0) {
        antigos[0].remove();
    }

    for (let i = 0; i < obstaculos.length; i++) {
        for (let j = 0; j < obstaculos[i].length; j++) {

            const bloco = document.createElement("div");
            bloco.className = "obstaculo";

            bloco.style.left = obstaculos[i][j][0] + "px";
            bloco.style.top = obstaculos[i][j][1] + "px";

            tabuleiro.appendChild(bloco);
        }
    }
}

function verificarColisaoCorpo() {

    for (let i = 1; i < cobra.length; i++) {
        if (cobra[0][0] == cobra[i][0] && cobra[0][1] == cobra[i][1]) {
            return true;
        }
    }

    return false;
}

function verificarColisaoObstaculo() {

    for (let i = 0; i < obstaculos.length; i++) {
        for (let j = 0; j < obstaculos[i].length; j++) {

            if (cobra[0][0] == obstaculos[i][j][0] &&
                cobra[0][1] == obstaculos[i][j][1]) {
                return true;
            }
        }
    }

    return false;
}

function mostrarPlacar() {
    document.getElementById("placar").textContent = "Pontos: " + placar;

}

function reiniciarJogo() {

    cobra = [
        [200, 200],
        [180, 200],
        [160, 200]
    ];

    novoX = 20;
    novoY = 0;
    placar = 0;
    jogoAtivo = true;

    while (blocosCobra.length > 3) {
        blocosCobra[blocosCobra.length - 1].remove();
    }

    obstaculos = [];
    novoObstaculo();
    novoObstaculo();
    novoObstaculo();

    novaComida();
    desenharCobra();
    desenharComida();
    desenharObstaculos();
    mostrarPlacar();

    document.getElementById("status").textContent = "";
}

document.addEventListener("keydown", function(event) {

    if (!podeMudarDirecao) {
        return;
    }

    if (event.key == "ArrowLeft" && novoX == 0) {
        novoX = -20;
        novoY = 0;
        podeMudarDirecao = false;
    } else if (event.key == "ArrowRight" && novoX == 0) {
        novoX = 20;
        novoY = 0;
        podeMudarDirecao = false;
    } else if (event.key == "ArrowUp" && novoY == 0) {
        novoX = 0;
        novoY = -20;
        podeMudarDirecao = false;
    } else if (event.key == "ArrowDown" && novoY == 0) {
        novoX = 0;
        novoY = 20;
        podeMudarDirecao = false;
    }

});

novoObstaculo();
novoObstaculo();
novoObstaculo();
novaComida();

desenharCobra();
desenharComida();
desenharObstaculos();
mostrarPlacar();

setInterval(moverCobra, 100); //executa moverCobra() a cada 100ms