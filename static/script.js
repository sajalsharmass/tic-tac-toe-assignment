//const { gameanalytics, default: GameAnalytics } = require("gameanalytics");
//var gameanalytics = require('gameanalytics');
var grid = document.getElementById('grid');
var msg = document.querySelector('.message');
var chooser = document.querySelector('form');
var mark;
var cells;
var player_count=0;
var computer_count=0;
var ties=0;
var condition = false;
var condition1 = false;
//var gameanalytics = require('gameanalytics');
//gameanalytics.GameAnalytics.setEnabledInfoLog(true);
//gameanalytics.GameAnalytics.initialize("1c21cdd16af859fb261dae92cac8b37f", "3172d7d989160be9083da09ce535a2ffd59638d4");
GameAnalytics("initialize", "1c21cdd16af859fb261dae92cac8b37f", "3172d7d989160be9083da09ce535a2ffd59638d4");
/*const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
*/
// add click listener to radio buttons
function setPlayer() {
  mark = this.value;
  msg.textContent = mark + ', click on a square to make your move!';
  chooser.classList.add('game-on');
  this.checked = false;
  buildGrid();
}

// add click listener to each cell
function playerMove() {
  if (this.textContent == '') {
    this.textContent = mark;
    
  condition = checkRow();
    if(condition == true)
   { 
     player_count = player_count +1;
     document.getElementById('Wins').innerHTML = player_count;
     console.log(player_count);
   }

    switchMark();
    computerMove();
  }
}

// let the computer make the next move
function computerMove() {
  var emptyCells = [];
  var random;
  

/*  for (var i = 0; i < cells.length; i++) {
    if (cells[i].textContent == '') {
      emptyCells.push(cells[i]);
    }
  }*/
  
  cells.forEach(function(cell){
    if (cell.textContent == '') {
      emptyCells.push(cell);
    }
  });

  
  // computer marks a random EMPTY cell
  random = Math.ceil(Math.random() * emptyCells.length) - 1;
 // console.log(mark);
  emptyCells[random].textContent = mark;
   condition1 = checkRow();
  if(condition1 == true)
  {
    computer_count = computer_count + 1;
    document.getElementById('Losses').innerHTML = computer_count;
     console.log(computer_count);
  }
  switchMark();
}

// switch player mark
function switchMark() {
  if (mark == 'X') {
    mark = 'O';
  } else {
    mark = 'X';
  }
}

// determine a winner
function winner(a, b, c) {
  if (a.textContent == mark && b.textContent == mark && c.textContent == mark) {
    msg.textContent = mark + ' is the winner!';
    a.classList.add('winner');
    b.classList.add('winner');
    c.classList.add('winner');
    return true;
  } else {
    return false;
  }
}

// check cell combinations 
function checkRow() {
 if( winner(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3')) ||
  winner(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6'))||
  winner(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9')) ||
  winner(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7')) ||
  winner(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8')) ||
  winner(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9')) ||
  winner(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9')) ||
  winner(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7')))
  return true;
  else 
  return false;
}

// clear the grid

function resetGrid() {
  if(condition == condition1)
  {
    ties = ties+1;
    document.getElementById('Draws').innerHTML= ties;
  }
  mark = 'X';
 /* for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
    cells[i].classList.remove('winner');
  }*/
  cells.forEach(function(cell){
    cell.textContent = '';
    cell.classList.remove('winner');
  });
  msg.textContent = 'Choose your player:';
  chooser.classList.remove('game-on');
  grid.innerHTML = '';
}

// build the grid
function buildGrid() {
  for (var i = 1; i <= 9; i++) {
    var cell = document.createElement('li');
    cell.id = 'c' + i;
    cell.addEventListener('click', playerMove, false);
    grid.appendChild(cell);
  }
  /* cells = document.querySelectorAll('li'); //Returns a NodeList, not an Array
  See https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches */
  cells = Array.prototype.slice.call(grid.getElementsByTagName('li'));
}

var players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));
players.forEach(function(choice){
  choice.addEventListener('click', setPlayer, false);
});

var resetButton = chooser.querySelector('button');
resetButton.addEventListener('click', function(e) {
  e.preventDefault();
  resetGrid();
});

