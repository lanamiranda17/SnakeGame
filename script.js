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

function moverCobra() {

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
    cobra.pop();

    desenharCobra();

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

desenharCobra();
desenharComida();

setInterval(moverCobra, 100); //executa moverCobra() a cada 100ms