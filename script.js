// definición de la variable tablero
const board = ['','','','','','','','',''];

//definición de las variables que mantendrán los nombres de los jugadores.
let currentPlayer = '';
let winner='';
let name1 = '';
let name2 = '';

//selector de todas las celdas del tablero mediante la clase cell
const cells = document.querySelectorAll('.cell');
//selector del elemento que mostrará los mensajes
const message = document.getElementById('message');
//selector del botón que reinicia el juego.
const resetButton = document.getElementById('reset-button');
//función que inicia el juego
function startGame() {
  //se piden los nombres de los jugadores, si no se ingresa nombre los llama jugador 1 o jugador 2.
  name1 = prompt('Por favor ingresa el nombre del primer jugador');
  if (name1 === null || name1 === '') {
    name1 = 'Jugador 1';
  }
  name2 = prompt('Por favor ingresa el nombre del segundo jugador');
  if (name2 === null || name2 === '') {
    name2 = 'Jugador 2';
  }
  //establece el primer jugador para usar la X
  currentPlayer = 'X';
  message.textContent = `¡Es el turno de ${name1}!`;

  //agrega un evento de clic en la celda, sólo se puede hacer clic una vez por turno
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });
  //Se agrega el evento para el reinicio del juego
  resetButton.addEventListener('click', resetGame);
}
// función que se llama cuando hay un ganador o empate.
function endGame() {
  //se agrega el mensaje del ganador en pantalla.
  message.classList.add('winner');
  //muestra el mensaje de ganador o de empate
if (winner === 'X') {
  message.textContent = `${name2} ha ganado!`;
} else if (winner === 'O') {
  message.textContent = `${name1} ha ganado!`;
}else {
      message.textContent = '¡Empate!';
  }
  // elimina los eventos de clic de las celdas para que no se puedan hacer más clic en otras celdas.
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}
//Función que se llama al inicio del juego y al reiniciarlo
function init() {
  //Agrega un evento de clic a cada celda y al botón de reinicio
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
  });
  resetButton.addEventListener('click', resetGame);
  //actualiza el contenido de la tablero de juego, según los valores ingresados.
  updateBoard();
}
//función que se llama cuando se hace clic en una celda
function handleClick(e) {
  //aquí se obtienen los índice de la celda en donde se hizo clic y se verifica si ya esta ocupada.
  const cellIndex = parseInt(e.target.getAttribute('id').split('-')[1]);
  if (board[cellIndex] !== '') {
    return;
  }
  //Marca la celda con el valor del jugador actual y actualiza el tablero de juego.
  board[cellIndex] = currentPlayer;
  updateBoard();   
  //Verifica si ya gano el que tiene el turno actual.
    checkForWinner();
}

//Función que verifica las lineas necesarias para ganar.
function checkForWinner() {
  winner='';
  //constante con las posibles combinaciones
  const winningConditions = [    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  //Ciclo para contar si el actual jugador ha ganado
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
     //verifica las combinaciones con lo que existe en el tablero
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
      //se declara el ganador
      winner = currentPlayer;
      //finaliza el juego.
      endGame();
      return;
    }
  }
  //si el tablero esta lleno, y no hay ganador declara empate.
  if (!board.includes('')) {
    
    message.textContent = '¡Empate!';
    endGame();
    return;
  }
  //si el juego continua se anuncia el siguiente turno
  message.textContent = `Es el turno de ${currentPlayer === 'X' ? name1 : name2}`;
}
//función que actualiza el tablero con los clic de los jugadores
function updateBoard() {
  //verifiva los ingresos y clic dado por turno
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
    if (board[index] === 'X') {
      cell.classList.add('x');
    } else if (board[index] === 'O') {
      cell.classList.add('o');
    }
  });
  //verifica el turno siguiente
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
}

//función que se ejecuta al presionar el botón de reiniciar juego.
function resetGame() {
  //se limpia el tablero
  board.fill('');
  //Se actualiza los turnos y se resetean varias variables
  updateBoard();
  winner='';
  currentPlayer = 'X';  
    message.textContent = `¡Es el turno de ${name1}!`;
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
  });
}
//llamado a inicar el juego.
init();
