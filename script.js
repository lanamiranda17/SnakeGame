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

const blocosCobra = document.getElementsByClassName("cobra");
const elementoComida = document.getElementById("comida");

function desenharCobra() {

    for (let i = 0; i < cobra.length; i++) {
        blocosCobra[i].style.left = cobra[i][0] + "px";
        blocosCobra[i].style.top = cobra[i][1] + "px";

    }

}

function desenharComida() {

    elementoComida.style.left = comida[0] + "px";
    elementoComida.style.top = comida[1] + "px";
}

function novaComida() {

    let x = Math.floor(Math.random() * (larguraTela / tamanhoBloco)) * tamanhoBloco;
    let y = Math.floor(Math.random() * (alturaTela / tamanhoBloco)) * tamanhoBloco;

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

    if (verificarColisao()) {
        jogoAtivo = false;
        document.getElementById("status").textContent = "GAME OVER!";
        return;
    }

    if (cobra[0][0] == comida[0] && cobra[0][1] == comida[1]) {

        placar++;

        const novoBloco = document.createElement("div");
        novoBloco.className = "cobra";

        document.getElementById("tabuleiro").appendChild(novoBloco);

        novaComida();
        desenharComida();
        mostrarPlacar();

    } else {
        cobra.pop();
    }

    desenharCobra();
}

function verificarColisao() {

    for (let i = 1; i < cobra.length; i++) {
        if (cobra[0][0] == cobra[i][0] && cobra[0][1] == cobra[i][1]) {
            return true;
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

    novaComida();
    desenharCobra();
    desenharComida();
    mostrarPlacar();

    document.getElementById("status").textContent = "";
}

document.addEventListener("keydown", function(event) {

    if (event.key == "ArrowLeft" && novoX == 0) { //limita a cobra de inverter sua direção
        novoX = -20;
        novoY = 0;
    } else if (event.key == "ArrowRight" && novoX == 0) {
        novoX = 20;
        novoY = 0;
    } else if (event.key == "ArrowUp" && novoY == 0) {
        novoX = 0;
        novoY = -20;
    } else if (event.key == "ArrowDown" && novoY == 0) {
        novoX = 0;
        novoY = 20;
    }

});

novaComida();
desenharCobra();
desenharComida();
mostrarPlacar();

setInterval(moverCobra, 100); //executa moverCobra() a cada 100ms