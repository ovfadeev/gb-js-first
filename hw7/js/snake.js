// params
var FIELD_SIZE_X = 40; // cells x
var FIELD_SIZE_Y = 40; // cells y
var SNAKE_SPEED = 100; // ms
var FOOD_SPEED = 3000; // ms
var BARRIER_SPEED = 5000; // ms
// max barrier 10% cells
var MAX_COUNT_BARRIER = Math.floor(((FIELD_SIZE_X * FIELD_SIZE_Y) / 100) * 10);
// max food 1% cells
var MAX_COUNT_FOOD = Math.floor(((FIELD_SIZE_X * FIELD_SIZE_Y) / 100) * 1);

var snakeTimer;
var foodTimer;
var barrierTimer;
var snake = [];
var snakeCoordX;
var snakeCoordY;
var direction = 'top'; // right, bottom, left, top
var score = 0;
var countBarrier = 0;
var countFood = 0;

// id
var idButtonStart = 'snake-start';
var idButtonReload = 'snake-reload';
var idSnakeField = 'snake-field';
var idSnakeActionBar = 'snake-action-bar';
var idGameTable = 'game-table';
var idScore = 'score';

// class css
var classGameTable = 'game-table';
var classGameTableCell = 'game-table-cell';
var classSnakeUnit = 'snake-unit';
var classFoodUnit = 'food-unit';
var classBarrierUnit = 'barrier-unit';

// alert
var msgGameOver = 'Game over, looser!!!';

function init() {
  generateGameField();

  document.getElementById(idButtonStart).addEventListener('click', startGameHandler);
  document.getElementById(idButtonReload).addEventListener('click', refreshGameHandler);
  window.addEventListener('keydown', changeDirectionHandler);
}

function createElement(node, classElement){
  var element = document.createElement(node);

  if(classElement){
    element.classList.add(classElement);
  }

  return element;
}

function changeDirectionHandler(event) {
  switch(event.keyCode) {
    case 37:
    if(direction !== 'right') {
      direction = 'left';
    }
    break;
    case 38:
    if(direction !== 'bottom') {
      direction = 'top';
    }
    break;
    case 39:
    if(direction !== 'left') {
      direction = 'right';
    }
    break;
    case 40:
    if(direction !== 'top') {
      direction = 'bottom';
    }
    break;
  }
}

function generateGameField() {
  var table = createElement('table', classGameTable);
  var fieldWidth = (FIELD_SIZE_X * 10 + FIELD_SIZE_X * 1 + 1) + 'px';
  table.id = idGameTable;

  document.getElementById(idSnakeField).style.width = fieldWidth;
  document.getElementById(idSnakeActionBar).style.width = fieldWidth;

  for(var i = 0; i < FIELD_SIZE_X; i++) {
    var row = createElement('tr');
    for(var j = 0; j < FIELD_SIZE_Y; j++) {
      var cell = createElement('td', classGameTableCell);

      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  document.getElementById(idSnakeField).appendChild(table);
}

function startGameHandler() {
  respawn();

  snakeTimer = setInterval(move, SNAKE_SPEED);
  foodTimer = setInterval(createFood, FOOD_SPEED);
  barrierTimer = setInterval(createBarrier, BARRIER_SPEED);
}

function createUnit(classUnit, countUnit, maxCountUnit){
  var unitCreated = false;

  while(!unitCreated) {
    if (countUnit == maxCountUnit) {
      // get all class unit
      var unitsOnTable = document.getElementsByClassName(classUnit);
      // remove random unit
      var randElement = Math.floor(Math.random() * unitsOnTable.length);
      unitsOnTable[randElement].classList.remove(classUnit);
      countUnit--;
    }
    var unitX = Math.floor(Math.random() * FIELD_SIZE_X);
    var unitY = Math.floor(Math.random() * FIELD_SIZE_Y);

    var table = document.getElementById(idGameTable);
    var unit = table.children[unitX].children[unitY];

    if(!unit.classList.contains(classSnakeUnit)) {
      unitCreated = true;
      unit.classList.add(classUnit);
      countUnit++;
    }
  }
  return countUnit;
}

function createFood() {
  countFood = createUnit(classFoodUnit, countFood, MAX_COUNT_FOOD);
}

function createBarrier() {
  countBarrier = createUnit(classBarrierUnit, countBarrier, MAX_COUNT_BARRIER);
}

function respawn() {
  snakeCoordX = Math.floor(FIELD_SIZE_X / 2);
  snakeCoordY = Math.floor(FIELD_SIZE_Y / 2);

  var table = document.getElementById(idGameTable);
  var snakeHead = table.children[snakeCoordX].children[snakeCoordY];
  var snakeTail = table.children[--snakeCoordX].children[snakeCoordY];

  snakeHead.classList.add(classSnakeUnit);
  snakeTail.classList.add(classSnakeUnit);

  snake.push(snakeHead);
  snake.push(snakeTail);
}

function refreshGameHandler() {
  document.location.reload(true);
}

function move() {
  var newUnit;
  var table = document.getElementById(idGameTable);

  switch(direction) {
    case 'top':
    snakeCoordX--;
    break;
    case 'bottom':
    snakeCoordX++;
    break;
    case 'left':
    snakeCoordY--;
    break;
    case 'right':
    snakeCoordY++;
    break;
  }

  snakeCoordX = isEndFields(snakeCoordX, 0, FIELD_SIZE_X - 1);
  snakeCoordY = isEndFields(snakeCoordY, 0, FIELD_SIZE_Y - 1);

  if(snakeCoordX >= 0 && snakeCoordX <= FIELD_SIZE_X) {
    newUnit = table.children[snakeCoordX].children[snakeCoordY];
  }

  if(newUnit && !isSnakeUnit(newUnit) && !isBarrierUnit(newUnit)) {
    newUnit.classList.add(classSnakeUnit);
    snake.push(newUnit);

    if(!isFoodUnit(newUnit)) {
      var oldUnit = snake.shift();
      oldUnit.classList.remove(classSnakeUnit);
    }
  } else {
    gameOver();
  }
}

function isEndFields(valueCoords, minCoords, maxCoords){
  if (valueCoords < minCoords) {
    valueCoords = maxCoords;
  } else if (valueCoords > maxCoords) {
    valueCoords = 0;
  }
  return valueCoords;
}

function isSnakeUnit(unit) {
  return snake.includes(unit);
}

function isBarrierUnit(unit){
  return unit.classList.contains(classBarrierUnit);
}

function isFoodUnit(unit) {
  if(unit.classList.contains(classFoodUnit)) {
    unit.classList.remove(classFoodUnit);
    countFood--;

    score++;
    document.getElementById(idScore).innerText = score;

    return true;
  } else {
    return false;
  }
}

function gameOver() {
  clearInterval(snakeTimer);
  clearInterval(barrierTimer);
  clearInterval(foodTimer);
  alert(msgGameOver);
}

window.onload = init;