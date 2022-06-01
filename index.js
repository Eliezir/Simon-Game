var coresBotoes = ["red", "blue", "green", "yellow"];
var jogo = [];
var coresRodada = [];
var gameOver = true;
var level = 0;
var i = 0;




// Função para tocar sons
function tocarMusica(som, arquivo) {
    var som = new Audio(arquivo);
    som.play();
}

// sorteia e escolhe a proxima cor
function nextColor() {
    var numCor = Math.floor(Math.random() * 4);
    var escolheCor = coresBotoes[numCor];
    jogo.push(escolheCor);
    level++;
    $('#level-title').text("level " + level);
    mostrarCor();
    coresRodada = [];
    var i = 0;
}


//exibe a sequencia de cores    
function mostrarCor() {
    for (var x = 0; x < jogo.length; x++) {
        (function (x) {
            setTimeout(function () {
                switch (jogo[x]) {
                    case "red":
                        $("#red").animate({
                            opacity: 0.2
                        }, "fast");
                        $("#red").animate({
                            opacity: 1
                        }, "fast");
                        tocarMusica("vermelho", "sounds/red.mp3");
                        break;
                    case "blue":
                        $("#blue").animate({
                            opacity: 0.2
                        }, "fast");
                        $("#blue").animate({
                            opacity: 1
                        }, "fast");
                        tocarMusica("azul", "sounds/blue.mp3");
                        break;
                    case "green":
                        $("#green").animate({
                            opacity: 0.2
                        }, "fast");
                        $("#green").animate({
                            opacity: 1
                        }, "fast");
                        tocarMusica("verde", "sounds/green.mp3");
                        break;
                    case "yellow":
                        $("#yellow").animate({
                            opacity: 0.2
                        }, "fast");
                        $("#yellow").animate({
                            opacity: 1
                        }, "fast");
                        tocarMusica("amarelo", "sounds/yellow.mp3");
                        break;
                    default:
                        console.log(jogo[x])
                }
            }, 350 * x);
        })(x);
    };
}

//pega o click nos botões e responde com um efeito visão

$(".btn").on("click", function () {
    if (gameOver === false) {
        var corEscolhida = this.id;
        coresRodada.push(corEscolhida);
        $("#" + corEscolhida).addClass("pressed");
        setTimeout(function () {
            $("#" + corEscolhida).removeClass("pressed");
        }, 100)
        tocarMusica("btn", "sounds/" + corEscolhida + ".mp3");
    }
    confereResposta();
})

//confere a resposta do usuario
function confereResposta() {
    if (coresRodada[i] == jogo[i]) {
        i++;
        if (i === jogo.length) {
            setTimeout(function () {
                i = 0;
                nextColor()
            }, 1000);
        }
    } else if (coresRodada[i] !== jogo[i]) {
        tocarMusica("errado", "sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $('#level-title').text("GAME-OVER, Pressione uma tecla para recomeçar");
        gameOver = true;
        level = 0;
        jogo = [];
    }
}





$(document).on("keypress", function () {
    if (gameOver === true) {
        nextColor();
        gameOver = false;
    }
})

/*$(document).on("click", function () {
    if (gameOver === true) {
        nextColor();
        gameOver = false;
    }
})*/
