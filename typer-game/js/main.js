var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
var botao_reiniciar = $("#botao-reiniciar");
var botao_placar = $("#botao-placar");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();  
    botao_reiniciar.click(reiniciaJogo);  
    botao_placar.click(mostraPlacar);  
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
    
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro(){
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                botao_reiniciar.attr("disabled", false);
                botao_reiniciar.toggleClass("disabled");
                campo.toggleClass("campo-desativado");
                inserePlacar();
            }
        
        }, 1000);
    });
}

function inicializaMarcadores(){
    var frase = $(".frase").text();
    campo.on("input", function(){
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if(digitado == comparavel) {
            campo.addClass("campo-correto");
            campo.removeClass("campo-errado");
        } else {
            campo.addClass("campo-errado");
            campo.removeClass("campo-correto");
        }
    });
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    botao_reiniciar.attr("disabled", true);
    botao_reiniciar.toggleClass("disabled");
    campo.toggleClass("campo-desativado");
    campo.removeClass("campo-correto");
    campo.removeClass("campo-errado");
}

function mostraPlacar() {
    $(".placar").stop().slideToggle(600);
}