//Leon Chow 100617197 The purpose of this program is to allow 2 human players to
//play tic-tac-toe with each other.
//global variables, keeps track of player's turn and move counts for a tie
var player1Turn = true;
var moveCount = 0;

window.onload = function() {
  //displays the message in the log
  var gameLog = document.getElementById('move-log');
  gameLog.innerHTML += "Player 1(X)'s turn. </br>";

  //variables to get each table cell
  var cell1 = document.getElementById('cell1');
  var cell2 = document.getElementById('cell2');
  var cell3 = document.getElementById('cell3');
  var cell4 = document.getElementById('cell4');
  var cell5 = document.getElementById('cell5');
  var cell6 = document.getElementById('cell6');
  var cell7 = document.getElementById('cell7');
  var cell8 = document.getElementById('cell8');
  var cell9 = document.getElementById('cell9');

  //events to trigger each table cell click
  cell1.onclick = clickEvent1;
  cell2.onclick = clickEvent2;
  cell3.onclick = clickEvent3;
  cell4.onclick = clickEvent4;
  cell5.onclick = clickEvent5;
  cell6.onclick = clickEvent6;
  cell7.onclick = clickEvent7;
  cell8.onclick = clickEvent8;
  cell9.onclick = clickEvent9;
};

//block of click events for each table cell. Adds the corresponding symbol and checks
//each move to see if a player has won
function clickEvent1() {
  addSymbol(cell1);
  winCheck();
  return;
}

function clickEvent2() {
  addSymbol(cell2);
  winCheck();
  return;
}

function clickEvent3() {
  addSymbol(cell3);
  winCheck();
  return;
}

function clickEvent4() {
  addSymbol(cell4);
  winCheck();
  return;
}

function clickEvent5() {
  addSymbol(cell5);
  winCheck();
  return;
}

function clickEvent6() {
  addSymbol(cell6);
  winCheck();
  return;
}

function clickEvent7() {
  addSymbol(cell7);
  winCheck();
  return;
}

function clickEvent8() {
  addSymbol(cell8);
  winCheck();
  return;
}

function clickEvent9() {
  addSymbol(cell9);
  winCheck();
  return;
}

//adds an X or an O depending on the turn, increments move counter
function addSymbol(cellNumber) {
  if (player1Turn == true && cellNumber.innerHTML == ' ') {
    log("Player 2(O)'s turn.");
    cellNumber.innerHTML = 'X';
    player1Turn = false;
    moveCount++;
  } else if (player1Turn == false && cellNumber.innerHTML == ' ') {
    cellNumber.innerHTML = 'O';
    player1Turn = true;
    moveCount++;
    log("Player 1(X)'s turn.");
  }
}

//function will check to see if any player has won
function winCheck() {
  //win conditions: 3 vertical, 3 horizontal, or 3 diagonal
  if ((cell1.innerHTML == 'X' && cell2.innerHTML == 'X' && cell3.innerHTML == 'X') || (cell4.innerHTML == 'X' &&
  cell5.innerHTML =='X' && cell6.innerHTML == 'X') || (cell7.innerHTML == 'X' && cell8.innerHTML == 'X' &&
  cell9.innerHTML == 'X') || (cell1.innerHTML == 'X' && cell4.innerHTML == 'X' && cell7.innerHTML == 'X') ||
  (cell2.innerHTML == 'X' && cell5.innerHTML == 'X' && cell8.innerHTML == 'X') || (cell3.innerHTML == 'X' &&
  cell6.innerHTML == 'X' && cell9.innerHTML == 'X') || (cell1.innerHTML == 'X' && cell5.innerHTML == 'X' &&
  cell9.innerHTML == 'X') || (cell3.innerHTML == 'X' && cell5.innerHTML == 'X' && cell7.innerHTML == 'X')) {
    //displays the message to the victor
    log("Congratulations, player 1(X) has won. Please refresh the page to start again.");
    document.getElementById('game-board').style.pointerEvents = 'none';
    return;
  } else if ((cell1.innerHTML == 'O' && cell2.innerHTML == 'O' && cell3.innerHTML == 'O') ||
  (cell4.innerHTML == 'O' && cell5.innerHTML =='O' && cell6.innerHTML == 'O') || (cell7.innerHTML == 'O' &&
  cell8.innerHTML == 'O' && cell9.innerHTML == 'O') || (cell1.innerHTML == 'O' && cell4.innerHTML == 'O' &&
  cell7.innerHTML == 'O') || (cell2.innerHTML == 'O' && cell5.innerHTML == 'O' && cell8.innerHTML == 'O') ||
  (cell3.innerHTML == 'O' && cell6.innerHTML == 'O' && cell9.innerHTML == 'O') || (cell1.innerHTML == 'O' &&
  cell5.innerHTML == 'O' && cell9.innerHTML == 'O') || (cell3.innerHTML == 'O' &&
  cell5.innerHTML == 'O' && cell7.innerHTML == 'O')) {
    //disables each table cell click event
    document.getElementById('game-board').style.pointerEvents = 'none';
    log("Congratulations, player 2(O) has won. Please refresh the page to start again.");
    return;
    //if there is a tie, will display this message
  } else if (moveCount >= 9) {
    log("Tie, please refresh the page.");
    document.getElementById('game-board').style.pointerEvents = 'none';
    return;
  }
}

//function to display messages in the gameLog div
function log(message) {
  var moveLog = document.getElementById('move-log');
  moveLog.innerHTML += message + "</br>";
}
