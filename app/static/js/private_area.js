var diceRoller = new rpgDiceRoller.DiceRoller();

let username = document.getElementById("nombreUsuario").value + ':';
let messages = []
var socket = null;
$(document).ready(function(){
        socket = io();
});

function actualizarChatbox(){
   for (var i = 1; i < 15; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
}

function emitirMensaje(mensaje){
    socket.emit('message',JSON.stringify({type:'chat',content: username +' '+ mensaje}));
}

function escribirMensaje(mensaje){
    messages.push(mensaje);
    actualizarChatbox();
}

document.getElementById("chatbox").addEventListener("keydown", (event) => {
    let key = event.key
  if (key === 'Enter' || key === 'Return' || key === 'Entrar') {
    let lastUserMessage = document.getElementById("chatbox").value
    if (lastUserMessage != "") {
        socket.emit('message',JSON.stringify({type:'chat',content: username +' '+ lastUserMessage}));
        document.getElementById("chatbox").value = "";
    }
  }
});

document.getElementById("button-tirar-dados").addEventListener("click", function(){
    let numDados = parseInt(document.getElementById("numDados").value);
    let tipoDados = parseInt(document.getElementById("tipoDados").value);
    let sumaDados = parseInt(document.getElementById("sumaDados").value);
    if(!isNaN(numDados) && !isNaN(tipoDados)){
        let tirada = numDados + 'd' + tipoDados;
        if(!isNaN(sumaDados)){
            tirada += '+' + sumaDados;
        }else{tirada += '+0'}
    let roll = diceRoller.roll(tirada);
    emitirMensaje(roll.rolls[0] + ' + ' + roll.rolls[2] + ' = ' + roll.total);
    }
});

//Quita el focus de las chatboxes cuando se hace click en ellas
function elimChatbox() {
  document.getElementById("chatbox").placeholder = "";
}
function elimNumDados() {
  document.getElementById("chatbox").placeholder = "";
}
function elimTipoDados() {
  document.getElementById("chatbox").placeholder = "";
}
function elimSumaDados() {
  document.getElementById("chatbox").placeholder = "";
}