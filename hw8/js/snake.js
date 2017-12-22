'use strict';
/**
 * Инициализация
 */
function init() {
  generateGameField();

  document.getElementById(idButtonStart).addEventListener('click', startGameHandler);
  document.getElementById(idButtonReload).addEventListener('click', refreshGameHandler);
  window.addEventListener('keydown', changeDirectionHandler);
}
/**
 * Создаём html элемент
 * @param  {[HTMLelement]} node
 * @param  {[string]} classElement
 * @return {[HTMLelement]}
 */
function createElement(node, classElement){
  var element = document.createElement(node);

  if(classElement){
    element.classList.add(classElement);
  }

  return element;
}
/**
 * Событие нажатия клавиш клавиатуры
 * @param  {[object]} event
 */
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
/**
 * Создаём игровое поле
 */
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
/**
 * Увеличивем скорость
 * @param  {[number]} speed текущая скорость
 * @param  {[number]} persentReduce процент
 * @return {[number]}
 */
function reduceSpeed(speed, persentReduce){
  return speed - Math.floor((speed / 100) * persentReduce);
}
/**
 * Следующий уровень
 */
function nextLevel(){
  if (countLevel < MAX_LEVEL){
    countLevel++;
    document.getElementById(idLevel).innerText = countLevel;

    var snakeSpeed = reduceSpeed(SNAKE_SPEED, LEVEL_REDUCE_SPEED_PERSENT * countLevel);
    var barrierSpeed = reduceSpeed(BARRIER_SPEED, LEVEL_REDUCE_SPEED_PERSENT * countLevel);

    clearInterval(arrTimers.snake);
    clearInterval(arrTimers.barrier);

    arrTimers.snake = setInterval(move, snakeSpeed);
    arrTimers.barrier = setInterval(createBarrier, barrierSpeed);
  }
}
/**
 * Старт игры
 */
function startGameHandler() {
  respawn();

  arrTimers = {
    snake : setInterval(move, SNAKE_SPEED),
    food : setInterval(createFood, FOOD_SPEED),
    barrier : setInterval(createBarrier, BARRIER_SPEED),
    level : setInterval(nextLevel, LEVEL_UP_SPEED),
  }
}
/**
 * Создаем юниты
 * @param  {[string]} classUnit html класс
 * @param  {[number]} countUnit    текущее количество юнитов на игровом поле
 * @param  {[number]} maxCountUnit максимальное количество юнитов
 * @return {[number]}
 */
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

    if(!unit.classList.contains(classSnakeUnit) && !unit.classList.contains(classFoodUnit) && !unit.classList.contains(classBarrierUnit)) {
      unitCreated = true;
      unit.classList.add(classUnit);
      countUnit++;
    }
  }
  return countUnit;
}
/**
 * Создаём юнит еды
 */
function createFood() {
  countFood = createUnit(classFoodUnit, countFood, MAX_COUNT_FOOD);
}
/**
 * Создаём юнит препядствия
 */
function createBarrier() {
  countBarrier = createUnit(classBarrierUnit, countBarrier, MAX_COUNT_BARRIER);
}
/**
 * Создаём змею
 */
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
/**
 * Обновляем игру
 */
function refreshGameHandler() {
  document.location.reload(true);
}
/**
 * Движение змеи
 */
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

  newUnit = table.children[snakeCoordX].children[snakeCoordY];

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
/**
 * Конец поля
 * @param  {[number]} valueCoords текущее значение координаты
 * @param  {[number]} minCoords   минимальная координата
 * @param  {[number]} maxCoords   максимальная координата
 * @return {[number]}
 */
function isEndFields(valueCoords, minCoords, maxCoords){
  if (valueCoords < minCoords) {
    valueCoords = maxCoords;
  } else if (valueCoords > maxCoords) {
    valueCoords = 0;
  }
  return valueCoords;
}
/**
 * Это юнит змеи
 * @param  {[HTMLelement]} unit
 * @return {Boolean}
 */
function isSnakeUnit(unit) {
  return snake.includes(unit);
}
/**
 * Это юнит препядствия
 * @param  {[HTMLelement]} unit
 * @return {Boolean}
 */
function isBarrierUnit(unit){
  return unit.classList.contains(classBarrierUnit);
}
/**
 * Подсчет очков
 * @return {[number]}
 */
function getScoreCounter(){
  var count = 0;
  return function (){
    count++;
    return count;
  }
}
/**
 * Это юнит еды
 * @param  {[HTMLelement]} unit
 * @return {Boolean}
 */
function isFoodUnit(unit) {
  if(unit.classList.contains(classFoodUnit)) {
    unit.classList.remove(classFoodUnit);
    countFood--;

    document.getElementById(idScore).innerText = score();

    return true;
  } else {
    return false;
  }
}
/**
 * Очистка всех интервалов
 */
function clearAllIntervals(){
  for (var i = 1; i <= arrTimers.length; i++) {
    window.clearInterval(i);
  }
}
/**
 * Конец игры
 */
function gameOver() {
  clearAllIntervals();

  alert(msgGameOver);

  refreshGameHandler();
}
/* --- params --- */
// coords
var FIELD_SIZE_X = 40; //  count cells x
var FIELD_SIZE_Y = 40; // count cells y
// speed
var SNAKE_SPEED = 300; // ms
var FOOD_SPEED = 3000; // ms
var BARRIER_SPEED = 5000; // ms
// level up
var LEVEL_UP_SPEED = 20000; // ms
var LEVEL_REDUCE_SPEED_PERSENT = 10; // count
var MAX_LEVEL = 8; // count
// max barrier 10% cells
var MAX_COUNT_BARRIER = Math.floor(((FIELD_SIZE_X * FIELD_SIZE_Y) / 100) * 10);
// max food 1% cells
var MAX_COUNT_FOOD = Math.floor(((FIELD_SIZE_X * FIELD_SIZE_Y) / 100) * 1);

/* --- variables --- */
var arrTimers = {};
var snake = [];
var snakeCoordX;
var snakeCoordY;
var direction = 'top'; // right, bottom, left, top
var score = getScoreCounter();
var countBarrier = 0;
var countFood = 0;
var countLevel = 1;

/* --- id html --- */
var idButtonStart = 'snake-start';
var idButtonReload = 'snake-reload';
var idSnakeField = 'snake-field';
var idSnakeActionBar = 'snake-action-bar';
var idGameTable = 'game-table';
var idScore = 'score';
var idLevel = 'level';

/* --- class html --- */
var classGameTable = 'game-table';
var classGameTableCell = 'game-table-cell';
var classSnakeUnit = 'snake-unit';
var classFoodUnit = 'food-unit';
var classBarrierUnit = 'barrier-unit';

/* --- alert msg --- */
var msgGameOver = 'Game over, looser!!!';

/**
 * HTML load
 */
window.onload = init;