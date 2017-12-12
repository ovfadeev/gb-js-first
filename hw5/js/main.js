"use strict";
/**
 * Home work 5
 */

/**
 * Создаём html элемент
 * @param  {[node]} node
 * @param  {[string]} classElement класс элемента
 * @return {[HTMLElement]} html эелемент с классом
 */
function createElement(node, classElement){
  var element = document.createElement(node);

  if(typeof classElement !== "undefined"){
    element.classList.add(classElement);
  }

  return element;
}
/**
 * Создаем шахматные фигуры в ячейке
 * @param  {[HTMLElement]} element ячейка
 * @param  {[number]} row числовое значение ряда
 * @param  {[number]} cell числовое значение ячейки
 * @return {[HTMLElement]}
 */
function createChessPieces(element, row, cell){
  if (cell != 0 && cell != countRowCells){
    if (row > 0 && row < 3){
      element.classList.add(arrCellsClassText[0]); // text-white
      // add figures
      if (row == 1){
        element.innerText = arrFiguresChess[cell - 1];
      } else if (row == 2){
        element.innerText = arrFiguresChess[countRowCells - 1];
      }
    } else if (row > countRowCells - 3 && row < countRowCells){
      element.classList.add(arrCellsClassText[1]); // text-white
      // add figures
      if (row == countRowCells - 2){
        element.innerText = arrFiguresChess[countRowCells - 1];
      } else if (row == countRowCells - 1){
        element.innerText = arrFiguresChess[cell - 1];
      }
    }
  }

  return element;
}
/**
 * Закрашиваем ячейку
 * @param  {[HTMLElement]} element ячейка
 * @param  {[number]} row числовое значение ряда
 * @param  {[number]} cell числовое значение ячейки
 * @return {[HTMLElement]}
 */
function addColorCells(element, row, cell){
  if (cell != 0 && cell != countRowCells){
    if ((cell % 2 - row % 2) == 0){ // grey
      element.classList.add(arrCellsClassBack[1]);
    } else { // brown
      element.classList.add(arrCellsClassBack[0]);
    }
  }

  return element;
}
/**
 * Добавляем цифру ряда в ячейку
 * @param {[HTMLElement]} element ячейка
 * @param  {[number]} row числовое значение ряда
 * @param  {[number]} cell числовое значение ячейки
 * @return {[HTMLElement]}
 */
function addNumbersCells(element, row, cell){
  if (cell == 0 || cell == countRowCells){
    element.innerText = row;
  }

  return element;
}
/**
 * Добавляем букву в ячейку
 * @param  {[HTMLElement]} element ячейка
 * @param  {[number]} row числовое значение ряда
 * @param  {[number]} cell числовое значение ячейки
 * @return {[HTMLElement]}
 */
function addLettersCells(element, row, cell){
  if (cell != 0 && cell != countRowCells && (row == 0 || row == countRowCells)){
    element.innerText = arrLetters[cell - 1];
  }

  return element;
}
/**
 * Создаём ячейку в шахматах
 * @param  {[HTMLElement]} parentElement элемент ряда
 * @param  {[number]} row числовое значение ряда
 * @return {[HTMLElement]}
 */
function createCells(parentElement, row){
  // create cells
  for (var i = 0; i <= countRowCells; i++) {
    // create div cell
    var divCell = createElement('div', classCells);

    if (row > 0 && row < countRowCells){
      // add numbers rows
      divCell = addNumbersCells(divCell, row, i);
      // create color cell
      divCell = addColorCells(divCell, row, i);
      // create chess pieces
      divCell = createChessPieces(divCell, row, i);
    } else {
      // add letters cells
      divCell = addLettersCells(divCell, row, i);
    }
    // append cell
    parentElement.appendChild(divCell);
  }

  return parentElement;
}
/**
 * Создаем ряд в шахматах
 * @param  {[HTMLElement]} parentElement родительский элемент
 * @return {[HTMLElement]}
 */
function createRowsChess(parentElement){
  // create rows
  for (var i = countRowCells; i >= 0; i--) {
    // create div row
    var divRow = createElement('div', classRows);
    // create cells
    divRow = createCells(divRow, i);
    // append row
    parentElement.appendChild(divRow);
  }
  return parentElement;
}
/**
 * Создаем шахматную доску
 * @return {[HTMLElement]}
 */
function createChessBoard(){
  // create div wrapper
  var divWrapper = createElement('div', classWrapper);
  // create div chess
  var divChess = createElement('div', classChess);
  // create rows
  divChess = createRowsChess(divChess);
  // append chess to wrapper
  divWrapper.appendChild(divChess);

  return divWrapper;
}

var arrLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    arrCellsClassBack = ['grey', 'brown'],
    arrCellsClassText = ['text-white', 'text-black'],
    arrFiguresChess = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜', '♟'],
    classCells = 'cell',
    classRows = 'row',
    classChess = 'chess',
    classWrapper = 'wrapper',
    countRowCells = 9;

window.onload = function() {
  document.body.appendChild(createChessBoard());
}